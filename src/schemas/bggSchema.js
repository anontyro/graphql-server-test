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
import * as bggConsts from '../data/appConstants';

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
    }),
  }),
});
