/*
* @Author: Philipp Fauser (philipp@attic-studio.net)
* @Date:   2016-06-22 23:27:36
* @Last Modified by:   Philipp Fauser (philipp@attic-studio.net)
* @Last Modified time: 2016-06-23 01:22:47
*/

'use strict';

// import {Item} from './classes/item.js';

class Component {
	constructor(content, container, prevElm) {
		this.content = content;
		this.container = container;
		this.prevElm = prevElm;
		this.elm;
	}

	render() {
		var div = document.createElement('div');
		div.innerHTML = this.template;
		this.elm = div.childNodes[0];
		if(this.prevElm) this.container.insertBefore(this.elm, this.prevElm.nextSibling);
		else this.container.appendChild(this.elm);
	}

	setupEvents() {

	}
}

class Item extends Component {
	constructor(content, container, prevElm) {
		super(content, container, prevElm);
		
		this.template = `<li class="item">
							<input type="text" class="text-box" value="${this.content}"/>
						</li>`;

		this.render();
		this.setupEvents();

		return this.elm;
	}

	setupEvents() {
		this.elm.onkeydown = (ev) => this.enter(ev);
		this.elm.onclick = () => this.click();
		this.elm.onmouseover = () => this.hover();
		this.elm.onmouseleave = () => this.leave();
	}

	enter(ev) {
		var keyCode = ev.keyCode;
		if(keyCode==13) {
			var newItem = new Item('', this.container, this.elm);
			newItem.firstElementChild.focus();
		} else if(keyCode==38 && this.elm.previousSibling) {
			this.elm.previousSibling.firstElementChild.focus();
		} else if(keyCode==40 && this.elm.nextSibling) {
			this.elm.nextSibling.firstElementChild.focus();
		}
	}

	click() {
		this.elm.firstElementChild.focus();
	}

	hover() {
		// this.elm.style.backgroundColor = 'lightgrey';
	}

	leave() {
		// this.elm.style.backgroundColor = 'transparent';
	}
}

var create = function(type, classes, content) {
	var elm = document.createElement(type);	
	elm.className = (classes)?classes:'';
	elm.innerHTML = (content)?content:'';
	return elm;
}

var style = `body {
				background: #EEE;
			} 

			body * {
				box-sizing: border-box;
			}

			ul {
				list-style-type: none;
				padding: 0px 10%;
				margin: 0px;
			}

			ul li {
				width: 100%;
			}

			.text-box {
				width: 100%; 
				padding: 8px;
				border-radius: 4px;
				border: 1px solid #999;
			} 

			.item {
				cursor: pointer;
				margin: 8px 0px;
				padding: 4px;
			}`;
document.head.appendChild(create('style', '', style));

document.title = 'Phils\' Babylon';

var header = create('h1', '', 'Hello World')
,	container = create('div', 'hidden right', 'I am your container.')
,	list = create('ul');

for(var i=0;i<10;i++) {
	new Item('Item: '+i, list, null);
}

container.appendChild(list);

document.body.appendChild(header);
document.body.appendChild(container);