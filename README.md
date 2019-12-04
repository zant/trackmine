# trackmine

### installing

`git clone https://github.com/grdnrt/trackmine.git`
 
`cd trackmine`

`yarn install`

create an alias

`alias trackmine='$PWD node index.js'`

### usage

**obs:** redmine's server admin should enable the REST API option in Administration -> Settings -> API

to create a basic time entry with `hour=1`, `issue_id=11123` & `comment=comments`

`trackmine -h 1.00 -i 11123 -c "comments"`

the complete API is available with `--help`

### license

[MIT](https://github.com/grdnrt/trackmine/blob/master/LICENSE)
