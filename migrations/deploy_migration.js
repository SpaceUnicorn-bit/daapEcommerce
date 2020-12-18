const Dai = artifacts.require('Dai.sol');
const PaymentProccesor = artifacts.require('paymentProcessor.sol');

module.exports = async function (deployer, network, addresses) {
    const [admin, payer, _]= addresses;

    if (network === 'develop') {
        await deployer.deploy(Dai);
        const dai = await Dai.deployed();
        await dai.faucet(payer, web3.utils.toWei('10000'));

        await deployer.deploy(PaymentProccesor, admin, dai.address);
    } else {
        const ADMIN_ADDRESS = '';
        const DAI_ADDRESS = '';
        await deployer.deploy(PaymentProccesor, ADMIN_ADDRESS, DAI_ADDRESS);
    }
};
