import * as controller from './controllers/controller.js';
import * as authController from './controllers/authController.js';

const app = Sammy('#rooter', function() {
	this.use('Handlebars', 'hbs');

	this.get('/', controller.getHomePage);
	this.get('/login', authController.getLogin);
	this.get('/register', authController.getRegister);
	this.get('/logout', authController.logout);
	this.get('/share', controller.getShareRecipe);
	this.get('/view/:recipeID', controller.getViewRecipe);
	this.get('/archive/:recipeID', controller.getArchiveRecipe);
	this.get('/edit/:recipeID', controller.getEditRecipe);
	this.get('/like/:recipeID', controller.likeRecipe);
	this.post('/login', authController.postLogin);
	this.post('/register', authController.postRegister);
	this.post('/share', controller.postShareRecipe);
	this.post('/edit/:recipeID', controller.postEditRecipe);
});

app.run();
