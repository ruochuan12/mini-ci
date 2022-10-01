const Koa = require('koa');
const Router = require('@koa/router');
const path = require('path');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const { execSync } = require('child_process');
const fs = require('fs');

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(bodyParser());

router.get('/', (ctx, next) => {
	// ctx.router available
	ctx.body = '这里是主页';
});

router.post('/upload', (ctx, next) => {
	const {
		body: { basename },
	} = ctx.request;
	// ctx.router available
	console.log('project', ctx.request, basename);
	const result2 = execSync(
		'node ./publish/index.js --notSelect --config ' + basename,
	);
	ctx.body = {
		code: 1,
		// data: body,
		data: result2.toString(),
		msg: '上传成功',
	};
	// await next();
});

router.get('/list', (ctx, next) => {
	// ctx.router available
	const path2 = path.join(process.cwd(), '../../src/config');
	const configDir = fs.readdirSync(path2);
	const config = configDir.map((el) => {
		const json = require(path2 + '/' + el);
		return {
			...json,
			basename: el,
			appid: json.appid,
			url: json.url || '-',
			name: json.name || '-',
		};
	});
	ctx.body = {
		code: 1,
		data: config,
		msg: '获取成功',
	};
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3002, () => {
	console.log('端口监听在3002');
});
