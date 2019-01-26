import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';
import GenericObjectType from './genericType';
import * as boardGameConstants from '../data/boardGameConstants';

export const GameNameType = new GraphQLObjectType ({
  name: 'GameName',
  description: 'general name object for the game containing three items: name, primary, sortIndex',

  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'name of the game',
      resolve: xml => xml.$.value,
    },
    primary: {
      type: GraphQLBoolean,
      description: 'is this the primary listing item',
      resolve: xml => xml.$.type === 'primary',
    },
    sortIndex: {
      type: GraphQLInt,
      description: 'sorting index used to list the names in order',
      resolve: xml => xml.$.sortindex,
    },
  }),
});

// Default object type for the boardgame item
export default new GraphQLObjectType ({
  name: 'BoardgameItem',
  description: `main board game item returned from the boardgame endpoint this item contains an indepth description
  that can be used to get complete game detail`,
  fields: () => ({
    name: {
      type: new GraphQLList (GameNameType),
      description: 'the list of different names for the item',
      resolve: xml => xml.name,
    },
    thumbnails: {
      type: new GraphQLList (GraphQLString),
      description: 'a list of all the thumbnail strings attached to this item',
      resolve: xml => xml.thumbnail,
    },
    images: {
      type: new GraphQLList (GraphQLString),
      description: 'a list of all the image strings attached to this item',
      resolve: xml => xml.image,
    },
    description: {
      type: new GraphQLList (GraphQLString),
      description: 'a list of stringHTML items containing information about the item',
      resolve: xml => xml.description,
    },
    minPlayers: {
      type: GraphQLInt,
      description: 'an int value for the minimum number of players able to play the game',
      resolve: xml => xml.minplayers[0].$.value,
    },
    maxPlayers: {
      type: GraphQLInt,
      description: 'an int value for the maximum number of players the game is able to support',
      resolve: xml => xml.maxplayers[0].$.value,
    },
    playTime: {
      type: GraphQLInt,
      description: 'the amount of time in minutes the game is expected to last according to the publisher',
      resolve: xml => xml.playingtime[0].$.value,
    },
    id: {
      type: GraphQLInt,
      description: 'the unique id number associated with this item',
      resolve: xml => xml.$.id,
    },
    yearPublished: {
      type: GraphQLInt,
      description: 'the year the game was officially published as an int, will return null if not published',
      resolve: xml => (xml.yearpublished ? xml.yearpublished[0].$.value : null),
    },
    mechanics: {
      type: new GraphQLList (GenericObjectType),
      description: 'a list of different game mechanics that are associated with the game',
      resolve: xml =>
        xml.link.filter (x => x.$.type === boardGameConstants.GAME_MECHANIC),
    },
    category: {
      type: new GraphQLList (GenericObjectType),
      description: 'a list of categories that the game falls into',
      resolve: xml =>
        xml.link.filter (x => x.$.type === boardGameConstants.GAME_CATEGORY),
    },
    designer: {
      type: new GraphQLList (GenericObjectType),
      description: 'a list of all the designers that helped create and develop the game',
      resolve: xml =>
        xml.link.filter (x => x.$.type === boardGameConstants.GAME_DESINGER),
    },
    artist: {
      type: new GraphQLList (GenericObjectType),
      description: 'a list of all the artists that contributed to the artwork in the game',
      resolve: xml =>
        xml.link.filter (x => x.$.type === boardGameConstants.GAME_ARTIST),
    },
    publisher: {
      description: 'a list of all the publishers who have published the game',
      type: new GraphQLList (GenericObjectType),
      resolve: xml =>
        xml.link.filter (x => x.$.type === boardGameConstants.GAME_PUBLISHER),
    },
  }),
});
