# trackmine

install deps

`yarn install`

set `.env` file as follows:

```
RM_USER=youredmineuser
RM_PASS=youredminepass
RM_HOST=redmine.domain.com
```

### usage

the complete API is available with `--help`

to create a basic time entry with `hour=1` and `issue_id=11123`

`node index.js -h 1.00 -i 11123`

AND you can create an alias 

`alias trackmine='$PWD node index.js'`

in fish:

`funcsave trackmine`
