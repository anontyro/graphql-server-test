import {GraphQLString, GraphQLList} from 'graphql';
import BoardgameType from '../../types/boardgameType';
import hotItemResolve from '../../resolvers/hotItemsResolver';

const hotItemSchema = {
  type: new GraphQLList (BoardgameType),
  args: {
    item: {type: GraphQLString, defaultValue: 'boardgame'},
  },
  resolve: (root, args) => hotItemResolve (root, args),
};

export default hotItemSchema;
