import React from 'react';
import styled, { css } from 'styled-components';

const TableHeadCell = props => {
	const {
		text,
		setSortType,
		sortValueName,
		setSortValue,
		sortValue,
		sortType,
	} = props;

	const toggle = () => {
		if (sortValue === sortValueName) {
			// если переключаем 2 раз
			if (sortType === 'increase') setSortType('decrease');
			else setSortType('increase');
		} else {
			// если включаем 1 раз
			if (sortValue !== 'increase') setSortType('increase');
			setSortValue(sortValueName);
		}
	};

	return (
		<HeadCell
			sortValue={sortValue}
			sortValueName={sortValueName}
			onClick={toggle}
		>
			<Text
				sortValue={sortValue}
				sortValueName={sortValueName}
				sortType={sortType}
			>
				{text}
			</Text>
		</HeadCell>
	);
};

const HeadCell = styled.th`
	padding: 7px 10px;
	border: 2px solid gray;
	cursor: pointer;

	${({ sortValue, sortValueName }) => {
		if (sortValue === sortValueName)
			return css`
				background-color: #d1d1d1;
			`;
	}}
`;

const Text = styled.span`
	display: flex;
	align-items: center;
	justify-content: space-between;

	&::after {
		content: '';
		display: block;
		margin-left: 10px;
		border: 5px solid transparent;

		height: 0;
		width: 0px;
	}

	${({ sortValue, sortValueName, sortType }) => {
		if (sortValue === sortValueName)
			if (sortType === 'increase') {
				return css`
					&::after {
						transform: translateY(-25%);
						border-bottom: 8px solid #000;
					}
				`;
			} else if (sortType === 'decrease') {
				return css`
					&::after {
						transform: translateY(25%);

						border-top: 8px solid #000;
					}
				`;
			}
	}}
`;

export default TableHeadCell;
