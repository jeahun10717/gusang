const Router = require('koa-router');
const newsale = new Router();
const newSaleCtrl = require('./newSale.ctrl')

newsale
.get('/')       // pagenation 을 위한 라우트
.get('/detail') // 한개의 정보전체를 뿌려주는 라우트
.get('/search') // 검색 정렬을 위한 라우트
.get('/show')   // 
.post('/create', newSaleCtrl.create)
.post('/update')
.delete('/remove/:id', newSaleCtrl.delete)

module.exports = newsale;
