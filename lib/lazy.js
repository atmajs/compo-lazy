// source /src/umd.es6
'use strict';

(function (root, factory) {
	var _global = typeof global !== 'undefined' ? global : window,
	    _mask = _global.mask || _global.atma && _global.atma.mask;

	if (_mask == null && typeof require === 'function') {
		_mask = require('maskjs');
	}
	if (_mask == null) throw Error('MaskJS was not loaded');

	factory(_global, _mask);
})(undefined, function (global, mask, ruta, include, $) {

	// source ./compo.es6
	'use strict';

	var LazyCompo = mask.Compo({
		meta: {
			mode: 'server'
		},

		constructor: function constructor() {
			this._onRenderStart = this.onRenderStart;
			this._onRenderEnd = this.onRenderEnd;

			this.onRenderStart = Stub.start;
			this.onRenderEnd = null;
		},

		_onRenderStart: null,
		_deferredNodes: null,
		_ctx: null,
		_placeholder: null,

		resolveLazy: function resolveLazy(model) {
			var _this = this;

			this.resolveLazy = function () {};
			this.nodes = this._deferredNodes;

			var ctx = this._ctx;
			var onRenderStart = this._onRenderStart;

			if (typeof onRenderStart === 'function') onRenderStart.call(this, this.model, ctx, this._placeholder.parentNode);

			var fragment = mask.render(this.nodes, model || this.model, ctx, null, this);

			if (ctx && ctx.async) {
				ctx.done(function (fragment) {
					return appendLazy(_this, fragment);
				});
				return;
			}

			appendLazy(this, fragment);
		}
	});

	var Stub = {
		start: function start(model, ctx, container) {
			this._deferredNodes = this.nodes;
			this._ctx = ctx;
			this._placeholder = document.createComment('');

			this.model = model;
			this.nodes = null;

			container.appendChild(this._placeholder);
		}
	};

	function appendLazy(compo, fragment) {
		var els = fragment.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? fragment.children : fragment;

		var container = compo._placeholder.parentNode,
		    renderEnd = compo.renderEnd;

		compo.onRenderEnd = compo._onRenderEnd;

		if (typeof renderEnd === 'function') renderEnd.call(compo, els, compo.model, compo._ctx, container);

		container.insertBefore(fragment, compo._placeholder);
		compo.emitIn('domInsert');
	}
	// end:source ./compo.es6

	mask.define('a:lazy', LazyCompo);
	mask.define('Lazy', LazyCompo);
});
// end:source /src/umd.es6