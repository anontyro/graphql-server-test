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
        resolve: (root, args) =>
          fetch(`${bggConsts.bggApi}thing?type=${args.type}&id=${args.id}`)
            .then(response => response.text())
            .then(parseXML)
            .then(bg => bg.items.item[0]),
      },
      searchGame: {
        type: new GraphQLList(BoardgameType),
        args: {
          query: { type: GraphQLString },
        },
        resolve: (root, args) =>
          fetch(`${bggConsts.bggApi}search?query=${args.query}`)
            .then(response => response.text())
            .then(parseXML)
            .then(results => results.items.item),
      },
    }),
  }),
});

// const output = fetch(`https://www.boardgamegeek.com/xmlapi2/thing?type=boardgame&id=176920`)
//   .then(response => response.text())
//   .then(parseXML)
//   // .then(results => results.items.$.total)  // gets total results
//   .then(results => results.items.item[0].name[0].$);
// output;
