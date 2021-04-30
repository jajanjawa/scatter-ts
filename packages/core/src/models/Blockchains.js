
const Blockchains = {
    EOS:'eos',
    ETH:'eth',
    TRX:'trx'
};

module.exports.Blockchains = Blockchains;
module.exports.BlockchainsArray = Object.keys(Blockchains).map(key => ({key, value:Blockchains[key]}));