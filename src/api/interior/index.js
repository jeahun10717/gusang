const Router = require('koa-router');
const interior = new Router();
const interiorCtrl = require('./interior.ctrl.js')

interior
.get('/')       // pagenation 을 위한 라우트
.get('/detail/:id', interior.detail) // 한개의 정보전체를 뿌려주는 라우트
.get('/search/:input', interior.search) // 검색 정렬을 위한 라우트
.get('/show/:type/:pagenum', interior.pagenate)   // 15개씩 보여주는 페이지를 위한 페이지네이션 포함 라우트
.post('/create', interior.create)
.post('/update/:type/:id')
.delete('/remove/:id', interior.delete)

module.exports = interior;
