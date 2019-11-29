const trackmine = require('commander');
const http = require('http');
const conf = require('conf');
const prompt = require('prompt');
require('dotenv').config();

const config = new conf({
  projectName: 'trackmine',
  user: {
    type: 'string',
    maximun: 100,
    minimum: 1
  },
  password: {
    type: 'string'
  },
  host: {
    type: 'string'
  }
});

trackmine
  .command('set')
  .option('-u, --user <user>', 'username')
  .option('-r, --redmine <host>', 'host')
  .action(options => {
    if (options.user) {
      config.set('user', options.user);
      prompt.message = '';
      prompt.start();

      process.stdout.clearLine();
      prompt.get(
        [
          {
            name: 'password',
            hidden: true,
            message: 'Please insert your password'
          }
        ],
        getPrompt
      );
    }
    if (options.redmine) {
      config.set('host', options.redmine);
    }
  });

async function getPrompt(err, res) {
  try {
    if (err) console.log('Unexpected error');
    config.set('password', res.password);
  } catch (err) {
    process.exit(1);
  }
}

trackmine
  .version('0.0.1')
  .name('trackme')
  .option('-i, --issue <issue>', 'issue')
  .option(
    '-w, --when <time>',
    "if no option provided it will use today's date",
    new Date().toISOString().split('T')[0]
  )
  .option('-h, --hours <hours>', 'amount of hours')
  .option('-c, --comments <comments>', 'commentario')
  .option('-a, --activity <activity_id>', 'activity id')
  .requiredOption(
    '-f --fabrica',
    'if it was at fabrica, this is the default behaviour',
    true
  )
  .helpOption('-e, --help', 'more information');

trackmine.parse(process.argv);

if (trackmine.issue && trackmine.hours) {
  const data = createEntry(trackmine);
  postEntry(config.get('host'), data);
}

if (!config.get('host')) {
  console.log('please set your redmine host with set -r <host>');
  process.exit(1);
}

if (!config.get('user')) {
  console.log('please set your credentials with set -u <user>');
  process.exit(1);
}

function createEntry(trackme) {
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

function postEntry(url, data) {
  const postData = JSON.stringify(data);

  const request = http.request({
    hostname: url,
    method: 'POST',
    path: '/time_entries.json',
    auth: `${config.get('user')}:${config.get('password')}`,
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
