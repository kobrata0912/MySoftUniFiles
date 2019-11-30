const baseUrl = 'https://baas.kinvey.com';
const appKey = 'kid_rkA_fWH2H';
const appSecret = 'bc8d8e385ce74da191cf494be47fbe1b';

function createAuthorization(type) {
	return type === 'Basic'
		? `Basic ${btoa(`${appKey}:${appSecret}`)}`
		: `Kinvey ${sessionStorage.getItem('authtoken')}`;
}

function createHeader(httpMethod, data, type) {
	const headers = {
		method: httpMethod,
		headers: {
			Authorization: createAuthorization(type),
			'Content-Type': 'application/json'
		}
	};
	if (httpMethod === 'POST' || httpMethod === 'PUT') {
		headers.body = JSON.stringify(data);
	}
	return headers;
}

async function handleError(e) {
	if (!e.ok) {
		await e.json().then(response => {
			throw new Error(response.description);
		})

	}
	return e;
}

function deserializeData(x) {
	if (x.status === 204) {
		return x;
	}
	return x.json();
}

async function fetchData(kinveyModule, endpoint, headers) {
	const url = `${baseUrl}/${kinveyModule}/${appKey}/${endpoint}`;

	return await fetch(url, headers)
		.then(handleError)
		.then(deserializeData);
}

export function get(kinveyModule, endpoint, type) {
	const header = createHeader('GET', undefined, type);
	return fetchData(kinveyModule, endpoint, header);
}

export function post(kinveyModule, endpoint, data, type) {
	const header = createHeader('POST', data, type);
	return fetchData(kinveyModule, endpoint, header);
}

export function put(kinveyModule, endpoint, data, type) {
	const header = createHeader('PUT', data, type);
	return fetchData(kinveyModule, endpoint, header);
}

export function del(kinveyModule, endpoint, type) {
	const header = createHeader('DELETE', undefined, type);
	return fetchData(kinveyModule, endpoint, header);
}
