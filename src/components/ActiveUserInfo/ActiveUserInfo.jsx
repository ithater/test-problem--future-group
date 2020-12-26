import React from 'react';
import styled from 'styled-components';

const ActiveUserInfo = props => {
	const {
		activeUserInfo: {
			firstName,
			lastName,
			address: { streetAddress, city, state, zip },
			description,
		},
	} = props;

	return (
		<Container>
			<Item>
				Выбран пользователь{' '}
				<b>
					{firstName} {lastName}
				</b>
			</Item>

			<Item>
				Описание:
				<Description value={description}/>
			</Item>

			<Item>
				Адрес проживания: <b>{streetAddress}</b>
			</Item>

			<Item>
				Город: <b>{city}</b>
			</Item>

			<Item>
				Провинция/штат: <b>{state}</b>
			</Item>

			<Item>
				Индекс: <b>{zip}</b>
			</Item>
		</Container>
	);
};

const Container = styled.div`
	background-color: #f6f8fa;
	display: flex;
	flex-direction: column;

	padding: 20px;
	max-width: 800px;
	margin: auto;
	border-radius: 10px;
`;

const Item = styled.span`
	color: #4d535a;
	font-size: 18px;
	&:not(:last-child) {
		margin-bottom: 15px;
	}
`;

const Description = styled.textarea.attrs({ readOnly: 'readonly' })`
	display: block;
	padding: 10px;
	margin-top: 5px;
	width: 100%;
	min-width: 200px;
	min-height: 100px;
	max-height: 500px;
	resize: vertical;
`;

export default ActiveUserInfo;
