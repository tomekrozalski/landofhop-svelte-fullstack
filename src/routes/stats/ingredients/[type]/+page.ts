import { get } from 'svelte/store';
import apiCall, { Endpoints } from '$lib/utils/api/call';
import authentication from '$lib/utils/stores/authentication';
import type { IngredientsStats as IngredientsStatsTypes } from '$lib/utils/types/stats/General';
import type { Ingredient as IngredientType } from '$lib/utils/types/Ingredient';

// export const prerender = true;

export async function load({ fetch, params }) {
	try {
		if (get(authentication).isLoggedIn) {
			const [statsData, ingredients]: [IngredientsStatsTypes, IngredientType[]] = await Promise.all(
				[
					apiCall(fetch, Endpoints.statsIngredients, { pathParams: ['pl', params.type] }),
					apiCall(fetch, Endpoints.ingredients)
				]
			);

			return { statsData, ingredients };
		}

		const statsData: IngredientsStatsTypes = await apiCall(fetch, Endpoints.statsIngredients, {
			pathParams: ['pl', params.type]
		});

		return { statsData, ingredients: [] };
	} catch {
		return { statsData: [], ingredients: [] };
	}
}
