(function(root, factory){
	var _global = typeof global !== 'undefined' ? global : window,
		_mask = _global.mask || (_global.atma && _global.atma.mask); 
	
	if (_mask == null && typeof require === 'function') {
		_mask = require('maskjs');
	}
	if (_mask == null) 
		throw Error('MaskJS was not loaded');
	
	factory(_global, _mask);
	
}(this, function(global, mask, ruta, include, $){
	
	// import ./compo.es6
	
	mask.define('a:lazy', LazyCompo);
	mask.define('Lazy', LazyCompo);
}));
