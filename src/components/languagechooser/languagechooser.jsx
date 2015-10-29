var classNames = require('classnames');
var React = require('react');
var ReactDOM = require('react-dom');

var Api = require('../../mixins/api.jsx');
var languages = require('../../../languages.json');
var Select = require('../forms/select.jsx');

require('./languagechooser.scss');

var LanguageChooser = React.createClass({
    type: 'LanguageChooser',
    mixins: [
        Api
    ],
    getInitialState: function () {
        return {
            choice: window._locale
        };
    },
    getDefaultProps: function () {
        return {
            languages: languages
        };
    },
    onSetLanguage: function (e) {
        e.preventDefault();
        this.setState({'choice': e.target.value});
        ReactDOM.findDOMNode(this.refs.languageForm).submit();
    },
    render: function () {
        var classes = classNames(
            'language-chooser',
            this.props.className
        );

        return (
            <form ref="languageForm" className={classes} action="/i18n/setlang/" method="POST">
                <Select name="language" defaultValue={this.state.choice} onChange={this.onSetLanguage}>
                    {Object.keys(this.props.languages).map(function (value) {
                        return <option value={value} key={value}>
                                    {this.props.languages[value]}
                                </option>;
                    }.bind(this))}
                </Select>
            </form>
        );
    }
});

module.exports = LanguageChooser;
