//    underi18n v0.1

//    (c) 2012 Yiorgis Gozadinos, Crypho AS
//    Backbone.xmpp is distributed under the MIT license.
//    http://github.com/ggozad/underi18n

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'underscore'], function ($, _) {
            return (root.underi18n = factory($, _));
        });
    } else {
        // Browser globals
        root.underi18n = factory($, _);
    }

}(this, function ($, _) {

    var underi18n = {

        MessageFactory: (function () {
            var MessageFactory = function (catalog) {
                this.translate = function (msgid, keywords) {
                    var msgstr  = catalog[msgid] ? catalog[msgid] : msgid;
                    if (keywords) {
                        var regexp;
                        _.each(keywords, function (val, key) {
                            msgstr = msgstr.replace('${'+key+'}', val);
                        });
                    }
                    return msgstr;
                };
            };
            return function (catalog) {
                return new MessageFactory(catalog).translate;
            };
        })(),

        template: function (str, factory) {
            var s = _.templateSettings;
            return str.replace(s.translate, function (match, code) {
                return factory(
                    code
                    .replace(/^\s+|\s+$/g, '')
                );
            }).replace(/\$\{(.*?)\}/g, function (m, c) {
                return s.i18nVarLeftDel + c + s.i18nVarRightDel;
            });
        }
    };

    _.templateSettings.translate = /<%_([\s\S]+?)%>/g;
    _.templateSettings.i18nVarLeftDel = '<%=';
    _.templateSettings.i18nVarRightDel = '%>';
    return underi18n;
}));


