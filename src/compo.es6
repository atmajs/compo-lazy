var LazyCompo = mask.Compo({
	meta: {
		mode: 'server'
	},
	_deferredNodes: null,
	_ctx: null,
	_placeholder: null,
	
	onRenderStart (model, ctx, container) {
		
		this._deferredNodes = this.nodes;
		this._ctx = ctx;
		this._placeholder = document.createComment('');
		
		this.model = model;
		this.nodes = null;
		
		container.appendChild(this._placeholder);
	},
	
	resolveLazy (model) {
		this.resolveLazy = function(){};
		
		var ctx = this._ctx;
		var fragment = mask.render(
			this._deferredNodes
			, model || this.model
			, ctx
			, null
			, this
		);
		
		if (ctx && ctx.async) {
			ctx.done(fragment => appendLazy(this, fragment));
			return;
		}
		
		appendLazy(this, fragment);
	}
});

function appendLazy(compo, fragment){
	compo._placeholder.parentNode.insertBefore(fragment, compo._placeholder);
	compo.emitIn('domInsert');
}