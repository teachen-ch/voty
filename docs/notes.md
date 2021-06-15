# Notes

What follows are a few random notes which eventually should go into some docs

### How to test the GraphQL API with curl

curl -H "x-access-token: <<<token>>>" -d '{"query": "{me {name id }}"}' -H "Content-Type: application/json" localhost:3000/api
