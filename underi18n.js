//    underi18n v1.0.0

//    (c) 2012 Yiorgis Gozadinos
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
            var MessageFactory = function (catalog, underi18n) {
                this.translate = function (msgid, keywords) {
                    var s = underi18n.translateSettings;
                    var msgstr  = catalog[msgid] ? catalog[msgid] : msgid;
                    if (keywords) {
                        for (var key in keywords) {
                            msgstr = msgstr.replace(s.left + key+ s.right, keywords[key]);
                        }
                    }
                    return msgstr;
                };
            };
            return function (catalog) {
                // this == underi18n
                return new MessageFactory(catalog, this).translate;
            };
        })(),

        template: function (str, factory) {
            var s = this.templateSettings;
            var st = this.translateSettings;
            return str.replace(s.translate, function (match, code) {
                return factory(
                    code
                    .replace(/^\s+|\s+$/g, '')
                );
            }).replace(st.regexp, function (m, c) {
                return s.i18nVarLeftDel + c + s.i18nVarRightDel;
            });
        },

        translateSettings: {
            regexp: /\$\{(.*?)\}/g,
            left: '${',
            right: '}'
        },

        templateSettings: {
            translate: /<%_([\s\S]+?)%>/g,
            i18nVarLeftDel: '<%=',
            i18nVarRightDel: '%>'
        }
    };

    return underi18n;
}));
