import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const Search = props => {
	const {} = props;
	const [searchQuery, setSearchQuery] = useState('');
	const isDisabled = searchQuery.trim() === '';

	const onChange = evt => setSearchQuery(evt.target.value);
	const onClick = () => {
		console.log(25);
	}

	return (
		<Wrapper>
			<Input value={searchQuery} onChange={onChange} type="text" />

			<Find onClick={onClick} disabled={isDisabled}>Найти</Find>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
`;

const Input = styled.input`
	margin-right: 25px;
	padding: 0 10px;
	width: 500px;
	min-height: 36px;
	border-radius: 4px;
	border: 1px solid #333333;
	outline: none;
	transition: 0.3s;
	&:focus {
		border-color: transparent;
		box-shadow: 0 0 0 2px #2e8bc9;
	}
`;

const Find = styled.button`
	padding: 10px;
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

export default Search;
