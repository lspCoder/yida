import Bmob from 'Bmob'

Bmob.initialize("98427cdfa489eaeb7de1442ec573d673", "7ae7c103708b0c4ec3e194376d8a5bc6");

export default Bmob;


/**
 * @todo method for find,access db.
 * @param options
 * @memo options include:
 * {
 * 'table':XXX,             #表名
 * 'keys':'a,b,c',          #返回字段列表，多个字段用,分隔
 * 'where':{a:10},        #查询条件是一个object
 * 'order':'-a,b',          #排序列表，[-]字段名称,-表示降序，默认为升序
 * 'limit':10,              #limit大小，一页返回多少条记录，默认为0
 * 'skip':2,                #skip,分页offset，(page-1)*limit
 * 'count':1                #count,只返回符合条件的记录总数，不返回记录。
 * }
 * @param fn 回调函数
 * fn(err,data)
 */
