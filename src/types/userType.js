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

const getXmlValue = (xml, key) => {
  key = key.toLowerCase().trim();
  return xml[key][0].$.value;
};

export default new GraphQLObjectType({
  name: 'userItem',
  description: 'Main user object returned from the user endpoint of the bgg api',
  fields: () => ({
    userName: {
      type: GraphQLString,
      resolve: xml => getXmlValue(xml, 'name'),
    },
    id: {
      type: GraphQLString,
      resolve: xml => getXmlValue(xml, 'id'),
    },
    firstName: {
      type: GraphQLString,
      resolve: xml => getXmlValue(xml, 'firstname'),
    },
    lastName: {
      type: GraphQLString,
      resolve: xml => getXmlValue(xml, 'lastname'),
    },
    yearRegistered: {
      type: GraphQLString,
      resolve: xml => getXmlValue(xml, 'yearregistered'),
    },
    lastLogin: {
      type: GraphQLString,
      resolve: xml => getXmlValue(xml, 'lastlogin'),
    },
    country: {
      type: GraphQLString,
      resolve: xml => getXmlValue(xml, 'country'),
    },
    stateOrProvince: {
      type: GraphQLString,
      resolve: xml => getXmlValue(xml, 'stateorprovince'),
    },
    collection: {
      type: new GraphQLList(BoardgameType),
      resolve: xml => xml.collection,
    },
  }),
});
