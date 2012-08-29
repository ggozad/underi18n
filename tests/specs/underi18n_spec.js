(function ($, _, underi18n) {

    describe('underi18n', function () {

        var test_el = {
            'Contributor': 'Συντελεστής',
            'Groups are: ${names}': 'Οι ομάδες είναι: ${names}'
        };

        beforeEach(function () {
            underi18n.setCatalog('testing', 'el', test_el);
        });

        it('can set an i18n message catalog', function () {
            underi18n.setCatalog('domain', 'el', test_el);
            expect(underi18n.catalogs.domain.el).toEqual(test_el);
        });

        it('will instantiate a MessageFactory and return its translate() method when MessageFactory() is invoked', function () {
            var t;
            t = underi18n.MessageFactory('testing', 'el');
            expect(typeof (_)).toEqual('function');
        });

        it('will translate plain msgids', function () {
            var t = underi18n.MessageFactory('testing', 'el');
            expect(t('Contributor')).toEqual('Συντελεστής');
        });

        it('will translate msgids with parameters', function () {
            t = underi18n.MessageFactory('testing', 'el');
            expect(t('Groups are: ${names}', {names: 'Jarn'})).toEqual('Οι ομάδες είναι: Jarn');
        });

    });
})(this.jQuery, this._, this.underi18n);
