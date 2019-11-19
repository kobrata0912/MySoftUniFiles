import {
	updateCatch,
	deleteCatch,
	addCatch,
	loadCatches
} from './functions.js';

let events = {
	update: id => updateCatch(id),
	delete: id => deleteCatch(id),
	add: () => addCatch(),
	load: () => loadCatches()
};

document.addEventListener('click', async function(e) {
	e.preventDefault();
	let target = e.target.classList[0];

	if (typeof events[target] === 'function') {
		if (e.path[1].dataset.id !== null) {
			let id = e.path[1].dataset.id;
			await events[target](id);
		} else {
			await events[target]();
		}
	}
});
