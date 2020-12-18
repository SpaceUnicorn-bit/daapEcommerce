const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const ethers = require('ethers');
const PaymentProcessor = require('../build/contracts/PaymentProcessor.json');
const { Payment } = require('./db');


const app = new Koa();
const router = new Router();

const items = {
    '1': {id: 1, url: 'htpp://UrlDownloanItem1'},
    '2': {id: 1, url: 'htpp://UrlDownloanItem2'}
}

router.get('/api/getPaymentId/:itemId', async ctx =>{
    const paymentId = (Math.random() * 10000).toFixed(0);
    await Payment.create({
        id: paymentId,
        itemId: ctx.params.itemId,
        paid: false
    });
    ctx.body = {
        paymentId
    };
});

router.get('/api/getItemUrl/:paymentId', async ctx =>{
    const payment = await Payment.findOne({id: ctx.params.paymentId});
    if (payment  && payment.done === true) {
        ctx.body = {}
    }
});

app.use(cors()).use(router.routes()).use(router.allowedMethods());
app.listen(4000, () => {
    console.log('Server running on port: 4000');
});