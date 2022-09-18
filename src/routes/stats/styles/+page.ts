import { get } from 'svelte/store';
import apiCall, { Endpoints } from '$lib/utils/api/call';
import authentication from '$lib/utils/stores/authentication';
import type { Style as StyleType } from '$lib/utils/types/Style';
import type { StylesStats as StylesStatsTypes } from '$lib/utils/types/stats/Styles';

export async function load({ fetch }) {
	try {
		if (get(authentication).isLoggedIn) {
			const [statsData, styles]: [StylesStatsTypes[], StyleType[]] = await Promise.all([
				apiCall(fetch, Endpoints.statsStyles, { pathParams: ['pl'] }),
				apiCall(fetch, Endpoints.styles)
			]);

			return { statsData, styles };
		}

		const statsData = await apiCall(fetch, Endpoints.statsStyles, { pathParams: ['pl'] });

		return { statsData, styles: [] };
	} catch {
		return { statsData: [], styles: [] };
	}
}
