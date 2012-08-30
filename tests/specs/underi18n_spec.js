(function ($, _, underi18n) {

    describe('underi18n', function () {

        var test_el = {
            'Contributor': 'Συντελεστής',
            'Groups are: ${names}': 'Οι ομάδες είναι: ${names}'
        };

        beforeEach(function () {
        });

        it('will instantiate a MessageFactory and return its translate() method when MessageFactory() is invoked', function () {
            var t;
            t = underi18n.MessageFactory(test_el);
            expect(typeof (_)).toEqual('function');
        });

        it('will translate plain msgids', function () {
            var t = underi18n.MessageFactory(test_el);
            expect(t('Contributor')).toEqual('Συντελεστής');
        });

        it('will translate msgids with parameters', function () {
            t = underi18n.MessageFactory(test_el);
            expect(t('Groups are: ${names}', {names: 'Jarn'})).toEqual('Οι ομάδες είναι: Jarn');
        });

    });
})(this.jQuery, this._, this.underi18n);
