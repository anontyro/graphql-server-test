import test from 'ava';
import { responseWrapper } from './responseWrapper';
import { MOCK_RESPONSES } from '../mocks/mockResponse';

test('responseWrapper returns correctly wrapped output', t => {
  const response = MOCK_RESPONSES.OK;
  const output = responseWrapper(response);
  t.notDeepEqual(response, output);
  t.is(output.status.status, response.status);
  t.is(output.status.statusText, response.statusText);
});

test('responseWrapper wraps errors correctly and returns in payload', t => {
  const response = MOCK_RESPONSES.TOO_MANY_REQUESTS;
  const output = responseWrapper(response);
  t.truthy(output.error.message);
  t.is(output.error.code, response.status);
});

test('responseWrapper will return no errors and valid wrapping for queued requests', t => {
  const response = MOCK_RESPONSES.REQUEST_QUEUED;
  const output = responseWrapper(response);
  t.is(output.status.status, response.status);
  t.not(output.status.statusText, response.statusText);
  t.falsy(output.error.message);
  t.falsy(output.error.code);
});

test('responseWrapper will attach the body correctly', t => {
  const response = MOCK_RESPONSES.REQUEST_QUEUED;
  const body = {
    game: 'a game',
    id: 12345,
  };
  const output = responseWrapper(response, body);
  t.deepEqual(output.body, body);
});
