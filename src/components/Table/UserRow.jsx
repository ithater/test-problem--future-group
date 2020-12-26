import React from 'react';
import styled, { css } from 'styled-components';


const UserRow = props => {
	const { user, setActiveUserInfo, activeUserInfo } = props;

	const onClick = () => {
		setActiveUserInfo(user);
	};

	return (
		<TableRow active={activeUserInfo === user} onClick={onClick}>
			<TableDataCell>{user.id}</TableDataCell>
			<TableDataCell>{user.firstName}</TableDataCell>
			<TableDataCell>{user.lastName}</TableDataCell>
			<TableDataCell>{user.email}</TableDataCell>
			<TableDataCell>{user.phone}</TableDataCell>
		</TableRow>

	);
};

const TableDataCell = styled.td`
	padding: 8px 10px;
	border: 2px solid gray;
`;

const TableRow = styled.tr`
	&:hover {
		background-color: #f1f1f1;
	}

	${({active}) => active && css`
		background-color: #d3d3d3;
		${TableDataCell} {
			font-weight: 600;
		}
	`}
`;

export default UserRow;
