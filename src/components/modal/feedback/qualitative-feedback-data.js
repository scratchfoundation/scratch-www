export const QUALITATIVE_FEEDBACK_QUESTION_ID = {
    ideasGenerator: 'feedback.question.ideasGenerator',
    starterProjects: 'feedback.question.starterProjects',
    tutorials: 'feedback.question.tutorials',
    debugging: 'feedback.question.debugging'
};

export const QUALITATIVE_FEEDBACK_DATA = {
    tutorials: {
        questionId: QUALITATIVE_FEEDBACK_QUESTION_ID.tutorials,
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
        questionId: QUALITATIVE_FEEDBACK_QUESTION_ID.ideasGenerator,
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
        questionId: QUALITATIVE_FEEDBACK_QUESTION_ID.starterProjects,
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
        questionId: QUALITATIVE_FEEDBACK_QUESTION_ID.debugging,
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
