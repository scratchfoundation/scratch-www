import React, {act} from 'react';
import {Provider} from 'react-redux';
const ComposeComment = require('../../../src/views/preview/comment/compose-comment.jsx');
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import {renderWithIntl} from '../../helpers/react-testing-library-wrapper.jsx';

describe('Compose Comment test', () => {
    const mockStore = configureStore();
    let _mockFormat;
    const defaultProps = () => ({
        user: {
            thumbnailUrl: 'scratch.mit.edu',
            username: 'auser'
        }
    });

    let defaultStore;
    beforeEach(() => {
        const mockFormat = {
            format: jest.fn()
        };
        _mockFormat = Intl.RelativeTimeFormat = jest
            .fn()
            .mockImplementation(() => mockFormat);
        mockFormat.format.mockReturnValue('');

        defaultStore = mockStore({
            session: {
                session: {
                    user: {},
                    permissions: {
                        mute_status: {}
                    }
                }
            }
        });
    });

    const getComposeCommentWrapper = (props, store) => {
        if (!store) {
            store = defaultStore;
        }
        const wrapper = renderWithIntl(
            <Provider store={store}>
                <ComposeComment
                    {...defaultProps()}
                    {...props}
                />
            </Provider>,
            'ComposeComment'
        );
        return wrapper;
    };

    test('status is EDITING when props do not contain a muteStatus', () => {
        const commentInstance = getComposeCommentWrapper({}).instance();
        expect(commentInstance.state.status).toBe('EDITING');
    });

    test('status is COMPOSE_DISALLOWED when props contain a future mute', () => {
        jest.useFakeTimers();
        const realDateNow = Date.now.bind(global.Date);
        global.Date.now = () => 0;
        const mutedStore = mockStore({
            session: {
                session: {
                    user: {},
                    permissions: {
                        mute_status: {
                            muteExpiresAt: 5,
                            offenses: [],
                            showWarning: true
                        }
                    }
                }
            }
        });
        const component = getComposeCommentWrapper({}, mutedStore);
        const commentInstance = component.instance();

        expect(commentInstance.state.status).toBe('COMPOSE_DISALLOWED');
        global.Date.now = realDateNow;
    });

    test('Modal & Comment status do not show', () => {
        const {container, findByComponentName} = getComposeCommentWrapper({});
        // Comment compsoe box is there
        expect(container.querySelector('.compose-comment')).toBeInTheDocument();
        // No error message
        expect(container.querySelector('.compose-error-row')).not.toBeInTheDocument();
        expect(findByComponentName('MuteModal')).not.toBeDefined();
        expect(container.querySelector('.commenting-status')).not.toBeInTheDocument();
        // Buttons start enabled
        expect(container.querySelector('.compose-post')).not.toBeDisabled();
        expect(container.querySelector('.compose-cancel')).not.toBeDisabled();

    });

    test('Error messages shows when comment rejected', () => {
        const {container, instance} = getComposeCommentWrapper({});
        const commentInstance = instance();
        act(() => {
            commentInstance.setState({
                error: 'isFlood',
                status: 'REJECTED'
            });
        });


        expect(container.querySelector('.compose-error-row')).toBeInTheDocument();
        // Buttons stay enabled when comment rejected for non-mute reasons
        expect(container.querySelector('.compose-post')).not.toBeDisabled();
        expect(container.querySelector('.compose-cancel')).not.toBeDisabled();
    });

    test('No error message shows when comment rejected because user is already muted', () => {
        const {container, instance} = getComposeCommentWrapper({});
        const commentInstance = instance();
        act(() => {
            commentInstance.setState({
                error: 'isMuted',
                status: 'COMPOSE_DISALLOWED'
            });
        });
        expect(container.querySelector('.compose-error-row')).not.toBeInTheDocument();
    });

    test('Comment Status shows but compose box does not when you load the page and you are already muted', () => {
        const realDateNow = Date.now.bind(global.Date);
        global.Date.now = () => 0;
        const {container, instance, findByComponentName} = getComposeCommentWrapper({});
        const commentInstance = instance();
        act(() => {
            commentInstance.setState({muteExpiresAtMs: 100, status: 'COMPOSE_DISALLOWED'});
        });

        // Compose box should be hidden if muted unless they got muted due to a comment they just posted.
        expect(container.querySelector('.compose-comment')).not.toBeInTheDocument();
        expect(findByComponentName('MuteModal')).not.toBeDefined();
        expect(container.querySelector('.commenting-status')).toBeInTheDocument();

        act(() => {
            global.Date.now = realDateNow;
        });
    });

    test('Comment Status and compose box do not show on replies when muted, but mute modal does', () => {
        const realDateNow = Date.now.bind(global.Date);
        global.Date.now = () => 0;
        const store = mockStore({
            session: {
                session: {
                    user: {},
                    permissions: {
                        mute_status: {
                            muteExpiresAt: 5,
                            offenses: [],
                            showWarning: true
                        }
                    }
                }
            }
        });
        const {container, findByComponentName} = getComposeCommentWrapper({isReply: true}, store);
        expect(container.querySelector('.compose-comment')).not.toBeInTheDocument();
        expect(findByComponentName('MuteModal')).toBeDefined();
        expect(findByComponentName('MuteModal').props.startStep).toBe(1);
        expect(container.querySelector('.commenting-status')).not.toBeInTheDocument();
        global.Date.now = realDateNow;
    });

    test('Comment Status and compose box show on replies when not muted', () => {
        const realDateNow = Date.now.bind(global.Date);
        global.Date.now = () => 0;
        const {container} = getComposeCommentWrapper({isReply: true});
        expect(container.querySelector('.compose-comment')).toBeInTheDocument();
        expect(container.querySelector('.commenting-status')).not.toBeInTheDocument();
        global.Date.now = realDateNow;
    });

    test('Comment Status initialized properly when muted', () => {
        jest.useFakeTimers();
        jest.spyOn(global, 'setTimeout');
        const realDateNow = Date.now.bind(global.Date);
        global.Date.now = () => 0;
        const mutedStore = mockStore({
            session: {
                session: {
                    user: {},
                    permissions: {
                        mute_status: {
                            muteExpiresAt: 5,
                            offenses: [],
                            showWarning: true
                        }
                    }
                }
            }
        });
        const {container, instance, findByComponentName} = getComposeCommentWrapper({}, mutedStore);
        const commentInstance = instance();
        // Check conversion to ms from seconds is done at init time.
        expect(commentInstance.state.muteExpiresAtMs).toEqual(5 * 1000);
        // Check we setup a timeout to expire the widget when timeout reached.
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5 * 1000);
        expect(commentInstance.state.showWarning).toBe(true);
        // Compose box should be hidden if muted unless they got muted due to a comment they just posted.
        expect(container.querySelector('FlexRow.compose-comment')).not.toBeInTheDocument();
        expect(findByComponentName('MuteModal')).not.toBeDefined();
        expect(container.querySelector('.commenting-status')).toBeInTheDocument();
        global.Date.now = realDateNow;
    });

    test('Comment Status shows when user just submitted a reply comment that got them muted', () => {
        const realDateNow = Date.now.bind(global.Date);
        global.Date.now = () => 0;
        const {container, instance, findByComponentName} = getComposeCommentWrapper({isReply: true});
        const commentInstance = instance();
        act(() => {
            commentInstance.setState({
                status: 'REJECTED_MUTE',
                muteExpiresAtMs: 100
            });
        });
        expect(container.querySelector('.compose-comment')).toBeInTheDocument();
        expect(findByComponentName('MuteModal')).not.toBeDefined();
        expect(container.querySelector('.commenting-status')).toBeInTheDocument();
        // Compose box exists but is disabled
        expect(container.querySelector('.compose-input')).toBeInTheDocument();
        expect(container.querySelector('.inplace-textarea')).toBeDisabled();
        expect(container.querySelector('.compose-post')).toBeDisabled();
        expect(container.querySelector('.compose-cancel')).toBeDisabled();
        global.Date.now = realDateNow;
    });

    test('Comment Status shows when user just submitted a comment that got them muted', () => {
        const realDateNow = Date.now.bind(global.Date);
        global.Date.now = () => 0;
        const {container, instance, findByComponentName} = getComposeCommentWrapper({});
        const commentInstance = instance();
        act(() => {
            commentInstance.setState({
                status: 'REJECTED_MUTE',
                muteExpiresAtMs: 100
            });
        });
        expect(container.querySelector('.compose-comment')).toBeInTheDocument();
        expect(findByComponentName('MuteModal')).not.toBeDefined();
        expect(container.querySelector('.commenting-status')).toBeInTheDocument();
        // Compose box exists but is disabled
        expect(container.querySelector('.compose-input')).toBeInTheDocument();
        expect(container.querySelector('.inplace-textarea')).toBeDisabled();
        expect(container.querySelector('.compose-post')).toBeDisabled();
        expect(container.querySelector('.compose-cancel')).toBeDisabled();
        global.Date.now = realDateNow;
    });
    test('Comment Error does not show for mutes', () => {
        const realDateNow = Date.now.bind(global.Date);
        global.Date.now = () => 0;
        const {container, instance} = getComposeCommentWrapper({});
        const commentInstance = instance();
        act(() => {
            commentInstance.setState({
                status: 'REJECTED_MUTE',
                error: 'a mute error'
            });
        });
        expect(container.querySelector('.compose-error-row')).not.toBeInTheDocument();
        expect(container.querySelector('.compose-comment')).toBeInTheDocument();
        global.Date.now = realDateNow;
    });
    test('Comment Error does show for non-mute errors', () => {
        const {container, instance} = getComposeCommentWrapper({});
        const commentInstance = instance();
        act(() => {
            commentInstance.setState({
                error: 'some error',
                status: 'REJECTED'
            });
        });
        expect(container.querySelector('.compose-error-row')).toBeInTheDocument();
        expect(container.querySelector('.compose-comment')).toBeInTheDocument();
        expect(container.querySelector('.compose-input')).toBeInTheDocument();
        expect(container.querySelector('.inplace-textarea')).not.toBeDisabled();
        expect(container.querySelector('.compose-post')).not.toBeDisabled();
        expect(container.querySelector('.compose-cancel')).not.toBeDisabled();
    });

    test('Mute Modal shows when muteOpen is true', () => {
        const realDateNow = Date.now.bind(global.Date);
        global.Date.now = () => 0;
        const store = mockStore({
            session: {
                session: {
                    user: {},
                    permissions: {
                        mute_status: {}
                    }
                }
            }
        });
        const {instance, findByComponentName} = getComposeCommentWrapper({}, store);
        // set state on the ComposeComment component, not the wrapper
        const commentInstance = instance();
        act(() => {
            commentInstance.setState({muteOpen: true});
        });
        expect(findByComponentName('MuteModal')).toBeDefined();
        expect(findByComponentName('MuteModal').props.startStep).toEqual(0);
        expect(findByComponentName('MuteModal').props.showWarning).toBe(false);
        global.Date.now = realDateNow;
    });

    test('Mute Modal gets showWarning props from state', () => {
        const store = mockStore({
            session: {
                session: {
                    user: {},
                    permissions: {
                        mute_status: {}
                    }
                }
            }
        });
        const {findByComponentName, instance} = getComposeCommentWrapper({}, store);
        // set state on the ComposeComment component, not the wrapper
        const commentInstance = instance();
        act(() => {
            commentInstance.setState({muteOpen: true});
        });
        expect(findByComponentName('MuteModal')).toBeDefined();
        expect(findByComponentName('MuteModal').props.showWarning).toBe(false);
        act(() => {
            commentInstance.setState({
                muteOpen: true,
                showWarning: true
            });
        });
        expect(findByComponentName('MuteModal').props.showWarning).toBe(true);
    });

    test('Mute Modal gets showFeedback props from state', () => {
        const store = mockStore({
            session: {
                session: {
                    user: {},
                    permissions: {
                        mute_status: {}
                    }
                }
            }
        });

        const {instance, findByComponentName} = getComposeCommentWrapper({}, store);

        const commentInstance = instance();
        act(() => {
            commentInstance.setState({
                status: 'REJECTED_MUTE',
                error: 'isBad',
                muteOpen: true
            });
        });

        expect(findByComponentName('MuteModal')).toBeDefined();
        expect(findByComponentName('MuteModal').props.showFeedback).toBe(true);

        act(() => {
            commentInstance.setState({
                status: 'COMPOSE_DISALLOWED',
                error: 'isMute',
                showWarning: true,
                muteOpen: true
            });
        });

        expect(findByComponentName('MuteModal')).toBeDefined();
        expect(findByComponentName('MuteModal').props.showFeedback).toBe(false);

        act(() => {
            commentInstance.setState({
                status: 'REJECTED',
                error: 'isBad',
                showWarning: true,
                muteOpen: true
            });
        });

        expect(findByComponentName('MuteModal')).toBeDefined();
        expect(findByComponentName('MuteModal').props.showFeedback).toBe(false);
    });

    test('shouldShowMuteModal is false when muteStatus is undefined', () => {
        const commentInstance = getComposeCommentWrapper({}).instance();
        expect(commentInstance.shouldShowMuteModal()).toBe(false);
    });

    test('shouldShowMuteModal is false when list is undefined', () => {
        const muteStatus = {};
        const commentInstance = getComposeCommentWrapper({}).instance();
        expect(commentInstance.shouldShowMuteModal(muteStatus)).toBe(false);
    });

    test('shouldShowMuteModal is false when list empty', () => {
        const muteStatus = {
            offenses: []
        };
        const commentInstance = getComposeCommentWrapper({}).instance();
        expect(commentInstance.shouldShowMuteModal(muteStatus)).toBe(false);
    });

    test('shouldShowMuteModal is true when only 1 recent offesnse', () => {
        const realDateNow = Date.now.bind(global.Date);
        global.Date.now = () => 0;
        // Since Date.now mocked to 0 above, we just need a small number to make
        // it look like it was created < 2 minutes ago.
        const offense = {
            expiresAt: '1000',
            createdAt: '-60' // ~1 ago min given shouldShowMuteModal's conversions,
        };
        const muteStatus = {
            offenses: [offense]
        };
        const commentInstance = getComposeCommentWrapper({}).instance();
        expect(commentInstance.shouldShowMuteModal(muteStatus, true)).toBe(true);
        global.Date.now = realDateNow;
    });

    test('shouldShowMuteModal is false when multiple offenses, even if 1 is recent', () => {
        const offenses = [];
        const realDateNow = Date.now.bind(global.Date);
        global.Date.now = () => 0;
        // Since Date.now mocked to 0 above, we just need a small number to make
        // it look like it was created more than 2 minutes ago.
        const offense = {
            expiresAt: '1000',
            createdAt: '-119' // just shy of two min ago
        };
        offenses.push(offense);
        offense.createdAt = '-180'; // 3 minutes ago;
        offenses.push(offense);
        const muteStatus = {
            offenses: offenses
        };
        const commentInstance = getComposeCommentWrapper({}).instance();
        expect(commentInstance.shouldShowMuteModal(muteStatus, true)).toBe(false);
        global.Date.now = realDateNow;
    });

    test('shouldShowMuteModal is true when showWarning is true even with multiple offenses', () => {
        const offenses = [];
        const realDateNow = Date.now.bind(global.Date);
        global.Date.now = () => 0;
        // Since Date.now mocked to 0 above, we just need a small number to make
        // it look like it was created more than 2 minutes ago.
        const offense = {
            expiresAt: '1000',
            createdAt: '-119' // just shy of two min ago
        };
        offenses.push(offense);
        offense.createdAt = '-180'; // 3 minutes ago;
        offenses.push(offense);
        const muteStatus = {
            offenses: offenses,
            showWarning: true
        };
        const commentInstance = getComposeCommentWrapper({}).instance();
        expect(commentInstance.shouldShowMuteModal(muteStatus, true)).toBe(true);
        global.Date.now = realDateNow;
    });

    test('shouldShowMuteModal is false when the user is already muted, even when only 1 recent offesnse', () => {
        const realDateNow = Date.now.bind(global.Date);
        global.Date.now = () => 0;
        // Since Date.now mocked to 0 above, we just need a small number to make
        // it look like it was created < 2 minutes ago.
        const offense = {
            expiresAt: '1000',
            createdAt: '-60' // ~1 ago min given shouldShowMuteModal's conversions,
        };
        const muteStatus = {
            offenses: [offense]
        };
        const justMuted = false;
        const commentInstance = getComposeCommentWrapper({}).instance();
        expect(commentInstance.shouldShowMuteModal(muteStatus, justMuted)).toBe(false);
        global.Date.now = realDateNow;
    });

    test('shouldShowMuteModal is true when the user is already muted if the comment is a reply', () => {
        const realDateNow = Date.now.bind(global.Date);
        global.Date.now = () => 0;
        // Since Date.now mocked to 0 above, we just need a small number to make
        // it look like it was created < 2 minutes ago.
        const offense = {
            expiresAt: '1000',
            createdAt: '-60' // ~1 ago min given shouldShowMuteModal's conversions,
        };
        const muteStatus = {
            offenses: [offense]
        };
        const justMuted = false;
        const commentInstance = getComposeCommentWrapper({isReply: true}).instance();
        expect(commentInstance.shouldShowMuteModal(muteStatus, justMuted)).toBe(true);
        global.Date.now = realDateNow;
    });

    test('getMuteModalStartStep: not a reply', () => {
        const commentInstance = getComposeCommentWrapper({}).instance();
        expect(commentInstance.getMuteModalStartStep()).toBe(0);
    });

    test('getMuteModalStartStep: A reply that got them muted', () => {
        const commentInstance = getComposeCommentWrapper({isReply: true}).instance();
        act(() => {
            commentInstance.setState({
                status: 'REJECTED_MUTE'
            });
        });
        expect(commentInstance.getMuteModalStartStep()).toBe(0);
    });

    test('getMuteModalStartStep: A reply click when already muted', () => {
        const commentInstance = getComposeCommentWrapper({isReply: true}).instance();
        act(() => {
            commentInstance.setState({
                status: 'COMPOSE_DISALLOWED'
            });
        });
        expect(commentInstance.getMuteModalStartStep()).toBe(1);
    });

    test('isMuted: expiration is in the future', () => {
        const realDateNow = Date.now.bind(global.Date);
        global.Date.now = () => 0; // Set "now" to 0 for easier testing.

        const commentInstance = getComposeCommentWrapper({}).instance();
        act(() => {
            commentInstance.setState({muteExpiresAtMs: 100});
        });
        expect(commentInstance.isMuted()).toBe(true);
        global.Date.now = realDateNow;
    });

    test('isMuted: expiration is in the past', () => {
        const realDateNow = Date.now.bind(global.Date);
        global.Date.now = () => 0;

        const commentInstance = getComposeCommentWrapper({}).instance();
        act(() => {
            commentInstance.setState({muteExpiresAtMs: -100});
        });
        expect(commentInstance.isMuted()).toBe(false);
        global.Date.now = realDateNow;
    });

    test('isMuted: expiration is not set', () => {
        const realDateNow = Date.now.bind(global.Date);
        global.Date.now = () => 0;

        const commentInstance = getComposeCommentWrapper({}).instance();
        expect(commentInstance.isMuted()).toBe(false);
        global.Date.now = realDateNow;
    });

    test('getMuteMessageInfo: muteType set and just got muted', () => {
        const justMuted = true;
        const commentInstance = getComposeCommentWrapper({}).instance();
        act(() => {
            commentInstance.setState({muteType: 'unconstructive'});
        });
        expect(commentInstance.getMuteMessageInfo(justMuted).commentType).toBe('comment.type.unconstructive');
        expect(commentInstance.getMuteMessageInfo(justMuted)
            .muteStepContent[0]).toBe('comment.unconstructive.content1');
    });

    test('getMuteMessageInfo: muteType set and already muted', () => {
        const justMuted = false;
        const commentInstance = getComposeCommentWrapper({}).instance();
        act(() => {
            commentInstance.setState({muteType: 'pii'});
        });
        expect(commentInstance.getMuteMessageInfo(justMuted).commentType).toBe('comment.type.pii.past');
        // PII has the same content1 regardless of whether you were just muted
        expect(commentInstance.getMuteMessageInfo(justMuted).muteStepContent[0]).toBe('comment.pii.content1');

        act(() => {
            commentInstance.setState({muteType: 'vulgarity'});
        });
        expect(commentInstance.getMuteMessageInfo(justMuted).commentType).toBe('comment.type.vulgarity.past');
        expect(commentInstance.getMuteMessageInfo(justMuted).muteStepContent[0]).toBe('comment.type.vulgarity.past');
    });

    test('getMuteMessageInfo: muteType not set and just got muted', () => {
        const justMuted = true;
        const commentInstance = getComposeCommentWrapper({}).instance();
        expect(commentInstance.getMuteMessageInfo(justMuted).commentType).toBe('comment.type.general');
        // general has the same content1 regardless of whether you were just muted
        expect(commentInstance.getMuteMessageInfo(justMuted).muteStepContent[0]).toBe('comment.general.content1');
    });

    test('getMuteMessageInfo: muteType not set and already muted', () => {
        const justMuted = false;
        const commentInstance = getComposeCommentWrapper({}).instance();
        expect(commentInstance.getMuteMessageInfo(justMuted).commentType).toBe('comment.type.general.past');
    });

    test('getMuteMessageInfo: muteType set to something we don\'t have messages for and just got muted', () => {
        const justMuted = true;
        const commentInstance = getComposeCommentWrapper({}).instance();
        act(() => {
            commentInstance.setState({muteType: 'spaghetti'});
        });
        expect(commentInstance.getMuteMessageInfo(justMuted).commentType).toBe('comment.type.general');
    });

    test('getMuteMessageInfo: muteType set to something we don\'t have messages for and already muted', () => {
        const justMuted = false;
        const commentInstance = getComposeCommentWrapper({}).instance();
        act(() => {
            commentInstance.setState({muteType: 'spaghetti'});
        });
        expect(commentInstance.getMuteMessageInfo(justMuted).commentType).toBe('comment.type.general.past');
    });
});
