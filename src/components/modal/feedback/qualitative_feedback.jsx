import React, {useCallback} from 'react';
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

import './qualitative_feedback.scss';

const QUALITATIVE_FEEDBACK_DATA = {
    tutorials: {
        questionId: 'feedback.question.tutorials',
        options: [
            {
                value: 'notEasy',
                label: 'feedback.answer.tutorials.notEasy'
            },
            {
                value: 'littleEasy',
                label: 'feedback.answer.tutorials.littleEasy'
            },
            {
                value: 'easy',
                label: 'feedback.answer.tutorials.easy'
            },
            {
                value: 'veryEasy',
                label: 'feedback.answer.tutorials.veryEasy'
            }
        ]
    },
    ideasGenerator: {
        questionId: 'feedback.question.ideasGenerator',
        options: [
            {
                value: 'yes',
                label: 'feedback.answer.ideasGenerator.yes'
            },
            {
                value: 'no',
                label: 'feedback.answer.ideasGenerator.no'
            }
        ]
    },
    starterProjects: {
        questionId: 'feedback.question.starterProjects',
        options: [
            {
                value: 'notHelpful',
                label: 'feedback.answer.starterProjects.notHelpful'
            },
            {
                value: 'littleHelpful',
                label: 'feedback.answer.starterProjects.littleHelpful'
            },
            {
                value: 'helpful',
                label: 'feedback.answer.starterProjects.helpful'
            },
            {
                value: 'veryHelpful',
                label: 'feedback.answer.starterProjects.veryHelpful'
            }
        ]
    },
    debugging: {
        questionId: 'feedback.question.debugging',
        options: [
            {
                value: 'notHelpful',
                label: 'feedback.answer.debugging.notHelpful'
            },
            {
                value: 'littleHelpful',
                label: 'feedback.answer.debugging.littleHelpful'
            },
            {
                value: 'helpful',
                label: 'feedback.answer.debugging.helpful'
            },
            {
                value: 'veryHelpful',
                label: 'feedback.answer.debugging.veryHelpful'
            }
        ]
    }
};

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

const QualitativeFeedback = ({feedbackData, onRequestClose}) => {
    const [_, setFilledFeedback] = useLocalStorage(
        feedbackData.questionId,
        false
    );
    const intl = useIntl();

    const onClose = useCallback(() => {
        setFilledFeedback(true);
        onRequestClose();
    }, [setFilledFeedback, onRequestClose]);

    // TBD: add logic for sending events to GA
    const onSubmit = useCallback(
        formData => {
            if (formData.feedback) {
                setFilledFeedback(true);
            }
        },
        [setFilledFeedback]
    );

    return (
        <Modal
            className="mod-feedback"
            overlayClassName="mod-feedback-overlay"
            contentLabel={intl.formatMessage({id: 'feedback.giveFeedback'})}
            onRequestClose={onClose}
            isOpen
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
                    {({handleSubmit, setFieldValue, values}) =>
                        (
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
                        )
                    }
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
    onRequestClose: PropTypes.func
};

export const IdeasGeneratorFeedback = () => (
    <QualitativeFeedback
        feedbackData={QUALITATIVE_FEEDBACK_DATA.ideasGenerator}
    />
);

export const StarterProjectsFeedback = () => (
    <QualitativeFeedback
        feedbackData={QUALITATIVE_FEEDBACK_DATA.starterProjects}
    />
);

export const TutorialsFeedback = () => (
    <QualitativeFeedback feedbackData={QUALITATIVE_FEEDBACK_DATA.tutorials} />
);

export const DebugingFeedback = () => (
    <QualitativeFeedback feedbackData={QUALITATIVE_FEEDBACK_DATA.debugging} />
);
