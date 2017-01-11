![YUI](https://i.pyraxo.moe/2k3JzId.gif)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/kukogei/iris/master/LICENSE)

**YUI** serves as a base core for both Discord bots and selfbots. Requires **Node.js 6+**

## Installation
```bash
$ git clone https://github.com/kukogei/yui
$ cd iris
$ npm i
$ npm start
```

## Configuration
Create a new `.env` file from `.env.example` and edit the values as desired. Follow `.env` instructions [here](https://www.npmjs.com/package/dotenv-safe)
* `CLIENT_TOKEN` - Your bot token goes here
* `CLIENT_PREFIX` - Bot prefix
* `SELFBOT` - Set to `true` if you intend to use it as a selfbot, disables sharding
* `PROCESS_COUNT` - Number of child processes
* `SHARDS_PER_PROCESS` - Number of shards per child process

### Example .env
```
# Bot options
CLIENT_TOKEN=your token here
CLIENT_PREFIX=>
SELFBOT=true

# Sharding options
PROCESS_COUNT=1
SHARDS_PER_PROCESS=1
```

## Documentation
* [Eris](https://abal.moe/Eris/docs) - Discord library
* [Sylphy](https://github.com/pyraxo/sylphy/wiki) - Bot framework

