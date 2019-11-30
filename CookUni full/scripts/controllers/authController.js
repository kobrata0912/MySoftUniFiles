import {getSessionInfo, displayError, displayLoading, hideLoading, partials} from '../common.js';
import { post } from '../superFetch.js';

export function getLogin(ctx) {
	getSessionInfo(ctx);
	this.loadPartials(partials).partial('./views/auth/login.hbs');
}

export function getRegister(ctx) {
	getSessionInfo(ctx);
	this.loadPartials(partials).partial('./views/auth/register.hbs');
}

export function logout(ctx) {
	displayLoading();
	post('user', '_logout', {}, 'Kinvey')
		.then(() => {
			sessionStorage.clear();
			ctx.redirect('/');
		})
		.catch(e => {
			displayError(e);
			hideLoading();
		});
}

export function postLogin(ctx) {
	displayLoading();
	getSessionInfo(ctx);
	const { username, password } = ctx.params;

	post('user', 'login', { username, password }, 'Basic')
		.then(data => {
			sessionStorage.setItem('names', `${data.firstName} ${data.lastName}`);
			sessionStorage.setItem('authtoken', data._kmd.authtoken);
			sessionStorage.setItem('userID', data._id);
			ctx.redirect('/');
		})
		.catch(e => {
			displayError(e);
			hideLoading();
		});
}

export function postRegister(ctx) {
	displayLoading();
	getSessionInfo(ctx);
	const {
		firstName,
		lastName,
		username,
		password,
		repeatPassword
	} = ctx.params;

	if (password === repeatPassword) {
		post('user', '', { firstName, lastName, username, password }, 'Basic')
			.then(data => {
				sessionStorage.setItem('names', `${data.firstName} ${data.lastName}`);
				sessionStorage.setItem('authtoken', data._kmd.authtoken);
				sessionStorage.setItem('userID', data._id);
				ctx.redirect('/');
			})
			.catch(e => {
				displayError(e);
				hideLoading();
			});
	}
}