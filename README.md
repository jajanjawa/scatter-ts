# Scatter TS (Typescript)

## Install

```bash
$ npm install scatter-ts
```

## Quickstart

```js
import { ScatterJS, ScatterEOS } from 'scatter-ts';
import { JsonRpc, Api } from 'eosjs';

ScatterJS.plugins( new ScatterEOS() );

const network = ScatterJS.Network.fromJson({
    blockchain:'eos',
    chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    host:'nodes.get-scatter.com',
    port:443,
    protocol:'https'
});
const rpc = new JsonRpc(network.fullhost());

ScatterJS.connect('YourAppName', {network}).then(connected => {
    if(!connected) return console.error('no scatter');

    const eos = ScatterJS.eos(network, Api, {rpc});

    ScatterJS.login().then(id => {
        if(!id) return console.error('no identity');
        const account = ScatterJS.account('eos');

        eos.transact({
            actions: [{
                account: 'eosio.token',
                name: 'transfer',
                authorization: [{
                    actor: account.name,
                    permission: account.authority,
                }],
                data: {
                    from: account.name,
                    to: 'safetransfer',
                    quantity: '0.0001 EOS',
                    memo: account.name,
                },
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
        }).then(res => {
            console.log('sent: ', res);
        }).catch(err => {
            console.error('error: ', err);
        });
    });
});
```
