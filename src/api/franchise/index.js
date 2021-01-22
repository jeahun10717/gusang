const Router = require('koa-router');
const franchise = new Router();

franchise.get('/', (ctx,next)=>{
    ctx.body = 'this is franchise page'
})

module.exports = franchise;
