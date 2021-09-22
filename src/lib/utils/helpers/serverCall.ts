export enum Endpoints {
	// addCountry = 'country',
	// addIngredient = 'ingredient',
	// addInstitution = 'institution',
	// addLanguage = 'language',
	// addPlace = 'place',
	authorize = 'authorize',
	beverageAdminNotes = 'admin/beverage/notes',
	beverageBasics = 'basics',
	// beverageDashboardDetails = 'beverage/admin/dashboard',
	beverageDetails = 'details',
	beverageSearch = 'beverage/search',
	beverageStats = 'beverage/stats',
	beverageTotal = 'beverage/total',
	// country = 'country/getAll',
	// ingredient = 'ingredient/getAll',
	// institution = 'institution/getAll',
	// language = 'language/getAll',
	// place = 'place/getAll',
	// removeBeverage = 'beverage',
	// saveBeverage = 'beverage',
	unauthorize = 'unauthorize',
	verifyToken = 'verifyToken'
}

type Props = {
	body?: string | FormData;
	formData?: boolean;
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	pathParams?: (string | number)[];
};

function serverCall(fetch, endpoint: Endpoints, props?: Props) {
	const { formData = false, method = 'GET', pathParams, ...rest } = props || {};

	const baseUrl = `${import.meta.env.VITE_API_SERVER}/${endpoint}`;
	const completeUrl = pathParams?.length ? `${baseUrl}/${pathParams.join('/')}` : baseUrl;
	const isProtectedRoute = [
		Endpoints.authorize,
		Endpoints.beverageAdminNotes,
		Endpoints.unauthorize,
		Endpoints.verifyToken
	].includes(endpoint);

	return fetch(completeUrl, {
		method,
		...(isProtectedRoute && { credentials: 'include' }),
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

export default serverCall;
