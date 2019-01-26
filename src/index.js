import '@babel/polyfill';
import express from 'express';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';
import schema from './schemas/mainSchema';
import ABOUT_DATA from './data/aboutData';

const app = express ();

app.use (cors ());

app.get ('/', (req, res, next) => {
  res.json (ABOUT_DATA);

  next ();
});

app.use (
  '/graphql',
  graphqlHTTP ({
    schema,
    graphiql: true,
  })
);

app.listen (4000);
console.log ('GraphQL Server running...');
