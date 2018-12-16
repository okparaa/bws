const faderAnimationExit = {
	opacity: 0,
	duration: 50
};

const faderAnimationEnter = {
	opacity: 1,
	duration: 5000
};


export default {
	getEntryAnimation: () => {
		return {
			animation: faderAnimationEnter
		};
	},
	getExitAnimation: () => {
		return {
			animation: faderAnimationExit
		};
	}
};