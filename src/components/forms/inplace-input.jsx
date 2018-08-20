const bindAll = require('lodash.bindall');
const React = require('react');
const PropTypes = require('prop-types');
const FRCInput = require('formsy-react-components').Input;
const FRCTextarea = require('formsy-react-components').Textarea;
const classNames = require('classnames');

require('./row.scss');
require('./inplace-input.scss');

class InplaceInput extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleBlur',
            'setRef'
        ]);
    }
    handleBlur (name, value) {
        if (this.inputRef.props.errorMessages.length === 0) {
            const jsonData = {};
            jsonData[name] = value;
            this.props.handleUpdate(jsonData);
        }
    }
    setRef (input) {
        this.inputRef = input;
    }
    render () {
        const {
            className,
            type,
            handleUpdate, // eslint-disable-line no-unused-vars
            ...props
        } = this.props;
        return (
            (type === 'textarea') ?
                <FRCTextarea
                    className="inplace-textarea"
                    componentRef={this.setRef}
                    elementWrapperClassName="grow"
                    label={null}
                    rowClassName={classNames('textarea-row no-label', className)}
                    onBlur={this.handleBlur}
                    {...props}
                /> :
                <FRCInput
                    className="inplace-input"
                    componentRef={this.setRef}
                    rowClassName={classNames(
                        className,
                        'no-label'
                    )}
                    onBlur={this.handleBlur}
                    {...props}
                />
        );
    }
}

InplaceInput.propTypes = {
    className: PropTypes.string,
    handleUpdate: PropTypes.func.isRequired,
    type: PropTypes.string
};

InplaceInput.defaultProps = {
    type: 'text',
    value: ''
};

module.exports = InplaceInput;
