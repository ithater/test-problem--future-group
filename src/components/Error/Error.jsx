import React from 'react';
import styled from 'styled-components';

const Error = props => {
	const { error } = props;
	
	console.log('error: ', error);

	return (
		<ErrorWrapper>
			<ErrorDialog>
				<ErrorTitle>Ууупс... Кажется что-то пошло не так...</ErrorTitle>
				<ErrorText>{error}</ErrorText>
			</ErrorDialog>
		</ErrorWrapper>
	);
};

const ErrorWrapper = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 100%;

	background-color: #333333;
`;

const ErrorDialog = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 80px;
	max-width: 1000px;
	margin: auto;
	
`;

const ErrorTitle = styled.h2`
	font-size: 58px;
	max-width: 800px;
	line-height: 70px;
	color: #ee4e4e;
	text-align: center;
	margin-bottom: 25px;
`;

const ErrorText = styled.p`
	font-size: 24px;
	line-height: 30px;
	color: #ee4e4e;
`;

export default Error;
