import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';

const Pagination = props => {
	const {
		maxElemsPerPage,

		activePagination,
		setActivePagination,
		setActiveUserInfo,
		currentData,
		oneSide = 3,
	} = props;
	const togglePage = page => {
		setActivePagination(page);
		setActiveUserInfo(null);
	};

	const paginationLength = Math.ceil(currentData.length / maxElemsPerPage);

	// paginani это элемент пагинции. кнопочка (1) (2) .
	const paginanis = [];

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
		// вычисляем сколько элементов нам необходимо отобразить
		// в 1 части ((1) [левая activePagination правая] (последний элемент))
		
		const separator = oneSide;

		// делаем 1 элемент
		const theFirsthPaginani = createPaginani({
			key: 1,
			active: activePagination === 1,
			text: 1,
			onClick: () => togglePage(1),
		});
		paginanis.push(theFirsthPaginani);

		// делаем элементы по середине
		// вычисляем индекс первого элемента левой части
		let maxLeft = activePagination - separator;
		console.log('maxLeft: ', maxLeft);
		// вычисляем индекс последнего элемента правой части
		let maxRight = activePagination + separator;
		console.log('maxRight: ', maxRight);

		// делаем проверки на то, чтобы мы не перешли пороги
		// т.е. не дошли до <0 или до >максимального элемента
		if (maxLeft <= 1) {
			maxLeft = 2;
			maxRight = separator * 2;
		}
		if (maxRight >= paginationLength) {
			maxLeft = paginationLength - separator * 2;
			maxRight = paginationLength - 1;
			if (maxLeft <= 1) maxLeft = 2;
		}



		for (let i = maxLeft; i <= maxRight; i++) {
			// решаем должны ли вставлять (...) элемент
		
			const shouldBreakLeft = activePagination >= separator * 2 - 1;
			const shouldBreakRight = activePagination <= paginationLength - (separator * 2 - 1);
			// случай левой "поломки" (...)
			if (shouldBreakLeft && i === maxLeft) {
				const paginani = createPaginani({
					key: i,
					active: activePagination === i,
					text: '...',
					onClick: () => togglePage(i),
				});
				paginanis.push(paginani);
				continue;
			}

			// случай правой "поломки" (...)
			if (shouldBreakRight && i === maxRight) {
				const paginani = createPaginani({
					key: i,
					active: activePagination === i,
					text: '...',
					onClick: () => togglePage(i),
				});
				paginanis.push(paginani);
				continue;
			}



			const paginani = createPaginani({
				key: i,
				active: activePagination === i,
				text: i,
				onClick: () => togglePage(i),
			});
			paginanis.push(paginani);
		}

		// делаем последний элемент
		const theLastPaginani = createPaginani({
			key: paginationLength,
			active: activePagination === paginationLength,
			text: paginationLength,
			onClick: () => togglePage(paginationLength),
		});
		paginanis.push(theLastPaginani);
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
