const db = require('../db');

exports.insert = async(query)=>{
    return await db.query('insert into newSale set ?', query)
}


exports.show = async(id) => {
    return await db.query('select * from newSale where id = ?', id);
}

exports.update = async(id)=>{
    return await db.query('update newSale set ? where id = ?', id);
}

exports.delete = async(id)=>{
    return await db.query('delete from newSale where id = ?', id)
} 

// 최신순으로 정렬
exports.pageByNew = async(page, contents) =>{
    return await db.query(`select * from newSale order by id desc limit ? offset ?`
    ,[contents, page * contents])
}
// 조회수순으로 정렬
exports.pageByView = async(page, contents) =>{
    return await db.query(`select * from newSale order by views desc limit ? offset ?`
    ,[contents, page * contents])
}
