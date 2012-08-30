(function ($, _, underi18n) {


    describe('underi18n', function () {

        var test_el = {
            'Developer': 'Προγραμματιστής',
            'Role ${role} does not exist in ${context}': 'Ο ρόλος ${role} δεν υπάρχει στο ${context}'},
            t_el = underi18n.MessageFactory(test_el);

        it('will instantiate a MessageFactory and return its translate() method when MessageFactory() is invoked', function () {
            expect(typeof (t_el)).toEqual('function');
        });

        it('will translate plain msgids', function () {
            expect(t_el('Developer')).toEqual('Προγραμματιστής');
        });

        it('will translate msgids with parameters', function () {
            expect(t_el('Role ${role} does not exist in ${context}', {role: 'διαχειριστής', context: 'πρόγραμμα'})).toEqual('Ο ρόλος διαχειριστής δεν υπάρχει στο πρόγραμμα');
        });

        it('will return the plain msgid if it does not exist in the catalog', function () {
            expect(t_el('Unknown msgid')).toEqual('Unknown msgid');
        });

    });

    describe('underi18n.template', function () {
        var test_en = {
                'files_label': 'Files',
                'num_files': 'There are ${num} files in this folder'
            },
            test_el = {
                'files_label': 'Αρχεία',
                'num_files': 'Υπάρχουν ${num} αρχεία στο φάκελλο'
            },
            templ = '<h1><%= title %></h1>' +
                    '<label><%_ files_label %></label>' +
                    '<span><%_ num_files %></span>',
            t_en = underi18n.MessageFactory(test_en);
            t_el = underi18n.MessageFactory(test_el);

        it('will run i18n replacements in an underscore template', function () {
            var x = _.template(underi18n.template(templ, t_en));
            expect(x({title: 'Summary', num: 3})).toEqual(
                '<h1>Summary</h1>' +
                '<label>Files</label>' +
                '<span>There are 3 files in this folder</span>'
            );
        });

    });

})(this.jQuery, this._, this.underi18n);
