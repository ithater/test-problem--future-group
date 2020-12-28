import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { v4 as generateKey } from 'uuid';

import Spinner from '@components/Spinner/Spinner';

const SMALL__DATA__URL =
	'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
const BIG__DATA__URL =
	'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';

// redirect на /home выполнен путем history.push('/home');
// а не через компопнент Link поскольку после перезагрузки
// страницы с таблицей (/home), данные с пользователями будут null.

// Нам нужно делать redirect на главную, для выбора типа загрузки данных.
// {userData ? <Home userData={userData}/> : <Redirect to="/" />}

// Компонент Link делает редирект на /home раньше чем
// мы получим данные и положим в userData, из-за чего
// мы вернемся в "/".

// Если делать проверку сразу после Switch
// {userData && <Redirect exact from="/" to="/home" />}
// То мы не сможем вернутся назад в "/".

// history.push('/home') же мы делаем после того, как получим данные

const Choice = props => {
	const { setUserData, setError } = props;
	const [spinner, setSpinner] = useState(false);
	const history = useHistory();
	// подтягиваем данные и заносим в state,
	// параллельно включаем spinner

	const fetchData = async url => {
		try {
			// запускаем спинер загрузки
			setSpinner(true);
			const response = await fetch(url);

			if (response.status !== 200) {
				throw new Error(`An error has occured: ${response.status}`);
			}
			const responseData = await response.json();
			// добавляем key для каждого элемента
			responseData.forEach(item => (item.__key__ = generateKey()));

			// сохраняем данные, делаем редирект, выключем спинер
			setUserData(responseData);
			setSpinner(false);
			history.push('/home');
		} catch (error) {
			setSpinner(false);
			setError(error.message);
			console.error(error);
		}
	};

	return (
		<Container>
			{spinner && <Spinner />}
			<Content>
				<Title>Выберите объём данных, который вы хотите загрузить.</Title>
				<Holder>
					<ChoiceButton onClick={() => fetchData(SMALL__DATA__URL)}>
						Маленький
					</ChoiceButton>
					<ChoiceButton onClick={() => fetchData(BIG__DATA__URL)}>
						Большой
					</ChoiceButton>
				</Holder>
			</Content>
		</Container>
	);
};

const Container = styled.div`
	padding: 50px 0;
`;

const Content = styled.div`
	margin: 100px auto 0;
	padding: 50px;
	max-width: 600px;
	border-radius: 10px;
	background-color: #f6f8fa;
`;

const Holder = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Title = styled.h2`
	margin-bottom: 50px;
	text-align: center;
	font-size: 40px;
	line-height: 50px;
	color: #4d535a;
`;

const ChoiceButton = styled.button`
	padding: 15px 20px;
	font-size: 30px;
	line-height: 48px;
	font-weight: 700;
	background-color: #07c4fd;
	text-decoration: none;
	border-radius: 8px;
	color: #fbfdff;

	border: none;
	outline: none;
`;

export default Choice;
