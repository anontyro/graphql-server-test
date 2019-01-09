import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';

export const GenericObjectType = new GraphQLObjectType({
  name: 'GenericObject',
  description: 'general object type used by bgg',

  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: xml => xml.$.value,
    },
    id: {
      type: GraphQLString,
      resolve: xml => xml.$.id,
    },
    type: {
      type: GraphQLString,
      resolve: xml => xml.$.type,
    },
  }),
});
