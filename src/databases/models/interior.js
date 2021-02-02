const db = require('../db');

exports.insert = async()=>{
    return await db.query('insert into newSale set ?', query);
}