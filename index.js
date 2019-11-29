const trackme = require('commander');
const prompt = require('prompt');
const URL = 'redmine.codium.com.py';
const http = require('http');
const FormData = require('form-data');
require('dotenv').config();

trackme
  .version('0.0.1')
  .name('track')
  .option('-p --project <project>', 'project')
  .requiredOption('-i, --issue <issue>', 'issue')
  .requiredOption(
    '-w, --when <time>',
    "if no option provided it will use today's date",
    new Date().toISOString().split('T')[0]
  )
  .requiredOption('-h, --hours <hours>', 'amount of hours')
  .option('-c, --comments <comments>', 'commentario')
  .option('-a, --activity <activity_id>', 'activity id')
  .requiredOption(
    '-f --fabrica',
    'if it was at fabrica, this is the default behaviour',
    true
  )
  .parse(process.argv);

//create form data
const data = createFormData(trackme);

//post
postData(URL, data);

function createFormData(trackme) {
  return (({ project, issue, when, hours, comments, activity, fabrica }) => {
    return new Object({
      time_entry: {
        project_id: project,
        issue_id: issue,
        spent_on: when,
        hours,
        comments,
        activity_id: activity,
        custom_field_values: {
          '15': (fabrica => (fabrica ? 'Fábrica' : 'Cliente'))(fabrica)
        }
      }
    });
  })(trackme);
}

function postData(url, data) {
  const postData = JSON.stringify(data);

  const request = http.request({
    hostname: url,
    method: 'POST',
    path: '/time_entries.json',
    auth: `${process.env.USER}:${process.env.PASSWORD}`,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  });

  request.on('response', res => {
    console.log(res.statusCode);
    console.log(res.statusMessage);
    console.log(data);
  });

  request.on('error', e => {
    console.log(e);
    process.exit(1);
  });

  request.write(postData);
  request.end();
}
