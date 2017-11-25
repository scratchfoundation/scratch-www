import React from 'react';

export default function InputComponentMixin (Component) {
    var InputComponent = React.createClass({
        getDefaultProps: function () {
            return {
                messages: {
                    'general.notRequired': 'Not Required'
                }
            };
        },
        render: function () {
            return (
                <Component help={this.props.required ? null : this.props.messages['general.notRequired']}
                           {...this.props} />
            );
        }
    });
    return InputComponent;
}
