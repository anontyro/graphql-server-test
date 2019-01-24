import {GraphQLString} from 'graphql';
import CollectionType from '../../types/collectionType';
import collectionResolve from '../../resolvers/collectionResolver';

const collectionSchema = {
  type: CollectionType,
  args: {
    userName: {type: GraphQLString},
  },
  resolve: (root, args) => collectionResolve (root, args),
};

export default collectionSchema;
