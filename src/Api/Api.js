import Helper from '@/Api/Helper'
import Bmob from '@/libs/key'


export default {
    /**
     * [getFlightList 获取机票列表]
     * @Author    zy
     * @DateTime  2018-05-06
     * @copyright [copyright]
     * @license   [license]
     * @version   [version]
     * @param     {[type]}    params   [depCity: 广州
            arrCity: 三亚
            depDate: 2018-05-09
            arrDate: 2018-05-09
            queryModule: 1
            lineType: OW
            queryType: jipiaoindexquery
            queryuuid: a280f0f4e9534578a472d57c6da5b5711831168571525606776988
            uniqueKey: 
            sourceId: 
            arrTime: ]
     * @param     {[type]}    response [description]
     * @return    {[type]}             [description]
     */
    getFlightList: function (params, response) {
//      var url = 'http://jipiao.jd.com/search/queryFlight.action';         //电脑演示会出现跨域问题
           var url = '/search/queryFlight.action';
        Helper.get(url, params, response);
    },
    /**
     * [getWeekLowPrice 获取当前时间前后三天的一周的最低价信息]
     * @Author    zy
     * @DateTime  2018-05-06
     * @copyright [copyright]
     * @license   [license]
     * @version   [version]
     * @param     {[type]}    params   [depCity: 广州
            arrCity: 三亚
            depDate: 2018-05-09
            flag: ]
     * @param     {[type]}    response [description]
     * @return    {[type]}             [description]
     */
    getWeekLowPrice: function(params, response) {
        var url = '/ajaxTicket/weeklowprice.action';
        Helper.get(url, params, response);
    },

    /**
     * @description 查询搜索历史
     */
    getQueryFlightHistory: function (params, response) {
        var url = '/search/getQueryFlightHistory.action';
        Helper.get(url, params, response);
    },

    /**
     * @description 查询次数过多需要校验验证码
     */
    checkAuth: function (params, response) {
        var url = '/captcha/checkAuth.action';
        Helper.post(url, params, response);
    },

    /**
     * @description 获取个人信息
     */
    getUserInfo: function (url, params, response) {
        Helper.get(url, params, response);
    },

   /**
    * [saveUserInfo 保存用户信息,注册]
    * @Author    zy
    * @DateTime  2018-05-09
    * @copyright [copyright]
    * @license   [license]
    * @version   [version]
    * @param     {[type]}    params   [description]
    * @param     {Function}  callback [description]
    * @return    {[type]}             [description]
    */
    saveUserInfo: function (params, callback) {
        var db = new Bmob.Db;
        db.insert({
            'table': 'UserInfo',
            'data': params
        }, function(err, obj) {
            callback(err, obj);
        })
    },

    /**
     * [updateUserInfo 修改个人信息]
     * @Author    zy
     * @DateTime  2018-05-09
     * @copyright [copyright]
     * @license   [license]
     * @version   [version]
     * @param     {[type]}    params   [description]
     * @param     {Function}  callback [description]
     * @return    {[type]}             [description]
     */
    updateUserInfo: function (params, callback) {
        var db = new Bmob.Db;
        db.update({
            'table': 'UserInfo',
            'data': params
        }, function(err, obj) {
            callback(err, obj);
        })
    },

    checkPhoneNumber: function(phoneNumber, callback) {
        var db = new Bmob.Db;
        db.find({
            'table': 'UserInfo',
            where: {phoneNumber: phoneNumber}
        }, function(err, obj) {
            callback(err, obj);
        })
    },

    /**
     * [saveFavoriteFlight 保存关注航班]
     * @Author    zy
     * @DateTime  2018-05-09
     * @copyright [copyright]
     * @license   [license]
     * @version   [version]
     * @param     {[type]}    params   [description]
     * @param     {Function}  callback [description]
     * @return    {[type]}             [description]
     */
    saveFavoriteFlight: function (params, callback) {
        var db = new Bmob.Db;
        db.insert({
            'table': 'FavoriteFlights',
            'data': params
        }, function(err, obj) {
            callback(err, obj);
        })
    },

    findFavoriteFlights: function (params,flightNo, depDate, depTime, callback) {
        var db = new Bmob.Db;
        db.find({
            'table': 'FavoriteFlights',
            where: {flightNo: flightNo,depDate: depDate, depTime: depTime}
        }, function(err, obj) {
            callback(err, obj);
        })
    },

    findAllFavoriteFlights: function (callback) {
        var db = new Bmob.Db;
        db.find({
            'table': 'FavoriteFlights',
        }, function(err, obj) {
            callback(err, obj);
        })
    },

    deleteFavoriteFlight: function (objectId, callback) {
        var db = new Bmob.Db;
        db.remove({
            'table': 'FavoriteFlights',
            'objectId': objectId
        }, function(err, obj) {
            callback(err, obj);
        })
    },

    login: function (phone, callback) {
        var db = new Bmob.Db;
        db.find({
            'table': 'UserInfo',
            'where': {'phoneNumber':phone}
        }, function(err, obj) {
            callback(err, obj);
        })
    },

    /**
     * [sendMessage 发送短信验证码]
     * @Author    zy
     * @DateTime  2018-05-16
     * @copyright [copyright]
     * @license   [license]
     * @version   [version]
     * @param     {[type]}    phone    [description]
     * @param     {Function}  callback [description]
     * @return    {[type]}             [description]
     */
    sendMessage: function (phone, authCode, callback) {
        var api = "http://v.juhe.cn/sms/send?";
        Helper.get(api, {mobile: phone, tpl_id: 79683, tpl_value: '%23code%23%3d' + authCode,dtype: 'json', key: '8f681aa0c7a3382e47cb460c4a92e995'}, callback);
    }


}