import express from 'express';
import "@babel/polyfill";
import graphqlHTTP from 'express-graphql';
import schema from './schemas/bggSchema';

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

app.listen(4000);
console.log('GraphQL Server running...');
