import test from 'ava';
import { getXmlValue, getGameCollectionStatus } from './xmlUtils';
import { mockUser, MOCK_USER_CONSTS } from '../mocks/mockUser';
import { COLLECTION_MOCK, COLLECTION_CONSTS } from '../mocks/collectionMock';

test('getXmlValue is case insensitive', t => {
  t.is(getXmlValue(mockUser, MOCK_USER_CONSTS.NAME.key.toUpperCase()), MOCK_USER_CONSTS.NAME.value);
});

test('getXmlValue will strip spaces', t => {
  const key = MOCK_USER_CONSTS.NAME.key.concat('     ');
  t.is(getXmlValue(mockUser, key), MOCK_USER_CONSTS.NAME.value);
});

test('getXmlValue will return name alex', t => {
  t.is(getXmlValue(mockUser, MOCK_USER_CONSTS.NAME.key), MOCK_USER_CONSTS.NAME.value);
});

test('getXmlValue will return correct id', t => {
  t.is(getXmlValue(mockUser, MOCK_USER_CONSTS.ID.key), MOCK_USER_CONSTS.ID.value);
});

test('getXmlValue will return correct firstname', t => {
  t.is(getXmlValue(mockUser, MOCK_USER_CONSTS.FIRSTNAME.key), MOCK_USER_CONSTS.FIRSTNAME.value);
});

test('getXmlValue will return correct lastname', t => {
  t.is(getXmlValue(mockUser, MOCK_USER_CONSTS.LASTNAME.key), MOCK_USER_CONSTS.LASTNAME.value);
});

test('getXmlValue will return year registered', t => {
  t.is(getXmlValue(mockUser, MOCK_USER_CONSTS.YEAR_REGISTERED.key), MOCK_USER_CONSTS.YEAR_REGISTERED.value);
});

test('getXmlValue will return last login', t => {
  t.is(getXmlValue(mockUser, MOCK_USER_CONSTS.LAST_LOGIN.key), MOCK_USER_CONSTS.LAST_LOGIN.value);
});

test('getXmlValue will return country', t => {
  t.is(getXmlValue(mockUser, MOCK_USER_CONSTS.COUNTRY.key), MOCK_USER_CONSTS.COUNTRY.value);
});

test('getXmlValue will return state/province where possiable', t => {
  t.is(getXmlValue(mockUser, MOCK_USER_CONSTS.STATE_OR_PROVINCE.key), MOCK_USER_CONSTS.STATE_OR_PROVINCE.value);
});

test('getGameCollectionStatus will return own value as boolean', t => {
  const item = COLLECTION_MOCK.items.item[0].status[0];
  const value = getGameCollectionStatus(item, COLLECTION_CONSTS.STATUS.OWNED);
  const isTrue = item.$[COLLECTION_CONSTS.STATUS.OWNED] === '1';
  t.is(value, isTrue);
});

test('getGameCollectionStatus will return prevown value as boolean', t => {
  const item = COLLECTION_MOCK.items.item[0].status[0];
  const value = getGameCollectionStatus(item, COLLECTION_CONSTS.STATUS.PREVIOUS_OWNED);
  const isTrue = item.$[COLLECTION_CONSTS.STATUS.PREVIOUS_OWNED] === '1';
  t.is(value, isTrue);
});

test('getGameCollectionStatus will return fortrade value as boolean', t => {
  const item = COLLECTION_MOCK.items.item[0].status[0];
  const value = getGameCollectionStatus(item, COLLECTION_CONSTS.STATUS.FOR_TRADE);
  const isTrue = item.$[COLLECTION_CONSTS.STATUS.FOR_TRADE] === '1';
  t.is(value, isTrue);
});

test('getGameCollectionStatus will return want value as boolean', t => {
  const item = COLLECTION_MOCK.items.item[0].status[0];
  const value = getGameCollectionStatus(item, COLLECTION_CONSTS.STATUS.WANT);
  const isTrue = item.$[COLLECTION_CONSTS.STATUS.WANT] === '1';
  t.is(value, isTrue);
});