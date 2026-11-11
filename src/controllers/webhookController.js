const Order = require('../models/Order');
const validateOrderParameters = require('../utils/validateOrderParameters');

const createOrder = async (req, res) => {
  const queryResult = req.body?.queryResult;
  const intentName = queryResult?.intent?.displayName;

  if (intentName !== 'Order') {
    return res.json({
      fulfillmentText: "Sorry, I couldn't understand your request."
    });
  }

  const params = queryResult.parameters || {};
  const validation = validateOrderParameters(params);

  if (!validation.valid) {
    return res.json({ fulfillmentText: validation.message });
  }

  try {
    const order = await Order.create({
      ...validation.value,
      note: typeof params.note === 'string' && params.note.trim()
        ? params.note.trim()
        : 'No additional note'
    });

    const fulfillmentText = [
      'Thank you for your order, here are the details:',
      `Product: ${order.product}`,
      `Size: ${order.size}`,
      `Quantity: ${order.quantity}`,
      `Name: ${order.name}`,
      `Phone: ${order.phone}`,
      `Email: ${order.email}`,
      `Address: ${order.address}`,
      `Note: ${order.note}`
    ].join('\n');

    return res.json({ fulfillmentText });
  } catch (error) {
    // Avoid logging order contents or customer personal information.
    console.error('Error saving order:', error.message);
    return res.json({
      fulfillmentText: 'There was an error processing your order. Please try again later.'
    });
  }
};

module.exports = { createOrder };
