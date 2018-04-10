const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const Formsy = require('formsy-react');
const omit = require('lodash.omit');
const PropTypes = require('prop-types');
const React = require('react');

const validations = require('./validations.jsx').validations;

for (const validation in validations) {
    Formsy.addValidationRule(validation, validations[validation]);
}

class Form extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleChange'
        ]);
        this.state = {
            allValues: {}
        };
    }
    handleChange (currentValues, isChanged) {
        this.setState({allValues: omit(currentValues, 'all')});
        this.props.onChange(currentValues, isChanged);
    }
    render () {
        return (
            <Formsy.default
                className={classNames('form', this.props.className)}
                ref={form => {
                    this.formsy = form;
                }}
                onChange={this.handleChange}
                {...this.props}
            >
                {React.Children.map(this.props.children, child => {
                    if (!child) return null;
                    if (child.props.name === 'all') {
                        return React.cloneElement(child, {value: this.state.allValues});
                    }
                    return child;
                })}
            </Formsy.default>
        );
    }
}

Form.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onChange: PropTypes.func
};

Form.defaultProps = {
    noValidate: true,
    onChange: function () {}
};

module.exports = Form;
