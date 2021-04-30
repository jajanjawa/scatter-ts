const ScatterJS = require("./packages/core/src").default;
const ScatterEOS = require("./packages/plugin-eosjs2/src").default;
const { Plugin, PluginTypes, Blockchains, Network, SocketService, EVENTS, WalletInterface, WALLET_METHODS } = require("./packages/core/src");

module.exports = {
    ScatterJS, ScatterEOS,
    Plugin, PluginTypes, Blockchains, Network, SocketService, EVENTS, WalletInterface, WALLET_METHODS
};
