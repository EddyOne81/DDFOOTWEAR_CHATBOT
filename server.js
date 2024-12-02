const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/shoe_store')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("Failed to connect to MongoDB", err);
    });

app.use(bodyParser.json());

// Order Schema
const orderSchema = new mongoose.Schema({
    product: String,
    size: Number,
    quantity: Number,
    name: String,
    phone: String,
    email: String,
    address: String,
    note: String
});

const Order = mongoose.model('Order', orderSchema);

app.post('/webhook', (req, res) => {
    const intentName = req.body.queryResult.intent.displayName;
    
    if (intentName === "Order") {
        const { product, size, quantity, name, phone, email, address, note } = req.body.queryResult.parameters;

        // Parameters check
        if (!product || !size || !quantity || !name || !phone || !email || !address) {
            res.json({
                fulfillmentText: "Please provide complete details: product, size, quantity, name, phone, email, and address."
            });
            return;
        }

        // Create new order
        const newOrder = new Order({
            product,
            size,
            quantity,
            name,
            phone,
            email,
            address,
            note: note || "No additional note"
        });

        newOrder.save()
            .then(() => {
                const fulfillmentText = `
                    Thank you for your order, here are the details:
                    Product: ${product}
                    Size: ${size}
                    Quantity: ${quantity}
                    Name: ${name}
                    Phone: ${phone}
                    Email: ${email}
                    Address: ${address}
                    Note: ${note || "No additional note."}
                `;
                res.json({
                    fulfillmentText: fulfillmentText
                });
            })
            .catch(err => {
                console.error("Error saving order:", err);
                res.json({
                    fulfillmentText: "There was an error processing your order. Please try again later."
                });
            });
    } else {
        res.json({
            fulfillmentText: "Sorry, I couldn't understand your request."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
