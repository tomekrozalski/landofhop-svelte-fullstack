import { get } from 'svelte/store';
import * as yup from 'yup';
import { ingredientsStore } from '$lib/utils/stores/selects';

// @ToDo types
export function getValidationSchema(translate, initial) {
	return yup.object().shape({
		badge: yup
			.string()
			.min(3, translate('form.validation.minChars', { value: 3 }))
			.matches(/^[a-z\d-]+$/, translate('form.validation.badge'))
			.test(
				'is-available',
				translate('form.validation.badgeAlreadyExists'),
				(value) => !get(ingredientsStore).find(({ badge }) => badge === value && badge !== initial)
			)
			.required(translate('form.validation.required')),
		name: yup
			.array()
			.of(
				yup.object().shape({
					language: yup.string().required(translate('form.validation.required')),
					value: yup.string().required(translate('form.validation.required'))
				})
			)
			.required()
			.min(1),
		type: yup.string().required(translate('form.validation.required')),
		parent: yup.string().required(translate('form.validation.required'))
	});
}
