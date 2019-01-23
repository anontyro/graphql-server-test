import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';
import { GenericObjectType } from './genericType';
import * as boardGameConstants from '../data/boardGameConstants';

// Default object type for the boardgame item
export default new GraphQLObjectType({
  name: 'BoardgameItem',
  description: 'board game item returned from search',
  fields: () => ({
    name: {
      type: new GraphQLList(GameNameType),
      resolve: xml => xml.name,
    },
    thumbnails: {
      type: new GraphQLList(GraphQLString),
      resolve: xml => xml.thumbnail,
    },
    images: {
      type: new GraphQLList(GraphQLString),
      resolve: xml => xml.image,
    },
    description: {
      type: new GraphQLList(GraphQLString),
      resolve: xml => xml.description,
    },
    minPlayers: {
      type: GraphQLString,
      resolve: xml => xml.minplayers[0].$.value,
    },
    maxPlayers: {
      type: GraphQLString,
      resolve: xml => xml.maxplayers[0].$.value,
    },
    playTime: {
      type: GraphQLString,
      resolve: xml => xml.playingtime[0].$.value,
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
    mechanics: {
      type: new GraphQLList(GenericObjectType),
      resolve: xml => xml.link.filter(x => x.$.type === boardGameConstants.GAME_MECHANIC),
    },
    category: {
      type: new GraphQLList(GenericObjectType),
      resolve: xml => xml.link.filter(x => x.$.type === boardGameConstants.GAME_CATEGORY),
    },
    designer: {
      type: new GraphQLList(GenericObjectType),
      resolve: xml => xml.link.filter(x => x.$.type === boardGameConstants.GAME_DESINGER),
    },
    artist: {
      type: new GraphQLList(GenericObjectType),
      resolve: xml => xml.link.filter(x => x.$.type === boardGameConstants.GAME_ARTIST),
    },
    publisher: {
      description: 'returns a list of all the publishers for the game',
      type: new GraphQLList(GenericObjectType),
      resolve: xml => xml.link.filter(x => x.$.type === boardGameConstants.GAME_PUBLISHER),
    },
  }),
});

export const GameNameType = new GraphQLObjectType({
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
