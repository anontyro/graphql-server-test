import {GraphQLString, GraphQLBoolean} from 'graphql';
import UserType from '../../types/userType';
import userResolver from '../../resolvers/userResolver';

const userSchema = {
  type: UserType,
  description: '',
  args: {
    userName: {type: GraphQLString},
    getCollection: {type: GraphQLBoolean, defaultValue: false},
  },
  resolve: (root, args) => userResolver (root, args),
};

export default userSchema;
