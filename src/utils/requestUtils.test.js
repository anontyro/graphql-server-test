import test from 'ava';
import sinon from 'sinon';
import {collectionReRequest} from './requestUtils';

const mockResponse = {
  INIT_RESPONSE: {
    status: 202,
    message: 'request queued wait for response',
  },
  COLLECTION_RESPONSE: {},
};

test.skip ('collectionReRequest returns a value', async t => {
  const stub = sinon
    .stub (collectionReRequest ('https://google.com'))
    .resolves (mockResponse);
  console.log (stub);
  const output = await collectionReRequest ('https://google.com');
  t.is (output, mockResponse);
});
