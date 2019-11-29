# trackmine

install deps

`yarn install`

set `.env` file as follows:

```
RM_USER=youredmineuser
RM_PASS=youredminepass
RM_HOST=redmine.domain.com
```

usage

`node index.js -h 1.00 -i 11123`

AND you can create an alias 

`alias trackmine='$PWD node index.js'`

in fish:

`funcsave trackmine`
