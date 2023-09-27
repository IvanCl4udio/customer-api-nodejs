const express = require('express');
const app = express();
const PORT = 3000;
const sequelize = require('./database');
const Customer = require('./customer');

app.use(express.json());

app.post('/customers', async (req, res) => {
    try {
        const customer = await Customer.create(req.body);
        res.status(201).json(customer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/customers', async (req, res) => {
    const customers = await Customer.findAll();
    res.json(customers);
});

app.get('/customers/:id', async (req, res) => {
    const customer = await Customer.findByPk(req.params.id);
    if (customer) {
        res.json(customer);
    } else {
        res.status(404).send('Customer not found');
    }
});

app.put('/customers/:id', async (req, res) => {
    const customer = await Customer.findByPk(req.params.id);
    if (customer) {
        await customer.update(req.body);
        res.json(customer);
    } else {
        res.status(404).send('Customer not found');
    }
});

app.delete('/customers/:id', async (req, res) => {
    const customer = await Customer.findByPk(req.params.id);
    if (customer) {
        await customer.destroy();
        res.status(204).send();
    } else {
        res.status(404).send('Customer not found');
    }
});

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
