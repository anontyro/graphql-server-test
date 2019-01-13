import test from 'ava';
import { getXmlValue } from './xmlUtils';

const mockUser = {
  'name':[
    {'$': 
      {
          value: 'alex'
      }
    }
  ]
}

test('getXmlValue will return name alex', t => {
  t.is(getXmlValue(mockUser, 'name'), 'alex');
});