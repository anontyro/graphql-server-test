import fetch from 'node-fetch';
import util from 'util';
const parseXML = util.promisify(require('xml2js').parseString);

export const collectionReRequest = async uri => {
  try {
    const response = await fetch(uri);
    if ((await response.status) === 202) {
      setTimeout(() => request(uri), 1000);
    }
    const arg1 = await response.text();
    const parse = await parseXML(arg1);
    return parse;
  } catch (err) {
    console.log(err.message);
  }
}