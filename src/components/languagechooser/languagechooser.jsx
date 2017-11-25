import classNames from 'classnames';
import React from 'react';

import jar from '../../lib/jar.js';
import languages from '../../../languages.json';
import Form from '../forms/form.jsx';
import Select from '../forms/select.jsx';

require('./languagechooser.scss');

/**
 * Footer dropdown menu that allows one to change their language.
 */
var LanguageChooser = React.createClass({
    type: 'LanguageChooser',
    getDefaultProps: function () {
        return {
            languages: languages,
            locale: 'en'
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

export default LanguageChooser;
