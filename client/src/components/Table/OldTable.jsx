import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import TableHeadCell from './TableHeadCell';
import UserRow from './UserRow';

import qSort from '@components/Functions/qSort';

// Компонент таблицы
const Table = props => {
	const {
		userData,
		activePagination,
		maxElemsPerPage,
		setActiveUserInfo,
		activeUserInfo,
		setSpinner,
		setModalForm,
		sortedUserData,
		setSortedUserData,
	} = props;
	const [sortType, setSortType] = useState('increase');
	const [sortValue, setSortValue] = useState('id');

	useEffect(() => {
		setSpinner(true);
		const newSortedUserData = qSort(sortedUserData, sortValue, sortType);
		setSortedUserData(newSortedUserData);
		setSpinner(false);
	}, [sortType, sortValue]);

	const pageData =
		sortedUserData &&
		sortedUserData.slice(
			activePagination * maxElemsPerPage - maxElemsPerPage,
			activePagination * maxElemsPerPage
		);

	// поля, которые будут отображаться в title (th)
	const headerTitles = [
		{ sortValueName: 'id', text: 'ID' },
		{ sortValueName: 'firstName', text: 'First name' },
		{ sortValueName: 'lastName', text: 'Last name' },
		{ sortValueName: 'email', text: 'Email' },
		{ sortValueName: 'phone', text: 'Phone' },
	];

	return (
		<Wrapper>
			{pageData && (
				<>
					<AddUser onClick={() => setModalForm(true)}>Добавить</AddUser>
					<Table_>
						<thead>
							<tr>
								{headerTitles.map(({ sortValueName, text }) => (
									<TableHeadCell
										key={sortValueName}
										text={text}
										sortValueName={sortValueName}
										sortValue={sortValue}
										sortType={sortType}
										setSortType={setSortType}
										setSortValue={setSortValue}
									/>
								))}
							</tr>
						</thead>

						<tbody>
							{pageData.map(user => {
								const key = user.__key__;
								return (
									<UserRow
										key={key}
										user={user}
										activeUserInfo={activeUserInfo}
										setActiveUserInfo={setActiveUserInfo}
									/>
								);
							})}
						</tbody>
					</Table_>
				</>
			)}
		</Wrapper>
	);
};

const Table_ = styled.table`
	border-collapse: collapse;
	border: 2px solid gray;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 40px 0;
`;

const AddUser = styled.button`
	align-self: flex-end;
	padding: 10px;
	margin-bottom: 15px;
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

export default Table;
