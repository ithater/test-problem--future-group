import React, { useState } from 'react';

// styled-components - достаточно удобное средство стилизации
// поскольку удобно пользоваться props и делать код более выраженным.

// react-router-dom - средство роутинга
// Удобное логирование.

import GlobalStyle from './GlobalStyle';

import Error from './components/Error/Error';
import Choice from './components/Choice/Choice';
import Home from './components/Home/Home';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

const App = () => {
	const [userData, setUserData] = useState(null);
	const [error, setError] = useState(null);

	return (
		<>
			<GlobalStyle />{' '}
			<Router>
				<Switch>
					{error && <Redirect exact from="/" to="/error" />}

					<Route exact path="/">
						<Choice setUserData={setUserData} setError={setError} />
					</Route>

					<Route exact path="/error">
						{error ? <Error error={error} /> : <Redirect to="/" />}
					</Route>

					<Route exact path="/home">
						{userData ? <Home userData={userData} /> : <Redirect to="/" />}
					</Route>
				</Switch>
			</Router>
		</>
	);
};

export default App;
