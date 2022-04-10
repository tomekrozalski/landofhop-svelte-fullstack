import type { AppLanguage } from '$lib/utils/enums/AppLanguage.enum';
import type { RawGeneralStats } from '$lib/utils/types/api/RawStats/RawGeneralStats';
import type {
	AddTimelineBar,
	AlcoholChartBar,
	Brand,
	GeneralStats,
	TopBrandsTimelineBar
} from '$lib/utils/types/stats/General';
import { addTimeline } from './addTimeline';
import { alcoholChart } from './alcoholChart';
import { getTopBrands, topBrandsTimeline } from './topBrandsTimeline';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function normalizer(rawData: RawGeneralStats[], language: AppLanguage) {
	const addTimelineData: AddTimelineBar[] = addTimeline(rawData);
	const alcoholChartData: AlcoholChartBar[] = alcoholChart(rawData);
	const topBrandsTimelineData: TopBrandsTimelineBar[] = topBrandsTimeline(rawData);
	const morePopularBrandsData: Brand[] = getTopBrands(rawData, 10);

	const completeData: GeneralStats = {
		addTimelineData,
		alcoholChartData,
		fermentationTimelineData: [],
		morePopularBrandsData,
		topBrandsTimelineData
	};

	return completeData;
}
