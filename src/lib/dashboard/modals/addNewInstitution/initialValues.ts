import cloneDeep from 'lodash.clonedeep';
import { emptyLanguageValue } from '$lib/dashboard/utils/emptyFieldValues';

export const initialValues = {
	badge: '',
	name: [cloneDeep(emptyLanguageValue)],
	owner: null,
	website: null
};
