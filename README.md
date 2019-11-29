# trackmine

### installing

`yarn install`

set `.env`:

```
RM_USER=youredmineuser
RM_PASS=youredminepass
RM_HOST=redmine.domain.com
```
**obs:** redmine's server admin should enable the REST API option in Administration -> Settings -> API

create an alias 

`alias trackmine='$PWD node index.js'`

### usage

to create a basic time entry with `hour=1` and `issue_id=11123`

`trackmine -h 1.00 -i 11123`

the complete API is available with `--help`

### license
[MIT](https://github.com/grdnrt/trackmine/blob/master/LICENSE)
