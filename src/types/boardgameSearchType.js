import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import {GameNameType} from './boardgameType';

export default new GraphQLObjectType ({
  name: 'BoardgameSearchItem',
  description: `Special smaller game item that is returned from the search containing only limited fields`,

  fields: () => ({
    name: {
      type: new GraphQLList (GameNameType),
      description: 'the list of different names for the item',
      resolve: xml => xml.name,
    },
    itemType: {
      type: GraphQLString,
      description: 'item specific type such as boardgame, etc...',
      resolve: xml => xml.$.type,
    },
    id: {
      type: GraphQLInt,
      description: 'the unique id number associated with this item',
      resolve: xml => xml.$.id,
    },
    yearPublished: {
      type: GraphQLString,
      description: 'the year the game was officially published as an int, will return null if not published',
      resolve: xml => (xml.yearpublished ? xml.yearpublished[0].$.value : null),
    },
  }),
});
