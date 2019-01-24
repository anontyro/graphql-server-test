import fetch from 'node-fetch';
import {parseXML} from '../schemas/mainSchema';
import * as bggConsts from '../data/appConstants';
import {responseWrapper} from '../utils/responseWrapper';

const collectionResolve = async (root, args) => {
  const {userName} = args;
  const response = await fetch (
    `${bggConsts.BGG_API}collection?username=${userName}`
  );
  const status = {
    status: response.status,
    statusText: response.statusText,
  };
  const arg1 = await response.text ();
  const parsed = await parseXML (arg1);
  const output = responseWrapper (status, parsed);
  return output;
};

export default collectionResolve;
