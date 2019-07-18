# Socket server for chats

### Used features:
 * [KoaJS](https://github.com/koajs/koa) as rest framework
 * TypeScript
 * MongoDB

### Restore and start DataBase

```bash
# create local folder for data base 
$ mkdir dataBase

# restore data from backup
$ mongorestore backup

# run mongo at restored dump
$  mongod --port 27017 --dbpath=./dataBase
```

### Start server

```bash
npm i
npm run dev
```

