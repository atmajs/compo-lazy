### Lazy Component
[![Build Status](https://travis-ci.org/atmajs/compo-lazy.png?branch=master)](https://travis-ci.org/atmajs/compo-lazy)
[![Bower version](https://badge.fury.io/bo/compo-lazy.svg)](http://badge.fury.io/bo/compo-lazy)

```scss
a:lazy { /*Template*/ }
```

Sub-nodes of the component won't be rendered until it is required. It will be instead only one Node Comment added to the DOM, which is the placeholder for the future nodes.


### API

- **`resolveLazy(?model)`** <a name='resolveLazy'>#</a>
	
	- `model`: (optinal) When model is undefined, then the model object is taken, which was used during the first (initial) render process.

	Render the template to the document fragment, and then replace the placeholder with the nodes.

### Inheritance

```javascript
mask.registerHandler(':myComponent', Compo('a:lazy', {
	template: `button x-signal= 'click: message' > 'Greet'`,
	constructor () {
		setTimeout(() => this.resolveLazy(), 100);
	},
	slots: {
		message () {
			alert(this.model.name)
		}
	}
}));

$(body).appendMask(':myComponent', { name: 'Smith' });
```

> `onRenderStart` and `onRenderEnd` are called after the component was resolved

### Examples

- [/examples](/examples)

```bash
# install atma toolkit
npm install atma
# run server
atma server

# navigate `http://localhost:5777/examples/simple.html`
```

### Test
```bash
npm test
```

:copyright: MIT - Atma.js Project