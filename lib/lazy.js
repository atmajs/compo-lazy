// source /src/umd.es6
(function(root, factory) {
  var _global = typeof global !== 'undefined' ? global : window,
      _mask = _global.mask || (_global.atma && _global.atma.mask);
  if (_mask == null)
    throw Error('MaskJS was not loaded');
  factory(_global, _mask);
}(this, function(global, mask, ruta, include, $) {
  var LazyCompo = mask.Compo({
    meta: {mode: 'server'},
    _deferredNodes: null,
    _ctx: null,
    _placeholder: null,
    onRenderStart: function(model, ctx, container) {
      this._deferredNodes = this.nodes;
      this._ctx = ctx;
      this._placeholder = document.createComment('');
      this.model = model;
      this.nodes = null;
      container.appendChild(this._placeholder);
    },
    resolveLazy: function() {
      var $__0 = this;
      this.resolveLazy = function() {};
      var ctx = this._ctx;
      var fragment = mask.render(this._deferredNodes, this.model, ctx, null, this);
      if (ctx && ctx.async) {
        ctx.done((function(fragment) {
          return appendLazy($__0, fragment);
        }));
        return;
      }
      appendLazy(this, fragment);
    }
  });
  function appendLazy(compo, fragment) {
    compo._placeholder.parentNode.insertBefore(fragment, compo._placeholder);
    compo.emitIn('domInsert');
  }
  mask.registerHandler('a:lazy', LazyCompo);
}));

// end:source /src/umd.es6