const Router = require('koa-router');
const interior = new Router();
const interiorCtrl = require('./interior.ctrl.js')

interior
.get('/')
.get('/detail/:id', interiorCtrl.detail) // 한개의 정보전체를 뿌려주는 라우트
.get('/search/:input/:pagenum', interiorCtrl.search) // 검색 정렬을 위한 라우트 + 페이지네이션
.get('/show/:type/:pagenum', interiorCtrl.pagenate)   // 15개씩 보여주는 페이지를 위한 페이지네이션 포함 라우트
.post('/create', interiorCtrl.create)
.post('/update/:id/:type', interiorCtrl.update)
.delete('/remove/:id', interiorCtrl.delete)

module.exports = interior;
