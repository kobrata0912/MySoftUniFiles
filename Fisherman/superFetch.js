export async function superFetch(method, body, id) {
	let methods = {
		get: base => superFetchGet(base),
		post: (base, body) => superFetchPost(base, body),
		put: (base, body, id) => superFetchPut(base, body, id),
		delete: (base, undefined, id) => superFetchDelete(base, id)
	};

	let baseUrl = 'https://fisher-game.firebaseio.com/catches';

	if (typeof methods[method] === 'function') {
		return methods[method](baseUrl, body, id);
	}

	async function superFetchGet(base) {
		return await fetch(`${base}.json`);
	}

	async function superFetchPost(base, inputBody) {
		let jsonBody = JSON.stringify(inputBody);
		return await fetch(`${base}.json`, {
			method: 'POST',
			body: jsonBody
		});
	}

	async function superFetchPut(base, inputBody, id) {
		let jsonBody = JSON.stringify(inputBody);
		let result = await fetch(`${base}/${id}.json`, {
			method: 'PUT',
			body: jsonBody
		});
		return result;
	}

	async function superFetchDelete(base, id) {
		let result = await fetch(`${base}/${id}.json`, {
			method: 'DELETE'
		});
		return result;
	}
}
