import { Api, JsonRpc } from 'eosjs'

export interface NetworkOptions {
    blockchain: 'eos' | string;
    chainId: string,
    host: string,
    port: number,
    protocol: 'https' | 'http',
}

export interface ScatterAccount {
    authority: "active" | 'owner' | string;
    blockchain: "eos" | string;
    chainId: string;
    isHardware: boolean;
    name: string;
    publicKey: string;
}

export interface Identity {
    accounts: ScatterAccount[];
    hash: string;
    name: string;
    publicKey: string;
}

export interface Authorization {
    actor: string;
    permission: "active" | "owner" | string;
}

export interface Action {
    account: string;
    name: string;
    authorization: Authorization[];
    data: any;
}

export class ScatterJS {
    public identity: null | string;
    public network: null | Network;
    static Network: Network;

    static plugins( ...plugins: any ): any;

    static connect( plugin: string, options: { network: Network } ): Promise<boolean>;
    static login(): Promise<Identity>;
    static eos(network: Network, Api: any, options: { rpc: JsonRpc } ): Api;
    static account( account: string ): any;
}

export class Network {
    public name: string;
    public protocol: string;
    public host: string;
    public port: string;
    public blockchain: string;
    public chainId: string;
    public token: null;

    constructor ( _name: string, _protocol: string, _host: string, _port: number, blockchain: any, chainId: string )

    static placeholder(): Network;
    static fromJson( json: NetworkOptions ): Network;

    fromJson( json: NetworkOptions ): Network;
    fullhost(): string;
	unique(): string;
}

export class ScatterEOS {
    public name: string;
    public type: string;

    static fromJson( json: any ): any;
    static placeholder(): any;

    isSignatureProvider(): boolean;
    isValid(): boolean;
}
