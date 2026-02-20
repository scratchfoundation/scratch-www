import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage, useIntl} from 'react-intl';
import Modal from '../base/modal.jsx';
import ModalTitle from '../base/modal-title.jsx';
import ModalInnerContent from '../base/modal-inner-content.jsx';
import Button from '../../forms/button.jsx';
import {useLocalStorage} from 'react-use';
import {Formik} from 'formik';
import classNames from 'classnames';
import FormikRadioButton from '../../formik-forms/formik-radio-button.jsx';

import './qualitative-feedback.scss';

const FeedbackOption = ({
    id,
    label,
    onSetFieldValue,
    selectedValue,
    value,
    ...props
}) => (
    <div
        className={classNames('feedback-radio-row', {
            'feedback-radio-row-selected': selectedValue === value
        })}
        /* eslint-disable react/jsx-no-bind */
        onClick={() => onSetFieldValue('feedback', value, false)}
    >
        <FormikRadioButton
            id={id}
            label={label}
            name="feedback"
            value={value}
            {...props}
        />
    </div>
);

FeedbackOption.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    onSetFieldValue: PropTypes.func,
    selectedValue: PropTypes.string,
    value: PropTypes.string
};

export const QualitativeFeedback = ({
    feedbackData,
    hideFeedback,
    isOpen,
    sendGAEvent
}) => {
    const [displayModal, setDisplayModal] = useState(false);
    const [_, setFilledFeedback] = useLocalStorage(
        feedbackData.questionId,
        false
    );
    const intl = useIntl();

    const onClose = useCallback(() => {
        if (displayModal) {
            setDisplayModal(false);
            sendGAEvent('closed');
        }

        setFilledFeedback(true);
        hideFeedback();
    }, [
        displayModal,
        setFilledFeedback,
        hideFeedback,
        setDisplayModal,
        sendGAEvent
    ]);

    const onSubmit = useCallback(
        formData => {
            if (formData.feedback && displayModal) {
                setDisplayModal(false);
                sendGAEvent(formData.feedback);
                setFilledFeedback(true);
                hideFeedback();
            }
        },
        [
            displayModal,
            hideFeedback,
            setDisplayModal,
            setFilledFeedback,
            sendGAEvent
        ]
    );

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                setDisplayModal(true);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    return (
        <Modal
            className="mod-feedback"
            overlayClassName="mod-feedback-overlay"
            contentLabel={intl.formatMessage({id: 'feedback.giveFeedback'})}
            onRequestClose={onClose}
            isOpen={displayModal}
        >
            <ModalTitle
                title={<FormattedMessage id="feedback.giveFeedback" />}
                className="feedback-header"
            />
            <ModalInnerContent className="feedback-content">
                <Formik
                    initialValues={{
                        feedback: null
                    }}
                    onSubmit={onSubmit}
                >
                    {({handleSubmit, setFieldValue, values}) => (
                        <form
                            className="feedback-form"
                            onSubmit={handleSubmit}
                        >
                            <div className="feedback-question">
                                <FormattedMessage id={feedbackData.questionId} />
                            </div>
                            <div className="feedback-options">
                                {feedbackData.options.map(option => (
                                    <FeedbackOption
                                        key={option.value}
                                        id={option.label}
                                        label={intl.formatMessage({id: option.label})}
                                        selectedValue={values.feedback}
                                        value={option.value}
                                        onSetFieldValue={setFieldValue}
                                    />
                                ))}
                            </div>
                            <Button className="feedback-submit">
                                <FormattedMessage id="feedback.submit" />
                            </Button>
                        </form>
                    )}
                </Formik>
            </ModalInnerContent>
        </Modal>
    );
};

QualitativeFeedback.propTypes = {
    feedbackData: PropTypes.shape({
        questionId: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.string.isRequired,
                label: PropTypes.node.isRequired
            })
        ).isRequired
    }).isRequired,
    hideFeedback: PropTypes.func,
    isOpen: PropTypes.bool,
    sendGAEvent: PropTypes.func
};
