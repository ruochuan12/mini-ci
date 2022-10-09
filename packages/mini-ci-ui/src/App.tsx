import { useEffect, useState } from 'react';
import { message, Space, Table } from 'antd';
import './App.css';
import axios2 from 'axios';
import 'antd/dist/antd.css';

const axios = axios2.create({
	baseURL: 'http://localhost:3002',
});

function App() {
	const [list, setList] = useState([]);
	const handleUpload = (record) => {
		console.log('handleUpload', record);
		axios('/upload')
			.then((res) => {
				if (res.status === 200) {
					if (res.data.code === 200) {
						message.success(res.data.msg);
					} else {
						message.error(res.data.msg);
					}
				}
			})
			.catch((err) => {
				message.error(err.data.msg);
			});
	};
	const handlePreview = (record) => {
		console.log('handlePreview', record);
		axios('/preview')
			.then((res) => {
				if (res.status === 200) {
					if (res.data.code === 200) {
						message.success(res.data.msg);
					} else {
						message.error(res.data.msg);
					}
				}
			})
			.catch((err) => {
				message.error(err.data.msg);
			});
	};

	const columns = [
		{
			title: 'id',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: '小程序名称',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '版本号',
			dataIndex: 'uploadOptions',
			key: 'uploadOptions',
			render: (record) => {
				console.log('record', record);
				return <div>{record.version}</div>;
			},
		},
		{
			title: '版本描述',
			dataIndex: 'uploadOptions',
			key: 'uploadOptions',
			render: (record) => {
				console.log('record', record);
				return <div>{record.desc}</div>;
			},
		},
		{
			title: '项目配置',
			dataIndex: 'projectOptions',
			key: 'projectOptions',
			render: (record) => {
				const item = JSON.stringify(record);
				return <div title={item}>{item?.slice(0, 30)}</div>;
			},
		},
		{
			title: '上传配置',
			dataIndex: 'uploadOptions',
			key: 'uploadOptions',
			render: (record) => {
				const item = JSON.stringify(record);
				return <div title={item}>{item?.slice(0, 30)}</div>;
			},
		},
		{
			title: '预览配置',
			dataIndex: 'previewOptions',
			key: 'previewOptions',
			render: (record) => {
				const item = JSON.stringify(record);
				return <div title={item}>{item?.slice(0, 30)}</div>;
			},
		},
		{
			title: '操作',
			key: 'action',
			width: 120,
			render: (record) => (
				<Space size="middle">
					<a onClick={() => handleUpload(record)}>上传</a>
					<a onClick={() => handlePreview(record)}>预览</a>
				</Space>
			),
		},
	];
	useEffect(() => {
		axios('/list')
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
			<h2>
				<a href="http://github.com/lxchuan12/mini-ci" target="_blank">
					mini-ci
				</a>
				小程序上传预览，在线可视化操作 by@若川
			</h2>
			<Table
				dataSource={list}
				columns={columns}
				bordered
				size="small"
			></Table>
		</div>
	);
}

export default App;
