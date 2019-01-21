import fetch from 'node-fetch';
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
import * as bggConsts from '../data/appConstants';
import { responseWrapper } from '../utils/responseWrapper';

const parseXML = util.promisify(require('xml2js').parseString);

const boardGameResolver = async (root, args) => {
  const response = await fetch(`${bggConsts.BGG_API}thing?type=${args.type}&id=${args.id}`);
  const arg1 = await response.text();
  const bg = await parseXML(arg1);
  return bg.items.item[0];
};

const searchResolver = async (root, args) => {
  const response = await fetch(`${bggConsts.BGG_API}search?query=${args.query}`);
  const arg1 = await response.text();
  const results = await parseXML(arg1);
  return results.items.item;
};

const userResolver = async (root, args) => {
  const { getCollection, userName } = args;
  const userResponse = await fetch(`${bggConsts.BGG_API}user?name=${userName}`);
  if (getCollection) {
  }
  const arg1 = await userResponse.text();
  const results = await parseXML(arg1);

  return results.user;
};

const collectionResolve = async (root, args) => {
  const { userName } = args;
  const response = await fetch(`${bggConsts.BGG_API}collection?username=${userName}`);
  const status = {
    status: response.status,
    statusText: response.statusText,
  };
  const arg1 = await response.text();
  const parsed = await parseXML(arg1);
  const output = responseWrapper(status, parsed);
  return output;
};

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '..',

    fields: () => ({
      boardgame: {
        type: BoardgameType,
        args: {
          id: { type: GraphQLInt },
          type: { type: GraphQLString, defaultValue: 'boardgame' },
        },
        resolve: (root, args) => boardGameResolver(root, args),
      },
      searchGame: {
        type: new GraphQLList(BoardgameType),
        args: {
          query: { type: GraphQLString },
        },
        resolve: (root, args) => searchResolver(root, args),
      },
      user: {
        type: UserType,
        description: '',
        args: {
          userName: { type: GraphQLString },
          getCollection: { type: GraphQLBoolean, defaultValue: false },
        },
        resolve: (root, args) => userResolver(root, args),
      },
      collection: {
        type: CollectionType,
        args: {
          userName: { type: GraphQLString },
        },
        resolve: (root, args) => collectionResolve(root, args),
      },
    }),
  }),
});
