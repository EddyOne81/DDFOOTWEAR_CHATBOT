const Order = require('../models/Order');

const createOrder = async (req, res) => {
  const queryResult = req.body?.queryResult;
  const intentName = queryResult?.intent?.displayName;

  if (intentName !== 'Order') {
    return res.json({
      fulfillmentText: "Sorry, I couldn't understand your request."
    });
  }

  const params = queryResult?.parameters || {};
  const {
    product,
    size,
    quantity,
    name,
    phone,
    email,
    address,
    note
  } = params;

  if (!product || !size || !quantity || !name || !phone || !email || !address) {
    return res.json({
      fulfillmentText:
        'Please provide complete details: product, size, quantity, name, phone, email, and address.'
    });
  }

  try {
    const newOrder = await Order.create({
      product,
      size,
      quantity,
      name,
      phone,
      email,
      address,
      note: note || 'No additional note'
    });

    const fulfillmentText = `
      Thank you for your order, here are the details:
      Product: ${newOrder.product}
      Size: ${newOrder.size}
      Quantity: ${newOrder.quantity}
      Name: ${newOrder.name}
      Phone: ${newOrder.phone}
      Email: ${newOrder.email}
      Address: ${newOrder.address}
      Note: ${newOrder.note || 'No additional note.'}
    `;

    return res.json({ fulfillmentText });
  } catch (error) {
    console.error('Error saving order:', error);
    return res.json({
      fulfillmentText: 'There was an error processing your order. Please try again later.'
    });
  }
};

module.exports = { createOrder };
