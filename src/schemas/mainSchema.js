import util from 'util';
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';
import BoardgameType from '../types/boardgameType';
import UserType from '../types/userType';
import CollectionType from '../types/collectionType';
import BoardGameSearchType from '../types/boardgameSearchType';
import boardGameResolver from '../resolvers/boardgameResolver';
import searchResolver from '../resolvers/searchResolver';
import userResolver from '../resolvers/userResolver';
import collectionResolve from '../resolvers/collectionResolver';
import hotItemResolve from '../resolvers/hotItemsResolver';

export const parseXML = util.promisify (require ('xml2js').parseString);

const boardGameSchema = {
  type: BoardgameType,
  args: {
    id: {type: GraphQLInt},
    type: {type: GraphQLString, defaultValue: 'boardgame'},
  },
  resolve: (root, args) => boardGameResolver (root, args),
};

const searchGameSchema = {
  type: new GraphQLList (BoardGameSearchType),
  args: {
    query: {type: GraphQLString},
  },
  resolve: (root, args) => searchResolver (root, args),
};

const userSchema = {
  type: UserType,
  description: '',
  args: {
    userName: {type: GraphQLString},
    getCollection: {type: GraphQLBoolean, defaultValue: false},
  },
  resolve: (root, args) => userResolver (root, args),
};

const collectionSchema = {
  type: CollectionType,
  args: {
    userName: {type: GraphQLString},
  },
  resolve: (root, args) => collectionResolve (root, args),
};

const hotItemSchema = {
  type: new GraphQLList (BoardgameType),
  args: {
    item: {type: GraphQLString, defaultValue: 'boardgame'},
  },
  resolve: (root, args) => hotItemResolve (root, args),
};

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
