import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import getObjectValues from '@functions/getObjectValues';

const Search = props => {
	const {
		userData,

		setCurrentData,

		contentType,
		setContentType,

		setActivePagination,
		setShouldSort,

		setActiveUserInfo,
	} = props;

	const [searchQuery, setSearchQuery] = useState('');

	const onChange = evt => {
		setSearchQuery(evt.target.value);
	};

	const find = evt => {
		evt.preventDefault();
		if (searchQuery.trim() === '') {
			if (contentType === 'commonData') return;
			setContentType('commonData');
			setCurrentData(userData);
			return;
		}
		const queryString = searchQuery.trim().toLowerCase();

		const newSearchedData = userData.filter(user => {
			// поскольку у нас есть ключ __key__, который
			// не должен проходить проверки, делаем копию
			// с которой будем получать все значения
			const userWithoutKey = { ...user };
			delete userWithoutKey.__key__;
			const valuesToCheck = getObjectValues(userWithoutKey);

			// делаем проверку на то, что в массиве значений нет
			// ни одного подходящего эдемента, если найдем совпадение,
			// то вернем false и поменяем на true.
			const isCorresponding = !valuesToCheck.every(value => {
				return !value.toString().toLowerCase().includes(queryString);
			});
			return isCorresponding;
		});
		setActivePagination(1);
		setActiveUserInfo(null);
		setCurrentData(newSearchedData);
		if (contentType !== 'searchedData') setContentType('searchedData');
		else setShouldSort(Math.random());
	};

	return (
		<Form onSubmit={find}>
			<Input value={searchQuery} onChange={onChange} type="text" />
			<Find>Найти</Find>
		</Form>
	);
};

const Form = styled.form`
	display: flex;
`;

const Input = styled.input`
	margin-right: 25px;
	padding: 0 10px;
	width: 500px;
	min-height: 36px;
	border-radius: 4px;
	border: 1px solid #333333;
	outline: none;
	transition: 0.3s;
	&:focus {
		border-color: transparent;
		box-shadow: 0 0 0 2px #2e8bc9;
	}
`;

const Find = styled.button.attrs({ type: 'submit' })`
	padding: 10px;
	font-weight: 600;
	color: #4d535a;
	background-color: #f6f8fa;
	border: 1px solid #4d535a;
	border-radius: 4px;
	outline: none;

	@media (hover: hover) and (pointer: fine) {
		&:hover {
			background-color: #f7fbff;
		}
	}
`;

export default Search;
