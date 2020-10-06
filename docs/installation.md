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

You can now log in with the user «teacher@teachen.ch» or «student@teachen.ch». The password will be «teachen». Unfortunately it is currently not trivial to create a new user the dev environment. You can create one (http://localhost:3000/user/signup), but the activation email will not be sent if NODE_ENV=development. So you'll have to manually activate the user in the database (users.email_verified = date).

```bash
docker exec -it postgres psql -U voty -c "update users set email_verified=NOW() where email='name@email.com'";
```

## Build Process

Once you start changing the software, you need to have a basic understanding of the build process and how to generate the various (typing-) artifacts with prisma, nexus and graphql-codegen.

When you change the [schema.prisma](../prisma/schema.prisma), then you will need to rebuild the prisma client and run database migrations (currently we are running in Prisma's [automatic migration mode](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-migrate)):

```bash
yarn run migrate # runs experimental db migration and generates prisma client
```

When you change the [GraphQL Schema](../graphql/schema.ts), then you will need to update the typings which are used in the frontend code (we can't use "@prisma/client" because of a next.js bug:

```bash
yarn run graphql # generates graphql/types.d.ts
```

## Next Steps

👉 Now go have a look at our [tech stack](./stack.md)

👉 Study our Prisma Schema: [schema.prisma](../prisma/schema.prisma)

👉 See how the [GraphQL Backend is defined](../graphql/schema.ts)

👉 How permissions are handled with [GraphQL-Shield](https://github.com/maticzav/graphql-shield) in [/graphql/permissions.ts](../graphql/permissions.ts)

👉 Have a look at the [open issues](https://github.com/teachen-ch/voty/issues) and see if you want to tackle one 🙏
