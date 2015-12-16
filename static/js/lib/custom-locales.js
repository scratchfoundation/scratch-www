var customLanguages = {
    'an': {'locale': 'an','parentLocale': 'ca'},
    'la': {'locale': 'la','parentLocale': 'it'},
    'yum': {'locale': 'yum','parentLocale': 'en'},
    'cat': {'locale': 'cat','parentLocale': 'en'}
};
for (var locale in customLanguages) {
    ReactIntl.addLocaleData(customLanguages[locale]);
}
