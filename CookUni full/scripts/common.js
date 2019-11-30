export const partials = {
	header: '../views/common/header.hbs',
	footer: '../views/common/footer.hbs',
	notifications: '../views/common/notifications.hbs',
    'home-auth': '../views/home-auth.hbs',
	'home-notAuth': '../views/home-notAuth.hbs',
	noRecipes: '../views/recipe/noRecipes.hbs',
	recipe: '../views/recipe/recipe.hbs'
};

export const categories = {
	'Grain Food':
		'https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg',
	Fruits:
		'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg',
	'Milk, cheese, eggs and alternatives':
		'https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg',
	'Lean meats and poultry, fish and alternatives':
		'https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg',
	'Vegetables and legumes/beans':
		'https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549__340.jpg'
};

export function getSessionInfo(ctx) {
	ctx.isAuth = sessionStorage.getItem('authtoken') !== null;
	ctx.names = sessionStorage.getItem('names');
}

export function displayError(message) {
	const errorBox = document.getElementById('errorBox');
	errorBox.style.display = 'block';
	errorBox.textContent = message;
	setTimeout(() => {
		errorBox.style.display = 'none';
	}, 3500);
}

export function displayLoading() {
	const loadingBox = document.getElementById('loadingBox');
	loadingBox.style.display = 'block';
}

export function hideLoading() {
	const loadingBox = document.getElementById('loadingBox');
	loadingBox.style.display = 'none';
}

