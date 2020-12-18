const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://localhost/dappCommerce',
    {useNewUrlParser: true, useUnifiedTopology: true}
);

const paymentSchema = new mongoose.Schema({
    id: String,
    itemId: String,
    paid:Boolean,
}); 

const Payment = new mongoose.model('Payment', paymentSchema);

module.exports = {
    Payment
};