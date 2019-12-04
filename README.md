# trackmine

### installing

`git clone https://github.com/grdnrt/trackmine.git`
 
`cd trackmine`

`yarn install`

create an alias

`alias trackmine='node $PWD/index.js'`

### usage

**obs:** redmine's server admin should enable the REST API option in Administration -> Settings -> API

to create a basic time entry with `hour=1`, `issue_id=11123` & `comment=comments`

`trackmine -h 1.00 -i 11123 -c "comments"`

**API:**

```
  -V, --version                 output the version number
  -i, --issue <issue>           issue
  -w, --when <time>             if no option provided it will use today's date (default: "2019-12-04")
  -h, --hours <hours>           amount of hours
  -c, --comments <comments>     commentario
  -a, --activity <activity_id>  activity id
  -e, --help                    more information
```

### license

[MIT](https://github.com/grdnrt/trackmine/blob/master/LICENSE)
