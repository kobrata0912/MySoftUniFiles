import {getSessionInfo, displayError, displayLoading, hideLoading, partials, categories} from '../common.js';
import {post, get, put, del} from '../superFetch.js';

export function getHomePage(ctx) {
	getSessionInfo(ctx);
	if (ctx.isAuth) {
		get('appdata', 'CookUni', 'Kinvey')
			.then(recipe => {
				ctx.recipe = recipe;
				this.loadPartials(partials).partial('../views/home.hbs');
			})
			.catch(e => {
				//displayError(e);
				//hideLoading();
			});
	} else {
		console.log('asdasdasd');
		this.loadPartials(partials).partial('../views/home.hbs');
	}
}

export function getViewRecipe(ctx) {
	getSessionInfo(ctx);
	const recipeID = ctx.params.recipeID;
	get('appdata', `CookUni/${recipeID}`, 'Kinvey')
		.then(recipe => {
			ctx.recipe = recipe;
			ctx.isAuthor = sessionStorage.getItem('userID') === recipe._acl.creator;
			this.loadPartials(partials).partial('../views/recipe/viewRecipe.hbs');
		})
		.catch(e => {
			displayError(e);
			hideLoading();
		});
}

export function getArchiveRecipe(ctx) {
	getSessionInfo(ctx);
	const recipeID = ctx.params.recipeID;
	del('appdata', `CookUni/${recipeID}`, 'Kinvey')
		.then(ctx.redirect('/'))
		.catch(e => {
			displayError(e);
			hideLoading();
		});
}

export function getShareRecipe(ctx) {
	getSessionInfo(ctx);
	this.loadPartials(partials).partial('./views/recipe/createRecipe.hbs');
}

export function getEditRecipe(ctx) {
	getSessionInfo(ctx);
	const recipeID = ctx.params.recipeID;
	get('appdata', `CookUni/${recipeID}`, 'Kinvey')
		.then(recipe => {
			ctx.recipe = recipe;
			ctx.recipe.ingredients = recipe.ingredients.join(', ');
			this.loadPartials(partials).partial('../views/recipe/editRecipe.hbs');
		})
		.catch(e => {
			displayError(e);
			hideLoading();
		});
}

export function likeRecipe(ctx) {
	getSessionInfo(ctx);
	const recipeID = ctx.params.recipeID;
	get('appdata', `CookUni/${recipeID}`, 'Kinvey')
		.then(data => {
			data.likesCounter++;
			put('appdata', `CookUni/${recipeID}`, data, 'Kinvey')
				.then(ctx.redirect(`/view/${recipeID}`))
				.catch(e => {
					displayError(e);
					hideLoading();
				});
		})
		.catch(e => {
			displayError(e);
			hideLoading();
		});
}

export function postShareRecipe(ctx) {
	displayLoading();
	getSessionInfo(ctx);
	const { meal, prepMethod, description, foodImageURL, category } = ctx.params;
	const ingredients = ctx.params.ingredients.split(', ');
	const categoryImageURL = categories[category];
	const likesCounter = 0;

	post(
		'appdata',
		'CookUni',
		{
			meal,
			ingredients,
			prepMethod,
			description,
			category,
			foodImageURL,
			categoryImageURL,
			likesCounter
		},
		'Kinvey'
	)
		.then(data => ctx.redirect(`view/${data._id}`))
		.catch(e => {
			displayError(e);
			hideLoading();
		});
}

export function postEditRecipe(ctx) {
	displayLoading();
	getSessionInfo(ctx);
	const recipeID = ctx.params.recipeID;
	const { meal, prepMethod, description, foodImageURL, category } = ctx.params;
	const ingredients = ctx.params.ingredients.split(', ');
	const categoryImageURL = categories[category];

	get('appdata', `CookUni/${recipeID}`, 'Kinvey')
		.then(data => {
			const likesCounter = data.likesCounter;
			put(
				'appdata',
				`CookUni/${recipeID}`,
				{
					meal,
					ingredients,
					prepMethod,
					description,
					category,
					foodImageURL,
					categoryImageURL,
					likesCounter
				},
				'Kinvey'
			)
				.then(data => ctx.redirect(`view/${data._id}`))
				.catch(e => {
					displayError(e);
					hideLoading();
				});
		})
		.catch(e => {
			displayError(e);
			hideLoading();
		});
}