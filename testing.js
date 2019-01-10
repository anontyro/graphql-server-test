import fetch from 'node-fetch';
import util from 'util';
const parseXML = util.promisify(require('xml2js').parseString);

const getXmlValue = (xml, key) => {
  key = key.toLowerCase().trim();
  return xml[key][0].$.value;
};

const URIs = {
  USER: `https://www.boardgamegeek.com/xmlapi2/user?name=anontyro`,
  COLLECTION: `https://www.boardgamegeek.com/xmlapi2/collection?username=anontyro`,
};

const request = async uri => {
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
};

const out = request(URIs.COLLECTION);

out;
