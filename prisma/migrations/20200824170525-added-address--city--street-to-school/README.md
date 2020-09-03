# Migration `20200824170525-added-address--city--street-to-school`

This migration has been generated by Stefan N at 8/24/2020, 7:05:25 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."schools" ADD COLUMN "city" text   NOT NULL DEFAULT E'',
ADD COLUMN "canton" text   NOT NULL DEFAULT E'',
ADD COLUMN "zip" text   NOT NULL DEFAULT E'',
ADD COLUMN "address" text   NOT NULL DEFAULT E''
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200824165329-added-minor-fields-and-fixed-relations..20200824170525-added-address--city--street-to-school
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgres"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -108,8 +108,12 @@
 model School {
   id       Int      @default(autoincrement()) @id
   name     String
   domain   Domain?  @relation(fields: [domainId], references: [id])
+  city     String   @default("")
+  canton   String   @default("")
+  zip      String   @default("")
+  address  String   @default("")
   domainId Int?
   members  User[]   @relation("SchoolUser")
   teams    Team[]   @relation("SchoolTeam")
   ballots  Ballot[]
```

