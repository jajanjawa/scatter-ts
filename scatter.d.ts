export class ScatterJS {
    public identity: null | string;
    public network: null | string;
    static Network: Network;

    static plugins( ...plugins: any ): any;

    static connect( plugin: string, options: any ): any;
    static login(): any;
    static eos(network: string, Api: any, options: any ): any;
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

    constructor ( _name: string, _protocol: string, _host: string, _port: number, blockchain: any, chainId: string)

    static placeholder(): Network;
    static fromJson( json: any): any;

    fromJson( json: any): any;
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
