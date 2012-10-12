//    underi18n v0.1

//    (c) 2012 Yiorgis Gozadinos, Crypho AS, http://crypho.com
//    underi18n is distributed under the MIT license.
//    http://github.com/ggozad/underi18n

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], function () {
            return (root.underi18n = factory());
        });
    } else {
        // Browser globals
        root.underi18n = factory();
    }

}(this, function () {

    var underi18n = {

        MessageFactory: (function () {
            var MessageFactory = function (catalog) {
                this.translate = function (msgid, keywords) {
                    var msgstr  = catalog[msgid] ? catalog[msgid] : msgid;
                    if (keywords) {
                        for (var key in keywords) {
                            msgstr = msgstr.replace('${'+key+'}', keywords[key]);
                        }
                    }
                    return msgstr;
                };
            };
            return function (catalog) {
                return new MessageFactory(catalog).translate;
            };
        })(),

        template: function (str, factory) {
            var s = this.templateSettings;
            return str.replace(s.translate, function (match, code) {
                return factory(
                    code
                    .replace(/^\s+|\s+$/g, '')
                );
            }).replace(/\$\{(.*?)\}/g, function (m, c) {
                return s.i18nVarLeftDel + c + s.i18nVarRightDel;
            });
        },

        templateSettings: {
            translate: /<%_([\s\S]+?)%>/g,
            i18nVarLeftDel: '<%=',
            i18nVarRightDel: '%>'
        }
    };

    return underi18n;
}));


