import React, { useEffect } from 'react';
import styled from 'styled-components';

const Input = props => {
	const { state, setState, name, type } = props;

	useEffect(() => {
		const inputData = {};
		inputData[name] = '';

		setState(prev => ({
			...prev,
			...inputData,
		}));
	}, []);

	const onChange = evt => {
		const inputData = {};
		inputData[evt.target.name] = evt.target.value;
		setState({ ...state, ...inputData });
	};

	return (
		<InputHolder>
			<input
				placeholder={name}
				name={name}
				id={name}
				value={state[name] || ''}
				onChange={onChange}
				type={type}
			/>
		</InputHolder>
	);
};

const InputHolder = styled.span`
	display: block;
	height: 36px;
	input {
		width: 100%;
		height: 100%;
		padding: 2px 5px;
		transition: 0.3s;
		border: none;
		outline: none;

		&:focus {
			box-shadow: 0 0 0 2px #2e8bc9;
		}
	}
`;

export default Input;
