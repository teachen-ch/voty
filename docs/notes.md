# Notes

What follows are a few random notes which eventually should go into some docs

### How to test the GraphQL API with curl

curl -H "x-access-token: <<<token>>>" -d '{"query": "{me {name id }}"}' -H "Content-Type: application/json" localhost:3000/api

### How to upgrade systems

```
ssh dev
apt-get update && apt-get upgrade -y && apt-get dist-upgrade

ssh backup
apt-get update && apt-get upgrade -y && apt-get dist-upgrade

ssh prod
apk update && apk upgrade --available && sync
```
