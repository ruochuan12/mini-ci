import Koa from 'koa';
import Router from '@koa/router';
import { resolveConfig, preview, upload } from '@ruochuan/mini-ci';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
// import { execSync } from 'node:child_process';
// import path from 'node:path';
// import fs from 'node:fs';

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(bodyParser());

router.get('/', (ctx, next) => {
	// ctx.router available
	ctx.body = '这里是主页';
});

router.get('/list', async (ctx, next) => {
	try {
		const configList = await resolveConfig({
			root: '../mini-ci/',
			useAllConfig: true,
		});
		ctx.body = {
			code: 200,
			data: configList,
			msg: '获取成功',
		};
	} catch (e) {
		ctx.body = {
			code: 500,
			data: e,
			msg: '获取失败',
		};
	}
});

router.get('/upload', async (ctx, next) => {
	const {
		body: { basename },
	} = ctx.request;
	// ctx.router available
	console.log('project', ctx.request, basename);
	// const result2 = execSync(
	// 	'node ./publish/index.js --notSelect --config ' + basename,
	// );
	const res = await upload('../mini-ci/', { dry: false });
	ctx.body = {
		code: 200,
		data: res,
		// data: result2.toString(),
		msg: '小程序上传成功',
	};
	// await next();
});

router.get('/preview', async (ctx, next) => {
	const {
		body: { basename },
	} = ctx.request;
	// ctx.router available
	console.log('project', ctx.request, basename);
	const res = await preview('../mini-ci/', { dry: false });
	ctx.body = {
		code: 200,
		data: res,
		// data: result2.toString(),
		msg: '小程序预览成功',
	};
	// await next();
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3002, () => {
	console.log('端口监听在3002');
});
