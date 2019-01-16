import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';
import { GenericObjectType } from './genericType';
import BoardgameType from './boardgameType';

const CollectionGameType = new GraphQLObjectType({
  name: 'ColectionSpecificGame',
  description: '',

  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: item => item.name[0]._,
    },
  }),
});

const StatusType = new GraphQLObjectType({
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

const ErrorType = new GraphQLObjectType({
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

export default new GraphQLObjectType({
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
      type: new GraphQLList(CollectionGameType),
      resolve: xml => xml.body.items.item,
    },
  }),
});
