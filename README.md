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

## Templating

You can translate a template by calling `under18n.template`.