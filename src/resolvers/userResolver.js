import {parseXML} from '../schemas/mainSchema';
import fetch from 'node-fetch';
import * as bggConsts from '../data/appConstants';

const userResolver = async (root, args) => {
  const {getCollection, userName} = args;
  const userResponse = await fetch (
    `${bggConsts.BGG_API}user?name=${userName}`
  );
  const arg1 = await userResponse.text ();
  const results = await parseXML (arg1);

  return results.user;
};

export default userResolver;
