import { get, isEmpty, unset } from 'lodash-es';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deleteIfEmpty(fields: string[], object: any) {
	return fields.forEach((field) => {
		if (isEmpty(get(object, field))) {
			unset(object, field);
		}
	});
}

export default deleteIfEmpty;
