const getObjectValues = obj =>
	obj && typeof obj === 'object'
		? Object.values(obj).map(getObjectValues).flat()
		: [obj];


export default getObjectValues;
