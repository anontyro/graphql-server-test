import {GraphQLObjectType, GraphQLInt, GraphQLString} from 'graphql';

const HotItemType = new GraphQLObjectType ({
  name: 'HotItemObject',
  description: `General object used to return data from the hot item endpoint
  this endpoint works differently to others as the objects returned can be of a few different
  types such as boardgames or publishers`,

  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'name given to teh hot item object',
      resolve: xml => xml.name[0].$.value,
    },
    id: {
      type: GraphQLInt,
      description: 'unique identifier for this item',
      resolve: xml => xml.$.id,
    },
    index: {
      type: GraphQLInt,
      description: 'returned index of the item',
      resolve: xml => xml.$.rank,
    },
    thumbnail: {
      type: GraphQLString,
      description: 'will get the boardgame thumbnail image as a string',
      resolve: xml => xml.thumbnail[0].$.value,
    },
    yearpublished: {
      type: GraphQLInt,
      description: `year published for item, if no year publish exists/ isn't
      logical for the item, eg: publisher then this is null `,
      resolve: xml => (xml.yearpublished ? xml.yearpublished[0].$.value : null),
    },
  }),
});

export default HotItemType;
