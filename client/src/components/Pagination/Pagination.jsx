import React from 'react';
import styled, { css } from 'styled-components';

const Pagination = props => {
	const {
		maxElemsPerPage,
		activePagination,
		setActivePagination,
		dataLength,
	} = props;

	const paginationLength = Math.ceil(dataLength / maxElemsPerPage);
	const paginationElems = [];

	// если страниц с пагинацией будет до 8 (включительно),
	// то отображаем всю пагинацию
	if (paginationLength <= 8) {
		for (let i = 1; i <= paginationLength; i++) {
			const paginationEl = createPaginationEl({
				key: i,
				active: activePagination === i,
				text: i,
				onClick: () => setActivePagination(i),
			});

			paginationElems.push(paginationEl);
		}
	} else {
		// иначе делаем умную пагинацию
		
		// логика вставок поломок (кнопок (...))  
		// напрямую зависит от oneSide
		const oneSide = 2;


		// делаем 1 элемент
		const theFirsthPaginani = createPaginationEl({
			key: 1,
			active: activePagination === 1,
			text: 1,
			onClick: () => setActivePagination(1),
		});
		paginationElems.push(theFirsthPaginani);

		// делаем элементы посередине

		// вычисляем индекс первого элемента левой части
		let maxLeft = activePagination - oneSide;
		// вычисляем индекс последнего элемента правой части
		let maxRight = activePagination + oneSide;

		// делаем проверки на то, чтобы мы не перешли пороги
		// т.е. не дошли до отрицательных индексов или сверхмаксимального индекса
		if (maxLeft <= 1) {
			maxLeft = 2;
			maxRight = oneSide * 2 + 1;
		}

		if (maxRight >= paginationLength) {
			maxLeft = paginationLength - oneSide * 2;
			maxRight = paginationLength - 1;
			if (maxLeft <= 1) maxLeft = 2;
		}

		for (let i = maxLeft; i <= maxRight; i++) {
			// решаем должны ли вставлять (...) элемент
			const shouldBreakLeft = activePagination > oneSide * 2;
			const shouldBreakRight = activePagination <= paginationLength - (oneSide * 2);

			if ((shouldBreakLeft && i === maxLeft) || (shouldBreakRight && i === maxRight)) {
				const paginationEl = createPaginationEl({
					key: i,
					active: activePagination === i,
					text: '...',
					onClick: () => setActivePagination(i),
				});
				paginationElems.push(paginationEl);
				continue;
			}

			// иначе добавляем обычный элемент
			const paginationEl = createPaginationEl({
				key: i,
				active: activePagination === i,
				text: i,
				onClick: () => setActivePagination(i),
			});

			paginationElems.push(paginationEl);
		}

		// делаем последний элемент
		const theLastPaginani = createPaginationEl({
			key: paginationLength,
			active: activePagination === paginationLength,
			text: paginationLength,
			onClick: () => setActivePagination(paginationLength),
		});
		paginationElems.push(theLastPaginani);
	}

	return (
		<PaginationWrapper paginationLength={paginationLength}>
			{paginationLength > 0 && (
				<>
					{activePagination !== 1 && (
						<ToggleButton
							onClick={() => setActivePagination(activePagination - 1)}
							itemType="left"
						>
							Предыдущая
						</ToggleButton>
					)}

					<Holder>{paginationElems}</Holder>

					{paginationLength !== activePagination && (
						<ToggleButton
							onClick={() => setActivePagination(activePagination + 1)}
							itemType="right"
						>
							Следующая
						</ToggleButton>
					)}
				</>
			)}
		</PaginationWrapper>
	);
};

const createPaginationEl = ({ key, text, onClick, active }) => (
	<PaginationEl key={key} onClick={onClick} active={active}>
		{text}
	</PaginationEl>
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

const ToggleButton = styled.button`
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

const PaginationEl = styled.button`
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
