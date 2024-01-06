const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

const ordersFilePath = path.join(__dirname, '../data/orders.txt');

// Function to read orders from the file
function readOrdersFromFile() {
    try {
        const ordersData = fs.readFileSync(ordersFilePath, 'utf8');
        return JSON.parse(ordersData) || [];
    } catch (error) {
        return [];
    }
}

// Function to write orders to the file
function writeOrdersToFile(orders) {
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders), 'utf8');
}

// Route to order a product
router.post('/order', (req, res) => {
    const { productName, quantity, fullName, cellphone, address } = req.body;

    // Basic validation
    if (!productName || !quantity || isNaN(quantity) || quantity <= 0 || !fullName || !cellphone || !address) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    // Read existing orders from the file
    const orders = readOrdersFromFile();

    // Save the order with additional details
    const order = {
        productName,
        quantity: parseInt(quantity),
        fullName,
        cellphone,
        address,
        orderId: orders.length + 1,
    };
    orders.push(order);

    // Write updated orders back to the file
    writeOrdersToFile(orders);

    res.status(201).json(order);
});

// Route to get all orders
router.get('/orders', (req, res) => {
    // Read orders from the file
    const orders = readOrdersFromFile();

    res.json(orders);
});

module.exports = router;