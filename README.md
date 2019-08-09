# Socket/REST server for chat

> There are not separate user dialogs at that moment - all users are in the same dialog(room).

It is used in projects:
- [Flutter chat](https://github.com/Burize/flutter-chat);

### Used features:
 * [KoaJS](https://github.com/koajs/koa) as rest framework
 * TypeScript
 * MongoDB

### Authentication
User authentication and access to secure routes done via JWT token.

### Restore and start DataBase

```bash
# create local folder for data base 
$ mkdir dataBase

# restore data from backup
$ mongorestore backup

# run mongo at restored dump
$  mongod --port 27017 --dbpath=./dataBase
```

> There are two initial users:
> 89138131788 / black ice
> 89138134455 / mankind

### Start server

```bash
npm i
npm run dev
```
