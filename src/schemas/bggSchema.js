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
import { urlencoded } from 'body-parser';

const parseXML = util.promisify(require('xml2js').parseString);

const GameNameValueType = new GraphQLObjectType({
  name: 'GameNameValue',
  description: '...',

  fields: () => ({
    primary: GraphQLBoolean,
    sortindex: GraphQLInt,
  }),
});

const GameNameType = new GraphQLObjectType({
  name: 'GameName',
  description: 'name object for the game',

  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: xml => xml._,
    },
    primary: {
      type: GraphQLBoolean,
      resolve: xml => xml.$.primary === 'true',
    },
    sortIndex: {
      type: GraphQLInt,
      resolve: xml => xml.$.sortindex,
    },
  }),
});

const BoardgameType = new GraphQLObjectType({
  name: 'Boardgame',
  description: '..',

  fields: () => ({
    name: {
      type: new GraphQLList(GameNameType),
      resolve: xml => xml.name,
    },
    yearPublished: {
      type: GraphQLString,
      resolve: xml => xml.yearpublished[0],
    },
  }),
});

// SEARCH

const BoardgameListType = new GraphQLObjectType({
  name: 'BoardgameItem',
  description: 'board game item returned from search',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: xml => xml.name[0].$.value,
    },
    id: {
      type: GraphQLString,
      resolve: xml => xml.$.id,
    },
    type: {
      type: GraphQLString,
      resolve: xml => xml.name[0].$.type,
    },
    yearPublished: {
      type: GraphQLString,
      resolve: xml => (xml.yearpublished ? xml.yearpublished[0].$.value : 'N/A'),
    },
  }),
});

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '..',

    fields: () => ({
      boardgame: {
        type: BoardgameType,
        args: {
          id: { type: GraphQLInt },
        },
        resolve: (root, args) =>
          fetch(`https://www.boardgamegeek.com/xmlapi/boardgame/${args.id}`)
            .then(response => response.text())
            .then(parseXML)
            .then(bg => bg.boardgames.boardgame[0]),
      },
      searchGame: {
        type: new GraphQLList(BoardgameListType),
        args: {
          query: { type: GraphQLString },
        },
        resolve: (root, args) =>
          fetch(`https://www.boardgamegeek.com/xmlapi2/search?query=${args.query}`)
            .then(response => response.text())
            .then(parseXML)
            .then(results => results.items.item),
      },
    }),
  }),
});

const output = fetch(`https://api.geekdo.com/xmlapi2/search?query=mission`)
  .then(response => response.text())
  .then(parseXML)
  // .then(results => results.items.$.total)  // gets total results
  .then(results => results.items.item[0].$.id);
output;
