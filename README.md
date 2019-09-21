# Socket/REST server for chat

> There are not separate user dialogs at that moment - all users are in the same dialog(room).

It is used in projects:
- [Flutter chat](https://github.com/Burize/flutter-chat);
- [PWA chat](https://github.com/Burize/PWA-RxJS-chat).


### Used features:
 * [KoaJS](https://github.com/koajs/koa) as rest framework;
 * [TypeScript](https://www.typescriptlang.org/);
 * [MongoDB](https://www.mongodb.com/).

### Authentication
User authentication and access to secure routes done via JWT token.

### Restore and start DataBase

Firstly, you need install [MongoDB](https://www.mongodb.com/);

Then, launch database via these commands: 
```bash
# create local folder for database 
$ mkdir dataBase

# restore data from backup
$ mongorestore backup

# run mongo at restored dump
$  mongod --port 27017 --dbpath=./dataBase
```

> There are several initial users:
> 89138131788 / black ice
> 89138134455 / mankind
> 89138136677 / scavenger
> 89138132077 / cyberpunk

### Start server

Set appropriate host and port at `src/core/config.ts` 

```bash
npm i
npm run dev
```
