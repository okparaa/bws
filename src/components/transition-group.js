import { h, Component, cloneElement } from 'preact';

const identity = i => i;

const getChildMapping = (children) => {
	let out = {};
	for (let i=0; i<children.length; i++) {
		if (children[i]!=null) {
			let key = getKey(children[i], i.toString(36));
			out[key] = children[i];
		}
	}
	return out;
};

const getKey = (vnode, fallback) => {
	let key = vnode.attributes && vnode.attributes.key;
	return key===null || key===undefined ? fallback : key;
}

const linkRef = (component, name) => {
	let cache = component._ptgLinkedRefs || (component._ptgLinkedRefs = {});
	return cache[name] || (cache[name] = c => {
		component.refs[name] = c;
	});
}

const assign = (obj, props) => {
	for (let i in props) if (props.hasOwnProperty(i)) obj[i] = props[i];
	return obj;
}


const mergeChildMappings = (prev, next) => {
	prev = prev || {};
	next = next || {};

	let getValueForKey = key => next.hasOwnProperty(key) ? next[key] : prev[key];

	// For each key of `next`, the list of keys to insert before that key in
	// the combined list
	let nextKeysPending = {};

	let pendingKeys = [];
	for (let prevKey in prev) {
		if (next.hasOwnProperty(prevKey)) {
			if (pendingKeys.length) {
				nextKeysPending[prevKey] = pendingKeys;
				pendingKeys = [];
			}
		}
		else {
			pendingKeys.push(prevKey);
		}
	}

	let childMapping = {};
	for (let nextKey in next) {
		if (nextKeysPending.hasOwnProperty(nextKey)) {
			for (let i=0; i<nextKeysPending[nextKey].length; i++) {
				let pendingNextKey = nextKeysPending[nextKey][i];
				childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
			}
		}
		childMapping[nextKey] = getValueForKey(nextKey);
	}

	// Finally, add the keys which didn't appear before any key in `next`
	for (let i=0; i<pendingKeys.length; i++) {
		childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
	}

	return childMapping;
}

export default class TransitionGroup extends Component {
	static defaultProps = {
		component: 'div',
		childFactory: identity
	};

	refs = {};

	state = {
		children: getChildMapping(this.props.children || [])
	};

	componentWillMount() {
		this.currentlyTransitioningKeys = {};
		this.keysToAbortLeave = [];
		this.keysToEnter = [];
		this.keysToLeave = [];
	}

	componentDidMount() {
		let initialChildMapping = this.state.children;
		for (let key in initialChildMapping) {
			if (initialChildMapping[key]) {
				// this.performAppear(getKey(initialChildMapping[key], key));
				this.performAppear(key);
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		let nextChildMapping = getChildMapping(nextProps.children || []);
		let prevChildMapping = this.state.children;
		//remove the prevChildMapping components from the nextChildMapping components
		Object.keys(nextChildMapping).map(key => {
			delete prevChildMapping[key];
		})
		
		this.setState({
			children: mergeChildMappings(prevChildMapping, nextChildMapping)
		});

		let key;

		for (key in nextChildMapping) if (nextChildMapping.hasOwnProperty(key)) {
			let hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
			// We should re-enter the component and abort its leave function
			let keyExist = this.keysToEnter.indexOf(key) === -1; 
			if (nextChildMapping[key] && hasPrev && this.currentlyTransitioningKeys[key]) {
				if(keyExist){
					this.keysToEnter.push(key);
				}
				if(this.keysToAbortLeave.indexOf(key) === -1){
					this.keysToAbortLeave.push(key);
				}
			} else if (keyExist && nextChildMapping[key] && !hasPrev && !this.currentlyTransitioningKeys[key]) {
				this.keysToEnter.push(key);
			}
		}

		for (key in prevChildMapping) if (prevChildMapping.hasOwnProperty(key)) {
			// let hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(key);
			if(this.keysToLeave.indexOf(key) === -1){
				this.keysToLeave.push(key);
			}	
			// if (prevChildMapping[key] && !hasNext && !this.currentlyTransitioningKeys[key]) {
			// 	this.keysToLeave.push(key);
			// }
		}
	}

	componentDidUpdate() {
		setTimeout(() => {
			let keysToEnter = this.keysToEnter;
			this.keysToEnter = [];
			keysToEnter.forEach(this.performEnter);

			let keysToLeave = this.keysToLeave;
			console.log('keysToEnter: ', keysToEnter, 'keysToLeave: ', keysToLeave)
			this.keysToLeave = [];
			keysToLeave.forEach(this.performLeave);
		});
	}

	_finishAbort (key) {
		const idx = this.keysToAbortLeave.indexOf(key);
		if (idx !== -1) {
			this.keysToAbortLeave.splice(idx, 1);
		}
	}

	performAppear(key) {
		this.currentlyTransitioningKeys[key] = true;

		let component = this.refs[key];

		if (component && component.componentWillAppear) {
			component.componentWillAppear(this._handleDoneAppearing.bind(this, key));
		}
		else {
			this._handleDoneAppearing(key);
		}
	}

	_handleDoneAppearing(key) {
		let component = this.refs[key];
		if (component && component.componentDidAppear) {
			component.componentDidAppear();
		}

		delete this.currentlyTransitioningKeys[key];
		this._finishAbort(key);

		let currentChildMapping = getChildMapping(this.props.children || []);

		if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
			// This was removed before it had fully appeared. Remove it.
			this.performLeave(key);
		}
	}

	performEnter = (key) => {
		this.currentlyTransitioningKeys[key] = true;

		let component = this.refs[key];

		if (component && component.componentWillEnter) {
			component.componentWillEnter(this._handleDoneEntering.bind(this, key));
		}
		else {
			this._handleDoneEntering(key);
		}
	};

	_handleDoneEntering(key) {
		let component = this.refs[key];
		if (component && component.componentDidEnter) {
			component.componentDidEnter();
		}

		delete this.currentlyTransitioningKeys[key];
		this._finishAbort(key);

		let currentChildMapping = getChildMapping(this.props.children || []);
	
		if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
			// This was removed before it had fully entered. Remove it.
			this.performLeave(key);
		}
	}

	performLeave = (key) => {
		// If we should immediately abort this leave function,
		// don't run the leave transition at all.
		const idx = this.keysToAbortLeave.indexOf(key);
		if (idx !== -1) {
			console.log('did not perform leave')
			return;
		}

		this.currentlyTransitioningKeys[key] = true;

		let component = this.refs[key];
		// console.log(this.refs)
		if (component && component.componentWillLeave) {
			// console.log('calling will leave', key)
			component.componentWillLeave(this._handleDoneLeaving.bind(this, key));
		}
		else {
			// Note that this is somewhat dangerous b/c it calls setState()
			// again, effectively mutating the component before all the work
			// is done.
			this._handleDoneLeaving(key);
		}
	};

	_handleDoneLeaving(key) {
		// If we should immediately abort the leave,
		// then skip this altogether
		const idx = this.keysToAbortLeave.indexOf(key);
		if (idx !== -1) {
			return;
		}

		let component = this.refs[key];

		if (component && component.componentDidLeave) {
			component.componentDidLeave();
		}

		delete this.currentlyTransitioningKeys[key];

		let currentChildMapping = getChildMapping(this.props.children || []);

		if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
			// This entered again before it fully left. Add it again.
			this.performEnter(key);
		}
		else {
			let children = assign({}, this.state.children);
			delete children[key];
			this.setState({ children });
		}
	}

	render({ childFactory, transitionLeave, transitionName, transitionAppear, transitionEnter, transitionLeaveTimeout, transitionEnterTimeout, transitionAppearTimeout, component, ...props }, { children }) {
		// TODO: we could get rid of the need for the wrapper node
		// by cloning a single child
		let childrenToRender = [];
		for (let key in children) if (children.hasOwnProperty(key)) {
			let child = children[key];
			if (child) {
				let ref = linkRef(this, key),
					el = cloneElement(childFactory(child), { ref, key });
				childrenToRender.push(el);
			}
		}

		return h(component, props, childrenToRender);
	}
}