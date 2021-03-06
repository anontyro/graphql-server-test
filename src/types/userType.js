import {GraphQLObjectType, GraphQLString, GraphQLList} from 'graphql';
import BoardgameType from './boardgameType';
import {getXmlValue} from '../utils/xmlUtils';

export default new GraphQLObjectType ({
  name: 'userItem',
  description: 'Main user object returned from the user endpoint of the bgg api',
  fields: () => ({
    userName: {
      type: GraphQLString,
      resolve: xml => xml.$.name,
    },
    id: {
      type: GraphQLString,
      resolve: xml => xml.$.id,
    },
    firstName: {
      type: GraphQLString,
      resolve: xml => getXmlValue (xml, 'firstname'),
    },
    lastName: {
      type: GraphQLString,
      resolve: xml => getXmlValue (xml, 'lastname'),
    },
    yearRegistered: {
      type: GraphQLString,
      resolve: xml => getXmlValue (xml, 'yearregistered'),
    },
    lastLogin: {
      type: GraphQLString,
      resolve: xml => getXmlValue (xml, 'lastlogin'),
    },
    country: {
      type: GraphQLString,
      resolve: xml => getXmlValue (xml, 'country'),
    },
    stateOrProvince: {
      type: GraphQLString,
      resolve: xml => getXmlValue (xml, 'stateorprovince'),
    },
    collection: {
      type: new GraphQLList (BoardgameType),
      resolve: xml => xml.collection,
    },
  }),
});
