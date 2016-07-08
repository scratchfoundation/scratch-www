var classNames = require('classnames');
var React = require('react');

var jar  = require('../../lib/jar.js');
var languages = require('../../../languages.json');
var Form = require('../forms/form.jsx');
var Select = require('../forms/select.jsx');

require('./languagechooser.scss');

/**
 * Footer dropdown menu that allows one to change their language.
 */
var LanguageChooser = React.createClass({
    type: 'LanguageChooser',
    getDefaultProps: function () {
        return {
            languages: languages,
            locale: window._locale
        };
    },
    onSetLanguage: function (name, value) {
        jar.set('scratchlanguage', value);
        window.location.reload();
    },
    render: function () {
        var classes = classNames(
            'language-chooser',
            this.props.className
        );
        var languageOptions = Object.keys(this.props.languages).map(function (value) {
            return {value: value, label: this.props.languages[value]};
        }.bind(this));
        return (
            <Form className={classes}>
                <Select name="language"
                        options={languageOptions}
                        value={this.props.locale}
                        onChange={this.onSetLanguage}
                        required />
            </Form>
        );
    }
});

module.exports = LanguageChooser;
