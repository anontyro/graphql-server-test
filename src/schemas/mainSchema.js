import util from 'util';
import {GraphQLObjectType, GraphQLSchema} from 'graphql';
import boardGameSchema from './bggSchemas/boardGameSchema';
import searchGameSchema from './bggSchemas/searchGameSchema';
import userSchema from './bggSchemas/userSchema';
import collectionSchema from './bggSchemas/collectionSchema';
import hotItemSchema from './bggSchemas/hotItemSchema';

/* eslint-disable global-require */
export const parseXML = util.promisify (require ('xml2js').parseString);

export default new GraphQLSchema ({
  query: new GraphQLObjectType ({
    name: 'Query',
    description: 'Main query schema for board game geek api https://boardgamegeek.com/wiki/page/BGG_XML_API2',

    fields: () => ({
      boardgame: boardGameSchema,
      searchGame: searchGameSchema,
      user: userSchema,
      collection: collectionSchema,
      hotItems: hotItemSchema,
    }),
  }),
});
