import {GraphQLString, GraphQLList} from 'graphql';
import hotItemResolve from '../../resolvers/hotItemsResolver';
import HotItemType from '../../types/hotItemType';

const hotItemSchema = {
  type: new GraphQLList (HotItemType),
  args: {
    item: {type: GraphQLString, defaultValue: 'boardgame'},
  },
  resolve: (root, args) => hotItemResolve (root, args),
};

export default hotItemSchema;
