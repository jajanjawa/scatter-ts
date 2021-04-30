import { ScatterJS, ScatterEOS } from '../scatter';
import { JsonRpc, Api } from 'eosjs';
import fetch from "node-fetch";

ScatterJS.plugins( new ScatterEOS() );

const network = ScatterJS.Network.fromJson({
    blockchain: 'eos',
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    host: 'eos.eosn.io',
    port: 443,
    protocol: 'https'
});

const rpc = new JsonRpc(network.fullhost(), {fetch});

(async () => {
    const info = await rpc.get_info()
    console.log(info);
})();

export async function login() {
    ScatterJS
    const connected = await ScatterJS.connect('SX', {network});
    if ( connected ) {
        const id = await ScatterJS.login();
    }
}

export function get_api() {
    return ScatterJS.eos(network, Api, { rpc });
}

export function get_account() {
    return ScatterJS.account('eos');
}