export enum Endpoints {
	addBeverage = '/api/admin/beverages/add',
	addBeverageCap = '/api/admin/beverages/photos/addCap',
	addBeverageCover = '/api/admin/beverages/photos/addCover',
	addBeverageGallery = '/api/admin/beverages/photos/addGallery',
	addIngredient = '/api/admin/ingredients',
	addInstitution = '/api/admin/institutions',
	addPlace = '/api/admin/places',
	addStyle = '/apid/admin/styles',
	beverageAdminNotes = '/api/admin/beverages/notes',
	beverageBasics = '/api/basics/list',
	beverageDetails = '/api/beverages/details',
	beverageDetailsAdmin = '/api/admin/beverages/details',
	beveragePhotos = '/api/admin/beverages/photos',
	beverageRemove = '/api/admin/beverages/remove',
	beverageTotal = '/api/basics/total',
	ingredients = '/api/admin/ingredients',
	institutions = '/api/admin/institutions',
	logIn = '/api/user/login',
	logOut = '/api/user/logout',
	places = '/api/admin/places',
	removeBeverageCap = '/api/admin/beverages/photos/removeCap',
	searchByPhrase = '/api/searchByPhrase',
	statsGeneral = '/api/stats/general',
	statsIngredients = '/api/stats/ingredients',
	statsStyles = '/api/stats/styles',
	styles = '/api/admin/styles',
	translate = '/api/admin/translate',
	updateBasics = '/api/admin/basics/update',
	updateBeverage = '/api/admin/beverages/update',
	updateStyle = '/api/admin/styles'
}

type Props = {
	body?: string | FormData;
	formData?: boolean;
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	pathParams?: (string | number)[];
};

function call(fetch, endpoint: Endpoints, props?: Props) {
	const { formData = false, method = 'GET', pathParams, ...rest } = props || {};
	const completeUrl = pathParams?.length ? `${endpoint}/${pathParams.join('/')}` : endpoint;

	return fetch(completeUrl, {
		method,
		headers: {
			...(!formData && { 'Content-Type': 'application/json' })
		},
		...rest
	}).then((response) => {
		if (response.status >= 300) {
			throw new Error(response.statusText);
		}

		return response.json();
	});
}

export default call;
