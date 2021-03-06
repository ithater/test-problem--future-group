import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import ModalForm from '@components/ModalForm/ModalForm';
import ActiveUserInfo from '@components/ActiveUserInfo/ActiveUserInfo';
import Pagination from '@components/Pagination/Pagination';

import Search from '@components/Search/Search';
import Content from '@components/Content/Content';

const Home = props => {
	const { userData, setUserData } = props;
	const [currentData, setCurrentData] = useState(userData);
	const [pageData, setPageData] = useState([]);
	const [activeUserInfo, setActiveUserInfo] = useState(null);
	const [activePagination, setActivePagination] = useState(1);
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

	// добавляем обработчик для закрытия формы
	useEffect(() => {
		document.addEventListener('click', closeModalFrom);
		return () => document.removeEventListener('click', closeModalFrom);
	}, []);

	// когда меняется пагинация  или текущий массив с данными,
	// меняем данные, которые использует талбица
	useEffect(() => {
		const trimStart = (activePagination - 1) * maxElemsPerPage;
		const trimEnd = trimStart + maxElemsPerPage;
		const newPageData = currentData && currentData.slice(trimStart, trimEnd);

		setPageData(newPageData);
	}, [activePagination, currentData]);

	// когда меняется пагинация, скролим вверх
	useEffect(() => {
		setActiveUserInfo(null);
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, [activePagination]);

	return (
		<Container>
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
				dataLength={currentData.length}
				maxElemsPerPage={maxElemsPerPage}
				activePagination={activePagination}
				setActivePagination={setActivePagination}
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
