const Router = require('koa-router');
const newsale = new Router();

newsale.get('/', (ctx,next)=>{
    ctx.body = 'this is newsale page'
})

module.exports = newsale;
