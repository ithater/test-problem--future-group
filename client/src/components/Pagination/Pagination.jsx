import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';

const Pagination = props => {
	const {
		maxElemsPerPage,

		activePagination,
		setActivePagination,
		setActiveUserInfo,
		currentData,

		setPageData,
	} = props;

	useEffect(() => {
		const newPageData =
			currentData &&
			currentData.slice(
				activePagination * maxElemsPerPage - maxElemsPerPage,
				activePagination * maxElemsPerPage
			);

		setPageData(newPageData);
	}, [activePagination, currentData]);

	const togglePage = page => {
		setActivePagination(page);
		setActiveUserInfo(null);
	};

	const paginationLength = Math.ceil(currentData.length / maxElemsPerPage);
	console.log('paginationLength: ', paginationLength);

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
		<PaginationWrapper paginationLength={paginationLength}>
			{paginationLength > 0 && (
				<>
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
				</>
			)}
		</PaginationWrapper>
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
`;

const PaginationWrapper = styled.div`
	display: flex;
	align-items: center;
	padding: 40px 0;
	${({ paginationLength }) =>
		paginationLength === 0 &&
		css`
			display: none;
		`}
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
