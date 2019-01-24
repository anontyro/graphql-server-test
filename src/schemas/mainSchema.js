import util from 'util';
import {GraphQLObjectType, GraphQLSchema} from 'graphql';
import boardGameSchema from './bggSchemas/boardgameSchema';
import searchGameSchema from './bggSchemas/searchGameSchema';
import userSchema from './bggSchemas/userSchema';
import collectionSchema from './bggSchemas/collectionSchema';
import hotItemSchema from './bggSchemas/hotItemSchema';

export const parseXML = util.promisify (require ('xml2js').parseString);

export default new GraphQLSchema ({
  query: new GraphQLObjectType ({
    name: 'Query',
    description: '..',

    fields: () => ({
      boardgame: boardGameSchema,
      searchGame: searchGameSchema,
      user: userSchema,
      collection: collectionSchema,
      hotItems: hotItemSchema,
    }),
  }),
});
