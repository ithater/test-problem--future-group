const qSort = (list, key, type = 'increase') => {
	// list - array
	// key - ключ элемента стписка
	// type - 'decrease' - убывание | 'increase' - возрастание;
	// Быстрая сортировка основываясь на значении из ключа.
	// При вложенности ключей {somekey: {val: { id: 100, name: 'Igor'}}}
	// нужно переписать код с использованием lodash.get или подобным алгоритмом.
	list = [...list]
	const sort = (list, key) => {
		if (list.length < 2) return list;
		const middleIndex = Math.floor(list.length / 2);
		const pivot = list.splice(middleIndex, 1)[0];
		const pivotValue = pivot[key];
		const smaller = list.filter(item => item[key] <= pivotValue);
		const bigger = list.filter(item => item[key] > pivotValue);
		return [...sort(smaller, key), pivot, ...sort(bigger, key)];
	};

	const sortedList = sort(list, key);


	if (type === 'decrease') sortedList.reverse();

	return sortedList;
};

export default qSort;
