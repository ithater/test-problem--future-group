import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import Input from './Input';

import { v4 as generateKey } from 'uuid';


const ModalForm = props => {
	const {
		modalForm,
		setModalForm,
		modalFormRef,
		sortedUserData,
		setSortedUserData,
		maxElemsPerPage,
		activePagination,
	} = props;
	const [formData, setFormData] = useState({});
	const isDisabled = !Object.entries(formData).every(([key, val]) => {
		return val.trim() !== '';
	});

	const onSubmit = evt => {
		evt.preventDefault();
		if (isDisabled) return;

		const user = {...formData, __key__: generateKey()}
		const indexToAdd = activePagination * maxElemsPerPage - maxElemsPerPage;
		const newSortedData = [...sortedUserData];
		newSortedData.splice(indexToAdd, 0, user);

		setSortedUserData(newSortedData);
		setModalForm(false);
		clearFormData();
	};

	const clearFormData = () => {
		const newFormData = {};
		for (let key in formData) {
			newFormData[key] = '';
		}
		setFormData(newFormData);
	};

	return (
		<Form onSubmit={onSubmit} ref={modalFormRef} active={modalForm}>
			<Title>Добавить ряд</Title>
			<Table_>
				<thead>
					<tr>
						<HeadCell>
							<label htmlFor="id">id</label>
						</HeadCell>
						<HeadCell>
							<label htmlFor="firstName">firstName</label>
						</HeadCell>
						<HeadCell>
							<label htmlFor="lastName">lastName</label>
						</HeadCell>
						<HeadCell>
							<label htmlFor="email">email</label>
						</HeadCell>
						<HeadCell>
							<label htmlFor="phone">phone</label>
						</HeadCell>
					</tr>
				</thead>
				<tbody>
					<tr>
						<DataCell>
							<Input
								state={formData}
								setState={setFormData}
								name="id"
								type="number"
							/>
						</DataCell>
						<DataCell>
							<Input
								state={formData}
								setState={setFormData}
								name="firstName"
								type="text"
							/>
						</DataCell>
						<DataCell>
							<Input
								state={formData}
								setState={setFormData}
								name="lastName"
								type="text"
							/>
						</DataCell>
						<DataCell>
							<Input
								state={formData}
								setState={setFormData}
								name="email"
								type="text"
							/>
						</DataCell>
						<DataCell>
							<Input
								state={formData}
								setState={setFormData}
								name="phone"
								type="text"
							/>
						</DataCell>
					</tr>
				</tbody>
			</Table_>
			<AddToTable disabled={isDisabled}>Добавить в таблицу</AddToTable>
		</Form>
	);
};

const Title = styled.h2`
	margin-bottom: 20px;
`;

const AddToTable = styled.button.attrs({ type: 'submit' })`
	padding: 10px;
	border-radius: 8px;
	background-color: #86f0af;
	border: none;
	outline: none;
	font-size: 24px;
	line-height: 36px;

	${({ disabled }) =>
		disabled &&
		css`
			background-color: #808080;
		`}
`;

const Form = styled.form`
	position: absolute;
	z-index: 100;
	top: 100px;
	left: 50%;
	transform: translate(-50%, calc(-100% - 120px));
	transition: 0.3s;
	display: flex;
	flex-direction: column;
	width: 800px;
	padding: 50px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	border-radius: 8px;
	background-color: #fff;

	${({ active }) =>
		active &&
		css`
			transform: translate(-50%, 0%);
		`}
`;

const Table_ = styled.table`
	border-collapse: collapse;
	border: 2px solid gray;
	margin-bottom: 20px;
`;

const DataCell = styled.td`
	padding: 0;
	border: 2px solid gray;
`;

const HeadCell = styled.th`
	padding: 7px 10px;
	border: 2px solid gray;
	cursor: pointer;
	label {
		cursor: pointer;
	}
`;

export default ModalForm;
