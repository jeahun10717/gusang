const Router = require('koa-router');
const newsale = new Router();
const newSaleCtrl = require('./newSale.ctrl')

newsale
.get('/')       // pagenation 을 위한 라우트
.get('/detail/:id', newSaleCtrl.detail) // 한개의 정보전체를 뿌려주는 라우트
.get('/search/:input', newSaleCtrl.search) // 검색 정렬을 위한 라우트
.get('/show/:type/:pagenum', newSaleCtrl.pagenate)   // 15개씩 보여주는 페이지를 위한 페이지네이션 포함 라우트
.post('/create', newSaleCtrl.create)
.post('/update/:type/:id')
.delete('/remove/:id', newSaleCtrl.delete)

module.exports = newsale;
