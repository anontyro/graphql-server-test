import fetch from 'node-fetch';
import util from 'util';
const parseXML = util.promisify(require('xml2js').parseString);

export const collectionReRequest = async uri => {
  const response = await fetch(uri);
  return response;
}