import fetch from 'node-fetch';
import util from 'util';
const parseXML = util.promisify(require('xml2js').parseString);

const output = fetch(`https://www.boardgamegeek.com/xmlapi2/thing?type=boardgame&id=176920`)
  .then(response => response.text())
  .then(parseXML)
  // .then(results => results.items.$.total)  // gets total results
  .then(results => results.items.item[0].link)
  .then(games => games.filter(x => x.$.type === 'boardgamecategory'));
output;
