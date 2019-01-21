
export const getXmlValue = (xml, key) => {
  key = key.toLowerCase().trim();
  return xml[key][0].$.value;
};

export const getGameCollectionStatus = (xml, key) => {
  key = key.toLowerCase().trim();
  const isTrue = xml.$[key] === '1';
  return isTrue;
};