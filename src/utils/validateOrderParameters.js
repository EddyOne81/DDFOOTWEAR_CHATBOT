const requiredTextFields = ['product', 'name', 'phone', 'email', 'address'];
const missingDetailsMessage =
  'Please provide complete and valid details: product, size, quantity, name, phone, email, and address.';

function validateOrderParameters(params) {
  if (!params || typeof params !== 'object' || Array.isArray(params)) {
    return { valid: false, message: missingDetailsMessage };
  }

  const value = {};

  for (const field of requiredTextFields) {
    if (typeof params[field] !== 'string' || params[field].trim() === '') {
      return { valid: false, message: missingDetailsMessage };
    }
    value[field] = params[field].trim();
  }

  const size = Number(params.size);
  const quantity = Number(params.quantity);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!Number.isFinite(size) || size <= 0 || !Number.isInteger(quantity) || quantity <= 0) {
    return { valid: false, message: missingDetailsMessage };
  }

  if (!emailPattern.test(value.email)) {
    return { valid: false, message: missingDetailsMessage };
  }

  value.size = size;
  value.quantity = quantity;

  return { valid: true, value };
}

module.exports = validateOrderParameters;
