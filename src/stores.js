import { writable } from 'svelte/store';

const PAGE_STATES = Object.freeze({
	loading: 'loading',
	questions: 'questions',
	video: 'video',
	error: 'error'
});

function createIndexPageState() {
	const { subscribe, set } = writable(PAGE_STATES.questions);

	return {
		subscribe,
		update: pageState => set(pageState),
		reset: () => set(PAGE_STATES.questions)
	};
}

const indexPageStateStore = createIndexPageState();

export {
	PAGE_STATES,
	indexPageStateStore
}