# How to Add New Datatypes

## Architecture

The frontend consumes almost all data (except for a file uploads) through a GraphQL API powered by Nexus / Prisma. Here's the steps involved to get a new datatype up and running.

### Prisma Schema

Edit [/prisma/schema.prisma](/prisma/schema.prisma) to your will. Don't forget to add @mmap on all new tables and relations, so that the psql database is easy to use (it does not like camelCase without single quotes...). When done, you can apply the changes to the development database:

```
yarn run migrate
```

This will generate the [/prisma/migrations/](/prisma/migrations/) files and also run `npx prisma generate` to update the typescript definitions for the Prisma client.

### GraphQL Schema

Now you can create a new schema file [/graphql/schema/](/graphql/schema/). There you specify both which database fields are exposed in the API as well as define Graphql Queries and Mutations. You may use the [CRUD-Feature](https://nexusjs.org/docs/plugins/prisma/overview#example) of Prisma to speed things up. Add your new file to `/graphql/schema/index.ts`, so that it will be picked up.

### GraphQL Resolvers

The resolvers are the business logic of our API and they live in [/graphql/resolvers/](/graphql/resolvers/). Add a resolver for the new database and also list it and export it in `/graphql/resolvers/index.ts`.

Now **restart your application** in dev-mode and the **reload a page** in your browser. This should automatically generate `/graphql/nexus-plugin-prisma.ts`, `/graphql/nexus.ts` and `/graphql/api.graphql`.

### GraphQL Frontend

In order to generate the Apollo helpers and types for the frontend, you need to run to generate `/graphql/types.ts` using graphql-codegen:

```
yarn run graphql
```

Now you can start defining `gql` Apollo queries in your frontend code, like the following:

```javascript
export const USERS = gql`
  query users($where: UserWhereInput) {
    users(where: $where) {
      id
      …
    }
  }
```

If you now run `yarn run graphql` again, the Apollo-helpers for this query will be generated, e.g.

```javascript
const usersQuery = useUsersQuery({ variables: { where: { id: "…" } } });
const users = usersQuery.data?.users;
```

And off you go. Unless you forgot a step somewhere above. VSCode tends to need a reload quite often after generating the new types.

### Permissions

Lastly, you will need to add permissions for your new Queries, your new Mutations and field-level control on your new datatype in `[/graphql/permissions.ts](/graphql/permissions.ts). There are a few helper functions to make content available only to logged in users, to teachers, admins, etc.
