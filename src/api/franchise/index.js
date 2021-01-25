const Router = require('koa-router');
const franchise = new Router();

franchise.get('/', (ctx,next)=>{
    ctx.body = 'this is franchise route'
})

franchise.get('/detail',(ctx,next)=>{
    ctx.body = 'this is franchise-detail route'
});
franchise.get('/search',(ctx,next)=>{
    ctx.body = 'this is franchise-search route'
});
franchise.get('/show',(ctx,next)=>{
    ctx.body = 'this is franchise-show route'
});

module.exports = franchise;
