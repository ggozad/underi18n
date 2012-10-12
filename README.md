# under18n.js

`under18n` is a minimalistic approach to internationalization for javascript-based templates.
It can work in conjuction with other libraries providing the templates, such as [underscore](http://underscorejs.org/#template) or [moustache](https://github.com/janl/mustache.js). It supports variable substitution and AMD loading.

## Catalogs

`under18n` uses a simple JSON format for catalogs, following the standard `gettext` format. In the following example,

```javascript
{
    'Developer': 'Προγραμματιστής',
    'Role ${role} does not exist in ${context}': 'Ο ρόλος ${role} δεν υπάρχει στο ${context}'
}
```

we have two translation strings, the second one with two variables, `role` and `context`.
A simple python script is provided to help you convert standard `.mo` files to this JSON format.

## Usage

Create a *MessageFactory* from a json i18n catalog:

```javascript
var t = underi18n.MessageFactory(catalog);
```

You can now translate inline:

```javascript

t('Developer') // returns "Προγραμματιστής"

t('Role ${role} does not exist in ${context}', {role: 'διαχειριστής', context: 'πρόγραμμα'})
// Returns "Ο ρόλος διαχειριστής δεν υπάρχει στο πρόγραμμα"
```

## Templates

Typically variables in templates are indicated with some delimiter. In mustache for instance `{{ var }}` is used whereas `<%= var %>` is default for underscore. We use the same approach to indicate translatable strings. You can specify the delimiters for translatable strings as a RegExp, as well as the left/right delimiters used by your template language of choice in `under18n.templateSettings`. By default this is following underscore conventions:

```javascript
templateSettings: {
    translate: /<%_([\s\S]+?)%>/g,
    i18nVarLeftDel: '<%=',
    i18nVarRightDel: '%>'
}
```

so, `<%_ i18n %>` are set to denote translatable strings and `<%= var %>` is used to denote variables inside a template.

You can translate a template by calling `under18n.template`, for example using underscore, you can do

```javascript
var templ = _.template(under18n.template(myTemplate, t));
```

where t is the `MessageFactory`, and `myTemplate` is the template.

With the example catalog, say if the template was

```javascript

<h1><%_ Developer %></h1>
<span><%_ Role ${role} does not exist in ${context} _></span>

```

`templ({role: 'διαχειριστής', context: 'πρόγραμμα'})` would yield:

```html
<h1>Προγραμματιστής</h1>
<span>Ο ρόλος διαχειριστής δεν υπάρχει στο πρόγραμμα</span>
```
