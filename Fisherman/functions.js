import { superFetch } from './superFetch.js';
import {
	getNewCatchInfo,
	parseCatchesToDom,
	removeElementFromDOM,
	getUpdateOnCatch
} from './DomOperations.js';

export async function updateCatch(id) {
	await superFetch('put', getUpdateOnCatch(document, id), id)
		.then(handleError)
		.then(loadCatches)
		.catch(e => console.log(e));
}

export async function deleteCatch(id) {
	removeElementFromDOM(document, id);
	await superFetch('delete', undefined, id)
		.then(handleError)
		.catch(e => console.log(e));
}

export async function addCatch() {
	await superFetch('post', getNewCatchInfo(document), undefined)
		.then(handleError)
		.then(parseInputData)
		.then(loadCatches)
		.catch(e => console.log(e));
	return;
}

export async function loadCatches() {
	await superFetch('get', undefined, undefined)
		.then(handleError)
		.then(parseInputData)
		.then(res => parseCatchesToDom(document, res))
		.catch(e => console.log(e));

	return;
}

function handleError(x) {
	if (!x.ok) {
		console.error(`ERROR -> Status ${x.status} -> ${x.statusText}`);
		return;
	}
	return x;
}

function parseInputData(x) {
	return x.json();
}
