/*
* @Author: Philipp Fauser (philipp@attic-studio.net)
* @Date:   2016-06-23 00:36:15
* @Last Modified by:   Philipp Fauser (philipp@attic-studio.net)
* @Last Modified time: 2016-06-23 00:37:15
*/

'use strict';

export class Item {
	constructor(content, list, prevElm) {
		this.content = content;
		this.container = list;
		this.prevElm = prevElm;
		this.elm;

		this.template = '<li class="item"><input type="text" class="text-box" value="'+this.content+'"/></li>';

		this.render(list);
		this.setupEvents();

		return this.elm;
	}

	render() {
		var div = document.createElement('div');
		div.innerHTML = this.template;
		this.elm = div.childNodes[0];
		if(this.prevElm) this.container.insertBefore(this.elm, this.prevElm.nextSibling);
		else this.container.appendChild(this.elm);
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
			var newItem = new Item('**NEW**', this.container, this.elm);
			setTimeout(()=>{
				console.log(newItem);
				newItem.focus();
			}, 600);
		}
	}

	click() {
		console.log(this.content);
	}

	hover() {
		this.elm.style.backgroundColor = 'lightgrey';
	}

	leave() {
		this.elm.style.backgroundColor = 'transparent';
	}
}