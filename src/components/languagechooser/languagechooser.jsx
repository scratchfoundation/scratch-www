var classNames = require('classnames');

var React = require('react');

var Select = require('../forms/select.jsx');

require('./languagechooser.scss');

var LanguageChooser = React.createClass({
    type: 'LanguageChooser',
    propTypes: {
        choice: React.PropTypes.string,
        languages: React.PropTypes.object
    },
    getDefaultProps: function () {
        return {
            choice: 'en',
            languages: require('./languages.json')
        };
    },
    render: function () {
        var classes = classNames(
            'language-chooser',
            this.props.className
        );
        return (
            <form
                    ref="languageForm"
                    method="post"
                    action="/i18n/setlang/"
                    {... this.props}
                    className={classes}
                    onSubmit={this.props.onSetLanguage}>
                <Select name="language" value={this.props.choice} onChange={this.props.onSetLanguage}>
                    {Object.keys(this.props.languages).map(function (value) {
                        return <option value={value} key={value}>{this.props.languages[value]}</option>;
                    }.bind(this))}
                </Select>
            </form>
        );
    }
});

module.exports = LanguageChooser;
