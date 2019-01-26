/* eslint-disable import/prefer-default-export */
const EXPECTED_STATUS_CODES = {
  OK: 200,
  QUEUED: 202,
  TOO_MANY: 429,
};

const createPayload = (response, body, error = null) => {
  const payload = {
    error: {},
    status: {
      status: response.status,
      statusText: response.statusText,
    },
    body,
  };

  if (error) {
    payload.error = {
      code: error.code,
      message: error.message,
    };
  }

  return payload;
};

export const responseWrapper = (response, body = {}) => {
  const parsedResponse = JSON.parse (JSON.stringify (response));
  const parsedBody = JSON.parse (JSON.stringify (body));
  let error = null;

  if (parsedResponse.status === EXPECTED_STATUS_CODES.TOO_MANY) {
    error = {
      code: parsedResponse.status,
      message: 'Rate limited endpoint please wait a few seconds before trying again',
    };
  } else if (parsedResponse.status === EXPECTED_STATUS_CODES.QUEUED) {
    parsedResponse.statusText =
      'Your request has been queued, please try requesting again in a few seconds';
  }

  return createPayload (parsedResponse, parsedBody, error);
};
