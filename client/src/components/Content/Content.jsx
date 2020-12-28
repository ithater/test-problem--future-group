import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Table from '@components/Table/Table';

const Content = props => {
	const {
		currentData,
		setCurrentData,
		setSpinner,
		setModalForm,
		activeUserInfo,
		setActiveUserInfo,
		pageData,
		contentType,
		shouldSort
	} = props;


	return (
		<>
			{contentType === 'commonData' && (
				<Table
					currentData={currentData}
					setCurrentData={setCurrentData}
					setSpinner={setSpinner}
					setModalForm={setModalForm}
					activeUserInfo={activeUserInfo}
					setActiveUserInfo={setActiveUserInfo}
					pageData={pageData}
					contentType={contentType}
				/>
			)}

			{contentType === 'searchedData' &&
				(pageData.length === 0 ? (
					<NotFound>По вашему запросу ничего не найдено</NotFound>
				) : (
					<Table
						currentData={currentData}
						setCurrentData={setCurrentData}
						setSpinner={setSpinner}
						setModalForm={setModalForm}
						activeUserInfo={activeUserInfo}
						setActiveUserInfo={setActiveUserInfo}
						pageData={pageData}
						contentType={contentType}
						shouldSort={shouldSort}
					/>
				))}
		</>
	);
};

const NotFound = styled.h2`
	margin-top: 50px;
	font-size: 30px;
	line-height: 38px;
`;

export default Content;
