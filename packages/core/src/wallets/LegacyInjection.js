import * as PluginTypes from "../plugins/PluginTypes";
import Plugin from "../plugins/Plugin";

let isAvailable = false;
if(typeof window !== 'undefined' && typeof document !== 'undefined') {
	if(typeof window.scatter !== 'undefined') isAvailable = true;
	else document.addEventListener('scatterLoaded', () => isAvailable = true);
}

const pollExistence = async (resolver = null, tries = 0) => {
	return new Promise(r => {
		if(!resolver) resolver = r;
		if(isAvailable) return resolver(true);
		if(tries > 5) return resolver(false);
		setTimeout(() => pollExistence(resolver, tries + 1), 100);
	})
};

export default class LegacyInjection extends Plugin {

	constructor(context, holderFns){
		super('InjectedWallet', PluginTypes.WALLET_SUPPORT);
		this.name = 'InjectedWallet';
		this.context = context;
		this.holderFns = holderFns;
	}

	async connect(){
		return new Promise(async resolve => {
			const found = await pollExistence();
			if(found) {
				if(this.holderFns && !this.holderFns.get().wallet) this.holderFns.get().wallet = this.name;
				resolve('injection');
			}
		})
	}

	async runBeforeInterfacing(){
		const network = this.context.network;

		if(network){
			const getId = window.scatter.getIdentity.bind(window.scatter);
			const useIdentity = window.scatter.useIdentity.bind(window.scatter);
			window.scatter.getIdentity = fields => getId(fields ? fields : {accounts:[network]}).then(id => {
				this.holderFns.get().identity = id;
				useIdentity(id);
				return id;
			});

			const suggest = window.scatter.suggestNetwork.bind(window.scatter);
			window.scatter.suggestNetwork = net => suggest(net ? net : network);
		}

		if(this.holderFns.get().wallet === this.name){
			window.scatter.wallet = this.name;
		}

		this.holderFns.set(window.scatter);
		this.context = this.holderFns.get();

		return true;
	}

	async runAfterInterfacing(){
		this.context.isExtension = true;
		this.context.connect = this.connect;
		return true;
	}

	methods(){ return {

	}; }

}
