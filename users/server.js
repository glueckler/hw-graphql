const express = require('express')
const expressGraphQL = require('express-graphql')
const schema = require('./schema/schema')

const app = express()

app.use(
  '/graphql',
  expressGraphQL({
    schema,
    // graphiql is a development tool for queries against dev server
    graphiql: true,
  })
)

app.listen(4000, () => {
  console.log(`Listening`)
})
