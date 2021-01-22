const Router = require('koa-router');
const interior = new Router();

interior.get('/', (ctx,next)=>{
    ctx.body = 'this is interior page'
})

module.exports = interior;
