import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';
import {getGameCollectionStatus} from '../utils/xmlUtils';
import {COLLECTION_CONSTS} from '../data/collectionConstants';

const CollectionGameStatusType = new GraphQLObjectType ({
  name: 'CollectionGameStatus',
  description: '',

  fields: () => ({
    owned: {
      type: GraphQLBoolean,
      resolve: status =>
        getGameCollectionStatus (status, COLLECTION_CONSTS.STATUS.OWNED),
    },
    preOwned: {
      type: GraphQLBoolean,
      resolve: status =>
        getGameCollectionStatus (
          status,
          COLLECTION_CONSTS.STATUS.PREVIOUS_OWNED
        ),
    },
    forTrade: {
      type: GraphQLBoolean,
      resolve: status =>
        getGameCollectionStatus (status, COLLECTION_CONSTS.STATUS.FOR_TRADE),
    },
    want: {
      type: GraphQLBoolean,
      resolve: status =>
        getGameCollectionStatus (status, COLLECTION_CONSTS.STATUS.WANT),
    },
    wantToPlay: {
      type: GraphQLBoolean,
      resolve: status =>
        getGameCollectionStatus (status, COLLECTION_CONSTS.STATUS.WANT_TO_PLAY),
    },
    wantToBuy: {
      type: GraphQLBoolean,
      resolve: status =>
        getGameCollectionStatus (status, COLLECTION_CONSTS.STATUS.WANT_TO_BUY),
    },
    wishlist: {
      type: GraphQLBoolean,
      resolve: status =>
        getGameCollectionStatus (status, COLLECTION_CONSTS.STATUS.WISHLIST),
    },
    preOrdered: {
      type: GraphQLBoolean,
      resolve: status =>
        getGameCollectionStatus (status, COLLECTION_CONSTS.STATUS.PREORDERED),
    },
    lastModified: {
      type: GraphQLString,
      resolve: status => status.$.lastmodified,
    },
  }),
});

const CollectionGameMetaType = new GraphQLObjectType ({
  name: 'CollectionGameMeta',
  description: '',

  fields: () => ({
    objectType: {
      type: GraphQLString,
      resolve: meta => meta.objecttype,
    },
    objectId: {
      type: GraphQLString,
      resolve: meta => meta.objectid,
    },
    subType: {
      type: GraphQLString,
      resolve: meta => meta.subtype,
    },
    collectionId: {
      type: GraphQLString,
      resolve: meta => meta.collid,
    },
  }),
});

const CollectionGameType = new GraphQLObjectType ({
  name: 'ColectionSpecificGame',
  description: '',

  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: item => item.name[0]._,
    },
    meta: {
      type: CollectionGameMetaType,
      resolve: item => item.$,
    },
    image: {
      type: GraphQLString,
      resolve: item => item.image[0],
    },
    thumbnail: {
      type: GraphQLString,
      resolve: item => item.thumbnail[0],
    },
    numberOfPlays: {
      type: GraphQLInt,
      resolve: item => item.numplays[0],
    },
    gameStatus: {
      type: CollectionGameStatusType,
      resolve: item => item.status[0],
    },
  }),
});

const StatusType = new GraphQLObjectType ({
  name: 'CollectionStatus',
  description: '',

  fields: () => ({
    code: {
      type: GraphQLInt,
      resolve: status => status.status,
    },
    message: {
      type: GraphQLString,
      resolve: status => status.statusText,
    },
  }),
});

const ErrorType = new GraphQLObjectType ({
  name: 'ErrorItem',
  description: '',

  fields: () => ({
    code: {
      type: GraphQLInt,
      resolve: error => error.code,
    },
    message: {
      type: GraphQLString,
      resolve: error => error.message,
    },
  }),
});

export default new GraphQLObjectType ({
  name: 'boardGameCollection',
  description: 'Complete collection object that includes a wrapper for safety',
  fields: () => ({
    status: {
      type: StatusType,
      resolve: xml => xml.status,
    },
    error: {
      type: ErrorType,
      resolve: xml => xml.error,
    },
    body: {
      type: new GraphQLList (CollectionGameType),
      resolve: xml => xml.body.items.item,
    },
  }),
});
