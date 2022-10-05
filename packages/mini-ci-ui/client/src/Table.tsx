import { useEffect, useState } from 'react';
import { Table } from 'antd';
import './App.css';
import axios from 'axios';

function App() {
	const [list, setList] = useState([]);
	const columns = [
		{
			title: '小程序名称',
			dataIndex: 'name',
			key: 'name',
		},
		// {
		// 	title: '年龄',
		// 	dataIndex: 'age',
		// 	key: 'age',
		// },
		// {
		// 	title: '住址',
		// 	dataIndex: 'address',
		// 	key: 'address',
		// },
	];

	useEffect(() => {
		axios('http://localhost:3002/list')
			.then((res) => {
				console.log('res', res);
				setList(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<div className="App">
			<h2>mini-ci 小程序上传预览，在线可视化操作</h2>
			<Table dataSource={list} columns={columns}></Table>
		</div>
	);
}

export default App;
