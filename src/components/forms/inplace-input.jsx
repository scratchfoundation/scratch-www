const bindAll = require('lodash.bindall');
const React = require('react');
const PropTypes = require('prop-types');
const withFormsy = require('formsy-react').withFormsy;
const formsyPropTypes = require('formsy-react').propTypes;
const classNames = require('classnames');

require('./inplace-input.scss');

class InplaceInput extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleChange',
            'handleBlur'
        ]);
        this.state = {
            field: props.field,
            value: props.value
        };
    }
    handleBlur (event) {
        const formData = {};
        if (this.props.isValid()) {
            formData[this.props.name] = this.props.getValue();
            this.props.onUpdate(formData);
        }
    }
    handleChange (event) {
        this.props.setValue(event.currentTarget.value);
    }
    render () {
        const errorMessage = this.props.getErrorMessage();
        
        return (
            <div className={classNames('editable form-group', this.props.className)}>
                {(this.props.type === 'textarea') ?
                    <textarea
                        value={this.state.value}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                    /> :
                    <input
                        value={this.props.getValue()}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                    />
                }
                <span className='validation-message'>{errorMessage}</span>
            </div>
        );
    }
}

InplaceInput.propTypes = {
    className: PropTypes.string,
    onUpdate: PropTypes.func.isRequired,
    type: PropTypes.string,
    ...formsyPropTypes
};

InplaceInput.defaultProps = {
    type: 'text',
    value: ''
};

module.exports = withFormsy(InplaceInput);
