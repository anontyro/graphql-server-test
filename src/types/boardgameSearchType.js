import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';
import { GameNameType } from './boardgameType';

export default new GraphQLObjectType({
  name: 'BoardgameSearchItem',
  description: '',

  fields: () => ({
    name: {
      type: new GraphQLList(GameNameType),
      resolve: xml => xml.name,
    },
    itemType: {
      type: GraphQLString,
      resolve: xml => xml.$.type,
    },
    id: {
      type: GraphQLInt,
      resolve: xml => xml.$.id,
    },
    yearPublished: {
      type: GraphQLString,
      resolve: xml => xml.yearpublished ? xml.yearpublished[0].$.value : null ,
    },

  })
});
