/**
 * config
 */

var path = require('path');

var config = {
    // debug 为 true 时，用于本地调试
    debug: true,

    get mini_assets() { return !this.debug; }, // 是否启用静态文件的合并压缩，详见视图中的Loader

    name: 'Nodeclub',

    site_static_host: '', // 静态文件存储域名
    // 社区的域名
    // host: '192.168.137.19',
    host: '172.26.164.243',
    // host: 'localhost',

    // mysql 配置
    mysqldb : {
        host : 'localhost',
        user : 'root',
        password : '5928',
        database : 'nodejs'
    },

    // redis 配置，默认是本地
    redis_host: '127.0.0.1',
    redis_port: 6379,
    redis_db: 0,
    redis_password: '',

    // 程序运行的端口
    port: process.env.port || '3000',

    // 话题列表显示的话题数量
    list_topic_count: 20,

    // RSS配置
    rss: {
        title: 'CNode：Node.js专业中文社区',
        link: 'http://cnodejs.org',
        language: 'zh-cn',
        description: 'CNode：Node.js专业中文社区',
        //最多获取的RSS Item数量
        max_rss_items: 50
    },

    log_dir: path.join(__dirname, 'logs'),

    // admin 可删除话题，编辑标签。把 user_login_name 换成你的登录名
    admins: { user_login_name: true },
    // 是否允许直接注册（否则只能走 github 的方式）
    allow_sign_up: true,

    session_secret: 'node_chat_secret',
    auth_cookiename: 'node_chat',
};


module.exports = config;
