import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import ModalForm from '@components/ModalForm/ModalForm';
import Table from '@components/Table/Table';
import ActiveUserInfo from '@components/ActiveUserInfo/ActiveUserInfo';
import Pagination from '@components/Pagination/Pagination';

import Spinner from '@components/Spinner/Spinner';
import Search from '@components/Search/Search';

const Home = props => {
	const { userData } = props;
	const [sortedUserData, setSortedUserData] = useState(userData);
	const [searchedData, setSearchedData] = useState(null);
	const [activeUserInfo, setActiveUserInfo] = useState(null);

	const [activePagination, setActivePagination] = useState(1);
	
	const [spinner, setSpinner] = useState(false);
	const [modalForm, setModalForm] = useState(false);
	const modalFormRef = useRef(null);

	const maxElemsPerPage = 50;
	const paginationLength = Math.ceil(sortedUserData.length / maxElemsPerPage) || 1;

	const closeModalFrom = evt => {
		if (
			evt.target.contains(modalFormRef.current) &&
			evt.target !== modalFormRef.current
		) {
			setModalForm(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', closeModalFrom);
		return () => document.removeEventListener('click', closeModalFrom);
	}, []);

	return (
		<Container>
			<Spinner spinner={spinner} />

			<Search />

			<ModalForm
				modalFormRef={modalFormRef}
				modalForm={modalForm}
				setModalForm={setModalForm}
				activePagination={activePagination}
				sortedUserData={sortedUserData}
				setSortedUserData={setSortedUserData}
				maxElemsPerPage={maxElemsPerPage}
			/>
			
			<Table
				activePagination={activePagination}
				maxElemsPerPage={maxElemsPerPage}
				setActiveUserInfo={setActiveUserInfo}
				activeUserInfo={activeUserInfo}
				setSpinner={setSpinner}
				setModalForm={setModalForm}
				sortedUserData={sortedUserData}
				setSortedUserData={setSortedUserData}
			/>

			{activeUserInfo && <ActiveUserInfo activeUserInfo={activeUserInfo} />}

			<Pagination
				activePagination={activePagination}
				setActivePagination={setActivePagination}
				paginationLength={paginationLength}
				setActiveUserInfo={setActiveUserInfo}
			/>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 100px 0 0;
	max-width: 1200px;
	margin: auto;
`;

export default Home;
