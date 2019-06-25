const React = require('react');
const PropTypes = require('prop-types');
import {Form} from 'formik';

const NextStepButton = require('./next-step-button.jsx');

const JoinFlowStep = ({
    children,
    description,
    title,
    waiting
}) => (
    <Form>
        <div>
            {title && (
                <h2>
                    {title}
                </h2>
            )}
            {description && (
                <p>
                    <span>
                        {description}
                    </span>
                </p>
            )}
            {children}
        </div>
        <NextStepButton waiting={waiting} />
    </Form>
);

JoinFlowStep.propTypes = {
    children: PropTypes.node,
    description: PropTypes.string,
    title: PropTypes.string,
    waiting: PropTypes.bool
};

module.exports = JoinFlowStep;
