
				// source ./templates/UMD.js
				(function(factory){
					
					var _name = '',
						_global = typeof window === 'undefined' ? global : window,
						_module = {
							exports: {}
						};
				
					factory(_module, _module.exports, _global);
				
					if (typeof define === 'function' && define.amd) {
				        define([], function () {
				        	return _module.exports;
				        });
				        return;
				    } 
				    if (typeof module === 'object' && module.exports) {
				    	module.exports = _module.exports;
				    	return;
				    }
				
					if (_name) {
						_global[_name] = _module.exports;
					}
				
				}(function(module, exports, global){
					var _src_compo = {};
var _src_globals = {};

				// source ./templates/ModuleSimplified.js
				var _src_globals;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mask = global.mask || require('maskjs');
exports.mask = mask;
;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_globals) && isObject(module.exports)) {
						Object.assign(_src_globals, module.exports);
						return;
					}
					_src_globals = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_compo;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = _src_globals;
exports.default = globals_1.mask.Compo({
    meta: {
        mode: 'server'
    },
    constructor: function () {
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
    resolveLazy: function (model) {
        var _this = this;
        var dfr = new globals_1.mask.class.Deferred;
        this.resolveLazy = function () {
            return dfr;
        };
        this.nodes = this._deferredNodes;
        var ctx = this._ctx;
        if (this._onRenderStart != null) {
            this._onRenderStart(this.model, ctx, this._placeholder.parentNode);
        }
        var fragment = globals_1.mask.render(this.nodes, model || this.model, ctx, null, this);
        if (ctx && ctx.async) {
            ctx.then(function () {
                appendLazy(_this, fragment);
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
    start: function (model, ctx, container) {
        this._deferredNodes = this.nodes;
        this._ctx = ctx;
        this._placeholder = document.createComment('');
        this.model = model;
        this.nodes = null;
        container.appendChild(this._placeholder);
    },
    slots: {
        domInsert: function () {
            this._isDomInserted = true;
        }
    }
};
function appendLazy(compo, fragment) {
    var els = fragment.nodeType === Node.DOCUMENT_FRAGMENT_NODE
        ? fragment.children
        : fragment;
    var container = compo._placeholder.parentNode, renderEnd = compo.renderEnd;
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
;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_compo) && isObject(module.exports)) {
						Object.assign(_src_compo, module.exports);
						return;
					}
					_src_compo = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var compo_1 = _src_compo;
var globals_1 = _src_globals;
globals_1.mask.define('Lazy', compo_1.default);
exports.default = compo_1.default;

				}));
				// end:source ./templates/UMD.js
				