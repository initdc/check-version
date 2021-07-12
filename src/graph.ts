import { graphql, buildSchema } from 'graphql'

// Construct a schema, using GraphQL schema language
let schema = buildSchema(`
  type Query {
    hello: String
    world: String
  }
`);

// The root provides a resolver function for each API endpoint
let root = {
  hello: 'Hello, hello!',
  world: 'Hello, world!'

};

// Run the GraphQL query '{ hello }' and print out the response
graphql(schema, '{ world }', root).then((response) => {
  console.log(response);
});
