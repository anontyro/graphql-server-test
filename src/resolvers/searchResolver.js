import { parseXML } from "../schemas/bggSchema";
import fetch from 'node-fetch';
import * as bggConsts from '../data/appConstants';

const searchResolver = async (root, args) => {
  const { query } = args;
  const response = await fetch(`${bggConsts.BGG_API}search?query=${query}`);
  const arg1 = await response.text();
  const results = await parseXML(arg1);
  return results.items.item;
};

export default searchResolver;