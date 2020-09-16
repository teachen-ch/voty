# Installing Voty

## Development Setup

In order to get started with testing, developing and contributing to voty, you will need to first check out our repo and [install docker](https://docs.docker.com/get-docker/).

```bash
git clone https://github.com/teachen-ch/voty.git
cd voty
```

Now you can lift up the docker environment consisting of the two services «app» and «postgres» (see [docker-compose.yml](../docker-compose.yml)).

```bash
docker-compose up
```

On the first run you will need to initialize the database with the schema. We will run prisma migrate --experimental for this (see [Prisma CLI docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-cli/command-reference#migrations-experimental)).

```bash
docker exec app yarn run init:db
```

Now you have an empty database schema, but no content in it to play around. We can get some demo-content into the database, by loading the file [testdb.yml](../cypress/fixtures/testdb.yml) into the database. This file be automatically loaded before every test run, so let's just run the tests:

```bash
docker exec -it app yarn run test
```

If you (we?) are lucky, all the tests will pass 🎉. We are still struggling a bit with test flakiness and timeouts, so maybe you want to run above command a second time if it fails. Now let's open our fresh local app in our browser:

```bash
http://localhost:3000/
```

You can now log in with the user «teacher@teachen.ch» or «student@teachen.ch». The password will be «teachen». Unfortunately it is currently not trivial to create a new user the dev environment. You can create one (http://localhost:3000/user/signup), but the activation email will not be sent if NODE_ENV=development. So you'll have to manually activate the user in the database.
