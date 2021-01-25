const Router = require('koa-router');
const admin = new Router();

admin.get('/', (ctx,next)=>{
    ctx.body = 'this is admin route'
})

module.exports = admin;
