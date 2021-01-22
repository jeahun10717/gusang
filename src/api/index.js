const Router = require('koa-router');
const users = require('./users')
const newsale = require('./newsale');
const interior = require('./interior');
const franchise = require('./franchise');
const admin = require('./admin')

const api = new Router();

api.get('/', (ctx, next)=>{
    ctx.body = 'this is api page'
})

api.use('/users', users.routes());
api.use('/newsale', newsale.routes());
api.use('/interior', interior.routes());
api.use('/franchise', franchise.routes());
api.use('/admin', admin.routes());

module.exports = api;