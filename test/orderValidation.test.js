const test = require('node:test');
const assert = require('node:assert/strict');
const validateOrderParameters = require('../src/utils/validateOrderParameters');

test('accepts and normalizes valid order parameters', () => {
  const result = validateOrderParameters({
    product: '  Sneakers  ',
    size: '42',
    quantity: '2',
    name: ' Ada Lovelace ',
    phone: '+123456789',
    email: 'ada@example.com',
    address: '  1 Main Street  '
  });

  assert.equal(result.valid, true);
  assert.deepEqual(result.value, {
    product: 'Sneakers',
    size: 42,
    quantity: 2,
    name: 'Ada Lovelace',
    phone: '+123456789',
    email: 'ada@example.com',
    address: '1 Main Street'
  });
});

test('rejects missing text fields and invalid email', () => {
  const missing = validateOrderParameters({});
  assert.equal(missing.valid, false);

  const invalidEmail = validateOrderParameters({
    product: 'Sneakers',
    size: 42,
    quantity: 1,
    name: 'Ada Lovelace',
    phone: '+123456789',
    email: 'not-an-email',
    address: '1 Main Street'
  });
  assert.equal(invalidEmail.valid, false);
});

test('rejects non-positive size and non-integer or non-positive quantity', () => {
  const validText = {
    product: 'Sneakers',
    name: 'Ada Lovelace',
    phone: '+123456789',
    email: 'ada@example.com',
    address: '1 Main Street'
  };

  assert.equal(validateOrderParameters({ ...validText, size: 0, quantity: 1 }).valid, false);
  assert.equal(validateOrderParameters({ ...validText, size: 42, quantity: 1.5 }).valid, false);
  assert.equal(validateOrderParameters({ ...validText, size: 42, quantity: 0 }).valid, false);
});
