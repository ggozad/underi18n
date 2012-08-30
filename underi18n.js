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
                            regexp = RegExp("\\$\\{" + key + '\\}', 'g');
                            msgstr = msgstr.replace(regexp, val);
                        });
                    }
                    return msgstr;
                };
            };
            return function (catalog) {
                return new MessageFactory(catalog).translate;
            };
        })()
    };

    return underi18n;
}));


