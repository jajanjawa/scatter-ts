import { Api, JsonRpc } from 'eosjs'

export interface NetworkOptions {
    blockchain: string;     // "eos"
    chainId: string;        // "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
    host: string;           // "api.eosn.io"
    port: number;           // 443
    protocol: 'https' | 'http';
}

export interface ScatterAccount {
    authority: string;      // "active"
    blockchain: string;     // "eos"
    chainId: string;        // "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
    isHardware: boolean;    // false
    name: string;           // "myaccount"
    publicKey: string;      // "EOS7dC...UUiTwCG"
}

export interface ScatterIdentity {
    accounts: ScatterAccount[];
    hash: string;
    name: string;
    publicKey: string;
}

export interface Authorization {
    actor: string;          // "myaccount"
    permission: string;     // "active"
}

export interface Action {
    account: string;
    name: string;
    authorization: Authorization[];
    data: any;
}

export class WalletAPI {
    // WALLET METHOD
	disconnect(): boolean;
	isConnected(): boolean;
	isPaired(): boolean;
	addEventHandler( handler: any, key?: any ): Promise<any>;
	removeEventHandler( key?: any): Promise<any>;
	listen( handler: any ): Promise<any>;

	getVersion(): Promise<any>;
	getIdentity( requiredFields: any ): Promise<any>;
	getAllAccountsFor( requiredFields: any): Promise<any>;
	getIdentityFromPermissions(): Promise<any>;
	forgetIdentity(): Promise<boolean>;
	updateIdentity( identity: { name: any, kyc: any } ): Promise<any>;
	authenticate( nonce: any, data ?: any, publicKey ?: any ): Promise<any>;
	getArbitrarySignature( publicKey: any, data: any ): Promise<any>;
	getPublicKey( blockchain: any ): Promise<any>;
	linkAccount( account: any, network: any ): Promise<any>;
	hasAccountFor( network: any ): Promise<any>;
	suggestNetwork( network: any ): Promise<any>;
	requestTransfer( network: any, to :any, amount: any, options?: any ): Promise<any>;
	getAvatar(): Promise<any>;
	requestSignature( payload: any ): Promise<any>;
	createTransaction( blockchain: any, actions: any, account: any, network: any ): Promise<any>;
	addToken( token: any, network: any ): Promise<any>;
	createEncryptionKey( scatterPublicKey: any, otherPublicKey: any, nonce ?: any ): Promise<any>;
}

export class ScatterJS {
    public identity: null | string;
    public network: null | Network;
    static Network: Network;
    static scatter: WalletAPI;

    static plugins( ...plugins: any ): any;

    static connect( plugin: string, options: { network: Network } ): Promise<boolean>;
    static login(): Promise<ScatterIdentity>;
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
