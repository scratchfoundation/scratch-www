var classNames = require('classnames');
var React = require('react');

var Api = require('../../mixins/api.jsx');
var jar  = require('../../lib/jar.js');
var languages = require('../../../languages.json');
var Select = require('../forms/select.jsx');

require('./languagechooser.scss');

/**
 * Footer dropdown menu that allows one to change their language.
 */
var LanguageChooser = React.createClass({
    type: 'LanguageChooser',
    mixins: [
        Api
    ],
    getDefaultProps: function () {
        return {
            languages: languages,
            locale: window._locale
        };
    },
    onSetLanguage: function (e) {
        e.preventDefault();
        jar.set('scratchlanguage', e.target.value);
        window.location.reload();
    },
    render: function () {
        var classes = classNames(
            'language-chooser',
            this.props.className
        );

        return (
            <div className={classes}>
                <Select name="language" defaultValue={this.props.locale} onChange={this.onSetLanguage}>
                    {Object.keys(this.props.languages).map(function (value) {
                        return <option value={value} key={value}>
                                    {this.props.languages[value]}
                                </option>;
                    }.bind(this))}
                </Select>
            </div>
        );
    }
});

module.exports = LanguageChooser;
