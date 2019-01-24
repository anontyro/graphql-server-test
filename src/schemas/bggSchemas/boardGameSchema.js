import {GraphQLInt, GraphQLString} from 'graphql';
import BoardgameType from '../../types/boardgameType';
import boardGameResolver from '../../resolvers/boardgameResolver';

const boardGameSchema = {
  type: BoardgameType,
  args: {
    id: {type: GraphQLInt},
    type: {type: GraphQLString, defaultValue: 'boardgame'},
  },
  resolve: (root, args) => boardGameResolver (root, args),
};

export default boardGameSchema;
