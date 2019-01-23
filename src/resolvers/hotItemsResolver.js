import fetch from 'node-fetch';
import * as bggConsts from '../data/appConstants';
import { parseXML } from '../schemas/bggSchema';

const hotItemResolve = async (root, args) => {
  const { item } = args;
  const response = await fetch(`${bggConsts.BGG_API}hot?type=${item}`);
  const arg1 = await response.text();
  const parsed = await parseXML(arg1);
  return parsed.items.item;
};

export default hotItemResolve;