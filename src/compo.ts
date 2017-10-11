import { mask } from './globals';

export default mask.Compo({
	meta: {
		mode: 'server'
	},
	
	constructor () {
		this._onRenderStart = this.onRenderStart;
		this._onRenderEnd = this.onRenderEnd;
		this._slots = this.slots;
		this.slots = Stub.slots;
		this.onRenderStart = Stub.start;
		this.onRenderEnd = null;
	},
	
	_onRenderStart: null,
	_deferredNodes: null,
	_ctx: null,
	_placeholder: null,
	_isDomInserted: null,
	_slots: null,
	
	resolveLazy (model) {
		let dfr = new mask.class.Deferred;
		this.resolveLazy = function () {
			return dfr;
		};
		this.nodes = this._deferredNodes;

		let ctx = this._ctx;	
		if (this._onRenderStart != null) {
			this._onRenderStart(this.model, ctx, this._placeholder.parentNode);
		}

		let fragment = mask.render(
			this.nodes, 
			model || this.model, 
			ctx, 
			null, 
			this
		);

		if (ctx && ctx.async) {
			ctx.then(() => {
				appendLazy(this, fragment);
				dfr.resolve();
			});
			return dfr;
		}

		appendLazy(this, fragment);
		dfr.resolve();
		return dfr;
	}
});

var Stub = {
	start (model, ctx, container) {
		this._deferredNodes = this.nodes;
		this._ctx = ctx;
		this._placeholder = document.createComment('');
		
		this.model = model;
		this.nodes = null;
		
		container.appendChild(this._placeholder);
	},
	slots: {
		domInsert () {
			this._isDomInserted = true;
		}
	}
};

function appendLazy(compo, fragment){
	var els = fragment.nodeType === Node.DOCUMENT_FRAGMENT_NODE
		? fragment.children
		: fragment;
	
	var container = compo._placeholder.parentNode,
		renderEnd = compo.renderEnd;
	
	compo.onRenderEnd = compo._onRenderEnd;
	compo.slots = compo._slots;
	
	if (compo.onRenderEnd != null) {
		compo.onRenderEnd(els, compo.model, compo._ctx, container);
	}
	//appendElementsToParent(compo, els);
	container.insertBefore(fragment, compo._placeholder);

	if (compo._isDomInserted) {
		compo.emitIn('domInsert');
	}
}

// Obsolete: Developer is responsible to resolve lazy elements if needed
// let appendElementsToParent;
// (function(){
// 	appendElementsToParent = function (compo, els) {
// 		if (els == null || els.length === 0) {
// 			return;
// 		}
		
// 		let parent = compo.parent;
// 		while (parent != null) {
// 			if (parent.$) {
// 				if (shouldAppendSingle(parent.$, els[0])) {
// 					parent.$.add(els);
// 				}
// 				return;
// 			}
// 			if (parent.elements) {
// 				if (shouldAppendSingle(parent.elements, els[0])) {
// 					parent.elements.push.apply(parent.elements, els);
// 				}
// 				return;	
// 			}
// 			parent = parent.parent;
// 		}
// 	};
// 	function shouldAppendMany (arr, els) {
// 		let imax = els.length,
// 			i = -1;
// 		while(++i < imax) {
// 			let x  = shouldAppendSingle(arr, els[i]);
// 			if (x === false) {
// 				return false;
// 			}
// 		}
// 		return true;
// 	}
// 	function appendSingle (arr, el) {
// 		let imax = arr.length,
// 			i = -1;
// 		while(++i < imax) {
// 			let parent = arr[i];
// 			if (parent.contains(el)) {
// 				return false;
// 			}
// 		}
// 		return true;
// 	}
// }());

