const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('../src/app');

let server;
let baseUrl;

test.before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

test.after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test('health endpoint reports server status', async () => {
  const response = await fetch(`${baseUrl}/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'ok' });
});

test('webhook returns a fallback for an unknown intent', async () => {
  const response = await fetch(`${baseUrl}/webhook`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ queryResult: { intent: { displayName: 'Unknown' } } })
  });

  assert.equal(response.status, 200);
  assert.match((await response.json()).fulfillmentText, /couldn't understand/i);
});

test('webhook rejects incomplete order details without accessing the database', async () => {
  const response = await fetch(`${baseUrl}/webhook`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ queryResult: { intent: { displayName: 'Order' }, parameters: {} } })
  });

  assert.equal(response.status, 200);
  assert.match((await response.json()).fulfillmentText, /complete and valid details/i);
});

test('malformed JSON receives a clear client error', async () => {
  const response = await fetch(`${baseUrl}/webhook`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: '{invalid json'
  });

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: 'Request body must be valid JSON.' });
});
