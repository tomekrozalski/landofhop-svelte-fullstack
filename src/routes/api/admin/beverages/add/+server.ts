import { get } from 'svelte/store';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { formatBasics, formatBeverage, generateShortId } from '$lib/utils/api';
import type { RawBasics, RawBasicsWithoutId } from '$types/api/RawBasics.d';
import type { NewBeverageRequest } from '$types/api/requests/Beverage';
import type { RawBeverage, RawBeverageWithoutId } from '$types/api/RawBeverage/RawBeverage.d';
import authentication from '$lib/utils/stores/authentication';
import { basics, beverages } from '$db/mongo';

export const POST: RequestHandler = async ({ request }) => {
	const beverageData: NewBeverageRequest = await request.json();

	if (!get(authentication).isLoggedIn) {
		throw error(401, 'Unauthorized. Cannot add new beverage');
	}

	const commonProps = {
		badge: beverageData.label.badge,
		shortId: generateShortId(),
		added: new Date()
	};

	const formattedBasics: RawBasicsWithoutId = formatBasics(beverageData, commonProps);
	const formattedBeverage: RawBeverageWithoutId = formatBeverage(beverageData, commonProps);

	await basics.insertOne(formattedBasics as RawBasics);
	await beverages.insertOne(formattedBeverage as RawBeverage);

	return json({
		badge: formattedBasics.badge,
		brand: formattedBasics.brand.badge,
		shortId: formattedBasics.shortId
	});
};
