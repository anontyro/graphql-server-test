export const MOCK_RESPONSES = {
  TOO_MANY_REQUESTS: {
    size: 0,
    timeout: 0,
    ok: false,
    statusText: 'Too Many Requests',
    status: 429,
    body: {},
  },
  OK: {
    size: 0,
    timeout: 0,
    ok: true,
    statusText: 'Ok',
    status: 200,
    body: {},
  },
  REQUEST_QUEUED: {
    size: 0,
    timeout: 0,
    ok: true,
    statusText: 'Response queued',
    status: 202,
    body: {},
  },
};
