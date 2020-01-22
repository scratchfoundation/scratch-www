const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

const jar = require('../../lib/jar.js');
const languages = require('scratch-l10n').default;
const Form = require('../forms/form.jsx');
const Select = require('../forms/select.jsx');

require('./languagechooser.scss');

/**
 * Footer dropdown menu that allows one to change their language.
 */
class LanguageChooser extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSetLanguage'
        ]);
    }
    handleSetLanguage (name, value) {
        jar.set('scratchlanguage', value, {domain: `.${window.location.hostname}`});
        window.location.reload();
    }
    render () {
        const languageOptions = Object.keys(this.props.languages).map(value => ({
            value: value,
            label: this.props.languages[value].name
        }));
        return (
            <Form className={classNames('language-chooser', this.props.className)}>
                <Select
                    required
                    name="language"
                    options={languageOptions}
                    value={this.props.locale}
                    onChange={this.handleSetLanguage}
                />
            </Form>
        );
    }
}

LanguageChooser.propTypes = {
    className: PropTypes.string,
    languages: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    locale: PropTypes.string
};

LanguageChooser.defaultProps = {
    languages: languages,
    locale: 'en'
};

module.exports = LanguageChooser;
