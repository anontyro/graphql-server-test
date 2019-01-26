import {GraphQLObjectType, GraphQLString} from 'graphql';

export default new GraphQLObjectType ({
  name: 'GenericObject',
  description: `Standard recurring object that is commonly used in the bgg api to return just these three items`,

  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'complete name of the item',
      resolve: xml => xml.$.value,
    },
    id: {
      type: GraphQLString,
      description: 'the unique id associated with this item',
      resolve: xml => xml.$.id,
    },
    type: {
      type: GraphQLString,
      description: 'the specific type that this item is classed as',
      resolve: xml => xml.$.type,
    },
  }),
});
