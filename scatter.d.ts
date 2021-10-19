import { Api, JsonRpc } from 'eosjs'

/**
 * Optional fields that can be requested when asking for a RIDL Identity.
 *
 * @see https://get-scatter.com/docs/requirable-fields
 */
 export interface RequireableFields {
    accounts?: Network[];
    personal?: Array<"firstname" | "lastname" | "email" | "birthdate">;
    location?: Array<"phone" | "address" | "city" | "state" | "country" | "zipcode">;
}

export type Blockchain = 'eos' | 'eth' | 'trx';

export const Blockchains: {
    EOS: 'eos';
    ETH: 'eth';
    TRX: 'trx';
};

export const BlockchainsArray: Array<{ key: string; value: string; }>;

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
	getIdentity( requiredFields: RequireableFields ): Promise<any>;
	getAllAccountsFor( requiredFields: RequireableFields): Promise<any>;
	getIdentityFromPermissions(): Promise<any>;
	forgetIdentity(): Promise<boolean>;
	updateIdentity( identity: { name: string, kyc: any } ): Promise<any>;
	authenticate( nonce: any, data?: any, publicKey?: string ): Promise<any>;
	getArbitrarySignature( publicKey: string, data: any ): Promise<any>;
	getPublicKey( blockchain: Blockchain ): Promise<any>;
	linkAccount( account: any, network: Network ): Promise<any>;
	hasAccountFor( network: Network ): Promise<boolean>;
	suggestNetwork( network: Network ): Promise<boolean>;
	requestTransfer( network: Network, to: string, amount: string, options?: any ): Promise<any>;
	getAvatar(): Promise<any>;
	requestSignature( payload: any ): Promise<any>;
	createTransaction( blockchain: Blockchain, actions: any, account: any, network: Network ): Promise<any>;
	addToken( token: any, network: Network ): Promise<any>;
	createEncryptionKey( scatterPublicKey: string, otherPublicKey: string, nonce ?: any ): Promise<any>;
}

export class ScatterJS {
    public identity: null | string;
    public network: null | Network;
    static Network: Network;
    static scatter: WalletAPI;

    static plugins( ...plugins: any ): any;

    static connect( plugin: string, options: { network?: Network, linkTimeout?: number, allowHttp?: boolean } ): Promise<boolean>;
    static login(): Promise<ScatterIdentity>;
    static logout(): Promise<void>;
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

    constructor ( _name: string, _protocol: string, _host: string, _port: number, blockchain: Blockchain, chainId: string )

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
