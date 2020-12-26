import React from 'react';
import styled, { css } from 'styled-components';

const Pagination = props => {
	const { paginationLength, activePagination, setActivePagination, setActiveUserInfo } = props;


	const togglePage = (page) => {
		setActivePagination(page);
		setActiveUserInfo(null);
	};

	// paginani это элемент пагинции. кнопочка (1) (2) .
	const leftPaginanis = [];
	const rightPaginanis = [];
	const paginanis = [];
	const maxPaginani = 5;

	// если страниц с пагинацией будет до 8 (включительно),
	// то отображаем всю пагинацию
	if (paginationLength <= 8) {
		for (let i = 1; i <= paginationLength; i++) {
			const paginani = createPaginani({
				key: i,
				active: activePagination === i,
				text: i,
				onClick: () => togglePage(i),
			});

			paginanis.push(paginani);
		}
		// иначе делаем умную пагинацию
	} else {
		for (let i = 1; i <= paginationLength; i++) {
			// перебор каждого индекса
			// и решение будет ли отображаться
			// наша пагинани
			// if (activePagination <= 5) {
				const paginani = createPaginani({
					key: i,
					active: activePagination === i,
					text: i,
					onClick: () => togglePage(i),
				});
				paginanis.push(paginani);
				continue;
			// }
		}
	}

	return (
		<Holder>
			{activePagination !== 1 && (
				<TogglePageButton
					onClick={() => togglePage(activePagination - 1)}
					itemType="left"
				>
					Предыдущая
				</TogglePageButton>
			)}

			<Holder>{paginanis}</Holder>

			{paginationLength !== activePagination && (
				<TogglePageButton
					onClick={() => togglePage(activePagination + 1)}
					itemType="right"
				>
					Следующая
				</TogglePageButton>
			)}
		</Holder>
	);
};

const createPaginani = ({ key, text, onClick, active }) => (
	<Paginani key={key} onClick={onClick} active={active}>
		{text}
	</Paginani>
);

const Holder = styled.div`
	display: flex;
	align-items: center;
	padding: 20px 0;
`;

const TogglePageButton = styled.button`
	padding: 10px;
	background-color: #fff;

	border: none;
	outline: none;
	border-radius: 50%;

	&:hover {
		background-color: rgba(0, 0, 0, 0.15);
	}

	border-radius: 6px;
	border: none;
	outline: none;

	${({ itemType }) => {
		if (itemType === 'left')
			return css`
				margin-right: 15px;
			`;
		if (itemType === 'right')
			return css`
				margin-left: 15px;
			`;
	}}
`;

const Paginani = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 30px;
	height: 30px;

	background-color: rgba(0, 0, 0, 0);

	border: none;
	outline: none;
	border-radius: 50%;
	&:not(:last-child) {
		margin-right: 15px;
	}

	&:hover {
		background-color: rgba(0, 0, 0, 0.09);
	}

	${({ active }) =>
		active &&
		css`
			background-color: rgba(0, 0, 0, 0.14);
			font-weight: 600;
			&:hover {
				background-color: rgba(0, 0, 0, 0.14);
			}
		`}
`;

export default Pagination;
