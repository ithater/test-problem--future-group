import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import ModalForm from '@components/ModalForm/ModalForm';
import ActiveUserInfo from '@components/ActiveUserInfo/ActiveUserInfo';
import Pagination from '@components/Pagination/Pagination';

import Spinner from '@components/Spinner/Spinner';
import Search from '@components/Search/Search';
import Content from '@components/Content/Content';

const Home = props => {
	const { userData, setUserData } = props;
	const [currentData, setCurrentData] = useState(userData);
	const [pageData, setPageData] = useState([]);
	const [activeUserInfo, setActiveUserInfo] = useState(null);
	const [activePagination, setActivePagination] = useState(1);
	const [spinner, setSpinner] = useState(false);
	const [modalForm, setModalForm] = useState(false);
	const [contentType, setContentType] = useState('commonData');
	const [shouldSort, setShouldSort] = useState(0);

	const modalFormRef = useRef(null);
	const maxElemsPerPage = 50;

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

			<Search
				userData={userData}

				currentData={currentData}
				setCurrentData={setCurrentData}

				contentType={contentType}
				setContentType={setContentType}

				setActivePagination={setActivePagination}
				
				setActiveUserInfo={setActiveUserInfo}

				setShouldSort={setShouldSort}
			/>

			<ModalForm
				modalFormRef={modalFormRef}
				modalForm={modalForm}
				setModalForm={setModalForm}

				activePagination={activePagination}

				userData={userData}
				setUserData={setUserData}

				setCurrentData={setCurrentData}

				maxElemsPerPage={maxElemsPerPage}
			/>

			<Content
				currentData={currentData}
				setCurrentData={setCurrentData}
				setSpinner={setSpinner}
				setModalForm={setModalForm}
				activeUserInfo={activeUserInfo}
				setActiveUserInfo={setActiveUserInfo}
				pageData={pageData}
				contentType={contentType}
				setContentType={setContentType}
				shouldSort={shouldSort}
			/>

			{activeUserInfo && <ActiveUserInfo activeUserInfo={activeUserInfo} />}

			<Pagination
				currentData={currentData}
				maxElemsPerPage={maxElemsPerPage}
				activePagination={activePagination}
				setActivePagination={setActivePagination}
				setActiveUserInfo={setActiveUserInfo}
				pageData={pageData}
				setPageData={setPageData}
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

