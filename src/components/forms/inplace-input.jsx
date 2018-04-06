const bindAll = require('lodash.bindall');
const React = require('react');
const PropTypes = require('prop-types');
// const withFormsy = require('formsy-react').withFormsy;
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
        formData[this.state.field] = event.target.value;
        this.props.onUpdate(formData);
    }
    handleChange (event) {
        this.setState({value: event.target.value});
        // this.props.setValue(event.currentTarget.value);
    }
    render () {
        // const errorMessage = this.props.getErrorMessage();
        
        return (
            <div className={classNames('editable form-group', this.props.className)}>
                {(this.props.type === 'textarea') ?
                    <textarea
                        value={this.state.value}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                    /> :
                    <input
                        value={this.state.value}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                    />
                }
                {/* <span className='validation-error'>{errorMessage}</span> */}
            </div>
        );
    }
}

InplaceInput.propTypes = {
    className: PropTypes.string,
    field: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    type: PropTypes.string,
    value: PropTypes.string
};

InplaceInput.defaultProps = {
    type: 'text',
    value: ''
};

module.exports = InplaceInput;
