const Router = require('koa-router');
const interior = new Router();

interior.get('/', (ctx,next)=>{
    ctx.body = 'this is interior route'
})

interior.get('/detail',(ctx,next)=>{
    ctx.body = 'this is interior-detail route'
});
interior.get('/search',(ctx,next)=>{
    ctx.body = 'this is interior-search route'
});
interior.get('/show',(ctx,next)=>{
    ctx.body = 'this is interior-show route'
});


module.exports = interior;
