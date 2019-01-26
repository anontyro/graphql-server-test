import fetch from 'node-fetch';
import {parseXML} from '../schemas/mainSchema';
import * as bggConsts from '../data/appConstants';

const boardGameResolver = async (root, args) => {
  const {type, id} = args;
  const response = await fetch (
    `${bggConsts.BGG_API}thing?type=${type}&id=${id}`
  );
  const arg1 = await response.text ();
  const bg = await parseXML (arg1);
  return bg.items.item[0];
};

export default boardGameResolver;
