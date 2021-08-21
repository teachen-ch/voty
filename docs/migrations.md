# Migrations

we use prisma migrate to keep the schema.prisma in sync with the dev and prod databases

On localhost you can easily wipe the database and install the new database schema after a prisma schema change with the following commands:

```
yarn init:db
yarn reset:db
```

If you would like to change the staging/dev or the production environment, you can do so:

```
yarn migrate:dev
yarn migrate:prod
```

However, there might be occasional drift in the production schema, and the automatic migrations fail. First you need to find out what the current state is. Log into the remote enviroment and execute:

```
yarn prisma migrate status
```

This will list the culprit migration. Now open the respective file in prisma/migrations and check the sql statements and execute them manually where they failed. Existing content or null-fields in the database could be the reason for the failure.

Finally you can mark the manually applied translation as resolved with the following command (from the docker app on the environment):

```
yarn prisma migrate resolve --applied 123456789_name_of_migration
```

Now, hopefully, all schemas should be in sync again.
