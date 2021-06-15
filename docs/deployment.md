# Deployment

Our CI/CD pipelines runs on GitHub Actions. On each commit, .github/workflows/docker-publish.yml will build a docker image of voty.ch, run cypress E2E tests and, if successful, push the latest image to packages.github.com. From there it can be deployed easily with a few scripts.

## Deploying to the Development Environment

```
yarn run migrate:dev
yarn run deploy:dev
```

The first command will migrate the database schema, the second will fetch the latest image from packages.github.com and docker-compose the app.

## Deploying to the Production

```
yarn run migrate:prod
yarn run deploy:prod
```

## Shortcut: Directly publish to Dev and Prod

As there is a considerate amount of waiting involved while the CI/CD pipeline tests and publishes the build, there is a script which will commit all added changes, run pre-commit hooks, push to github, run tests, wait for ~10 minutes and then deploy to dev.voty.ch and ask whether to follow-up with a prod deployment:

```
yarn run deploy "This is the commit message for recent changes"
```
