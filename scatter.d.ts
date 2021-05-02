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

export class WalletAPI {
    // WALLET METHOD
	disconnect(): Promise<any>;
	isConnected(): Promise<boolean>;
	isPaired(): Promise<boolean>;
	addEventHandler( handler: any, key?: any ): Promise<any>;
	removeEventHandler( key?: any): Promise<any>;
	listen( handler: any ): Promise<any>;

	getVersion(): Promise<any>;
	getIdentity( requiredFields: any ): Promise<any>;
	getAllAccountsFor( requiredFields: any): Promise<any>;
	getIdentityFromPermissions(): Promise<any>;
	forgetIdentity(): Promise<any>;
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
