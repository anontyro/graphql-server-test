
export const getXmlValue = (xml, key) => {
  key = key.toLowerCase().trim();
  return xml[key][0].$.value;
};