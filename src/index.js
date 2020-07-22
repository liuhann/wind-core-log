const LogSerivce = require('./log_service');
name = require('../package.json').name,
version = require('../package.json').version,
description = require('../package.json').description;
module.exports = {
    name,
    version,
    description,

    // 模块初始化动作，对于核心模块可以进行koa相关插件注册
    // 业务模块可以进行服务创建
    async created(app) {
        const logSerivce = new LogSerivce(app.config.log4js || {
            appenders: {
                out: { type: 'stdout' },
                app: {
                    type: 'file',
                    filename: 'application.log'
                }
            },
            categories: {
                default: {
                    appenders: ['out', 'app'],
                    level: 'debug'
                }
            }
        });

        // 默认日志logger 设置到ctx 的logger字段
        app.logger = app.context.logger = logSerivce.getLogger();
        // getLogger方法设置为ctx对应方法
        app.getLogger = app.context.getLogger = logSerivce.getLogger;
    },

    // 模块路由注册，对外提供API可在此写api相关地址
    async ready(app) {

    },

    // 启动收尾工作，可以在此执行建库、建索引等一些全局的具体业务操作
    async bootComplete(app) {

    }
};
