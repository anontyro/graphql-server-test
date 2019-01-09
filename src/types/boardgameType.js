import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';

// Default object type for the boardgame item
export default new GraphQLObjectType({
  name: 'BoardgameItem',
  description: 'board game item returned from search',
  fields: () => ({
    name: {
      type: new GraphQLList(GameNameType),
      resolve: xml => xml.name,
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
      resolve: xml => (xml.yearpublished ? xml.yearpublished[0].$.value : null),
    },
  }),
});

const GameNameType = new GraphQLObjectType({
  name: 'GameName',
  description: 'name object for the game',

  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: xml => xml.$.value,
    },
    primary: {
      type: GraphQLBoolean,
      resolve: xml => xml.$.type === 'primary',
    },
    sortIndex: {
      type: GraphQLInt,
      resolve: xml => xml.$.sortindex,
    },
  }),
});

const GameNameValueType = new GraphQLObjectType({
  name: 'GameNameValue',
  description: '...',

  fields: () => ({
    primary: GraphQLBoolean,
    sortindex: GraphQLInt,
  }),
});
