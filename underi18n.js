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

        catalogs: {},

        setCatalog: function (domain, language, catalog) {
            if (domain in this.catalogs) {
                this.catalogs[domain][language] = catalog;
            } else {
                this.catalogs[domain] = {};
                this.catalogs[domain][language] = catalog;
            }
        },

        MessageFactory: (function () {
            var MessageFactory = function (domain, language) {
                this.translate = function (msgid, keywords) {
                    var msgstr;
                    if ((underi18n.catalogs[domain]) &&
                        (underi18n.catalogs[domain][language]) &&
                        (underi18n.catalogs[domain][language][msgid])) {
                        msgstr = underi18n.catalogs[domain][language][msgid];
                    } else {
                        msgstr = msgid;
                    }
                    if (keywords) {
                        var regexp, keyword;
                        for (keyword in keywords) {
                            if (keywords.hasOwnProperty(keyword)) {
                                regexp = RegExp("\\$\\{" + keyword + '\\}', 'g');
                                msgstr = msgstr.replace(regexp, keywords[keyword]);
                            }
                        }
                    }
                    return msgstr;
                };
            };
            return function (domain, language) {
                if (typeof (language) === 'undefined') {
                    language = underi18n.currentLanguage;
                }
                return new MessageFactory(domain, language).translate;
            };
        })()
    };

    return underi18n;
}));


