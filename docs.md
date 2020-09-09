# Documentation

## Modules, Libraries, Frameworks

Here we compile a handy list of links to the documentation of (some) of the 3rd-party stuff we use in our stack:

### Backend

#### Server Backend

- Next.js: https://nextjs.org/docs/

#### Database Schema

- Prisma: https://www.prisma.io/docs/

#### GraphQL Backend with Prisma Schemas

- Nexus.js: https://nexus.js.org/docs/nexus-prisma

#### Graphql Permission Definition

- GraphQL-Shield: https://github.com/maticzav/graphql-shield

#### State Management

- Recoil: https://recoiljs.org/docs/guides/asynchronous-state-sync

### Frontend

#### Frontend Framework

- React: https://reactjs.org/docs/react-api.html

#### UI Components

- Rebass: https://rebassjs.org/getting-started

#### Themes

- Theme UI: https://theme-ui.com/getting-started

#### GraphQL Client

- Apollo Client (React): https://www.apollographql.com/docs/react/

#### Email Templates

- MjMl: https://mjml.io/documentation/

### Operations ( CI / CD )

#### Host Virtualization

- Docker: https://docs.docker.com

#### Orchestration

- Ansible: https://docs.ansible.com/ansible/latest/index.html

#### GitHub Actions

- GitHub Actions: https://docs.github.com/en/actions

#### Integration Testing (E2E)

- Cypress: https://docs.cypress.io/

## Random Notes

What follows are a few random notes which eventually should go into some docs

### Database backup

sudo apt install s3cmd
sudo s3cmd --configure

### How to test graphql API with curl

curl -H "x-access-token: <<<token>>>" -d '{"query": "{me {name id }}"}' -H "Content-Type: application/json" localhost:3000/api/graphql

### Deployment

Our CI/CD pipelines runs on GitHub Actions. On each commit, deploy-publish.yml will build a docker image of voty, run cypress E2E tests and, if successful, push the latest image to packages.github.com. From there it can be deployed to migration as follows:

```
yarn run migrate_dev
yarn run deploy_dev
```

The first command will migrate the database schema, the second will fetch the latest image from packages.github.com and docker-compose the app.
