(function ($, _, underi18n) {

    var test_el = {
            'Developer': 'Προγραμματιστής',
            'Role ${role} does not exist in ${context}': 'Ο ρόλος ${role} δεν υπάρχει στο ${context}'},
        t = underi18n.MessageFactory(test_el);

    describe('underi18n', function () {

        it('will instantiate a MessageFactory and return its translate() method when MessageFactory() is invoked', function () {
            expect(typeof (t)).toEqual('function');
        });

        it('will translate plain msgids', function () {
            expect(t('Developer')).toEqual('Προγραμματιστής');
        });

        it('will translate msgids with parameters', function () {
            expect(t('Role ${role} does not exist in ${context}', {role: 'διαχειριστής', context: 'πρόγραμμα'})).toEqual('Ο ρόλος διαχειριστής δεν υπάρχει στο πρόγραμμα');
        });

        it('will return the plain msgid if it does not exist in the catalog', function () {
            expect(t('Unknown msgid')).toEqual('Unknown msgid');
        });
    });

})(this.jQuery, this._, this.underi18n);
