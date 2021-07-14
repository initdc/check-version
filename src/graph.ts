import {graphql, buildSchema} from 'graphql'

// Construct a schema, using GraphQL schema language
let schema = buildSchema(`
  type Query {
    hello: World
  }
  type World {
    world: String
  }
`)

// The root provides a resolver function for each API endpoint
let root = {
  hello: {
    world: 'Hello, world!'
  }
}

// Run the GraphQL query '{ hello }' and print out the response
graphql(schema, '{ hello { world } }', root).then(response => {
  // @ts-ignore
  console.log(response.data['hello']['world'])
})
