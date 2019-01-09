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
    }),
  }),
});

// const reformatXML = xml => {
//   return xml;
// };

// const x = fetch(`https://www.boardgamegeek.com/xmlapi/boardgame/68448`)
//   .then(response => response.text())
//   .then(parseXML)
//   .then(bg => reformatXML(bg.boardgames.boardgame[0].name));

// x;
