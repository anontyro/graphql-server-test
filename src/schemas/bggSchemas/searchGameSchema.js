import {GraphQLString, GraphQLList} from 'graphql';
import BoardGameSearchType from '../../types/boardgameSearchType';
import searchResolver from '../../resolvers/searchResolver';

const searchGameSchema = {
  type: new GraphQLList (BoardGameSearchType),
  args: {
    query: {type: GraphQLString},
  },
  resolve: (root, args) => searchResolver (root, args),
};

export default searchGameSchema;
