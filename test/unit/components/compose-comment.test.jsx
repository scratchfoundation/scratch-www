const React = require('react');
const {shallowWithIntl} = require('../../helpers/intl-helpers.jsx');
import {mountWithIntl} from '../../helpers/intl-helpers.jsx';
const ComposeComment = require('../../../src/views/preview/comment/compose-comment.jsx');
import configureStore from 'redux-mock-store';

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
        const wrapper = shallowWithIntl(
            <ComposeComment
                {...defaultProps()}
                {...props}

            />
            , {context: {store}}
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
        const component = getComposeCommentWrapper({});
        // Comment compsoe box is there
        expect(component.find('FlexRow.compose-comment').exists()).toEqual(true);
        // No error message
        expect(component.find('FlexRow.compose-error-row').exists()).toEqual(false);
        expect(component.find('MuteModal').exists()).toEqual(false);
        expect(component.find('CommentingStatus').exists()).toEqual(false);
        // Buttons start enabled
        expect(component.find('Button.compose-post').props().disabled).toBe(false);
        expect(component.find('Button.compose-cancel').props().disabled).toBe(false);

    });

    test('Error messages shows when comment rejected', () => {
        const component = getComposeCommentWrapper({});
        const commentInstance = component.instance();
        commentInstance.setState({
            error: 'isFlood',
            status: 'REJECTED'
        });
        component.update();
        expect(component.find('FlexRow.compose-error-row').exists()).toEqual(true);
        // Buttons stay enabled when comment rejected for non-mute reasons
        expect(component.find('Button.compose-post').props().disabled).toBe(false);
        expect(component.find('Button.compose-cancel').props().disabled).toBe(false);
    });

    test('No error message shows when comment rejected because user is already muted', () => {
        const component = getComposeCommentWrapper({});
        const commentInstance = component.instance();
        commentInstance.setState({
            error: 'isMuted',
            status: 'COMPOSE_DISALLOWED'
        });
        component.update();
        expect(component.find('FlexRow.compose-error-row').exists()).toEqual(false);
    });

    test('Comment Status shows but compose box does not when you load the page and you are already muted', () => {
        const realDateNow = Date.now.bind(global.Date);
        global.Date.now = () => 0;
        const component = getComposeCommentWrapper({});
        const commentInstance = component.instance();
        commentInstance.setState({muteExpiresAtMs: 100, status: 'COMPOSE_DISALLOWED'});
        component.update();
        
        // Compose box should be hidden if muted unless they got muted due to a comment they just posted.
        expect(component.find('FlexRow.compose-comment').exists()).toEqual(false);
        expect(component.find('MuteModal').exists()).toEqual(false);
        expect(component.find('CommentingStatus').exists()).toEqual(true);
        global.Date.now = realDateNow;
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
        const component = mountWithIntl(
            <ComposeComment
                {...defaultProps()}
                isReply
            />
            , {context: {store}}
        );
        expect(component.find('FlexRow.compose-comment').exists()).toEqual(false);
        expect(component.find('MuteModal').exists()).toBe(true);
        expect(component.find('MuteModal').props().startStep).toBe(1);
        expect(component.find('CommentingStatus').exists()).toEqual(false);
        global.Date.now = realDateNow;
    });

    test('Comment Status and compose box show on replies when not muted', () => {
        const realDateNow = Date.now.bind(global.Date);
        global.Date.now = () => 0;
        const component = getComposeCommentWrapper({isReply: true});
        expect(component.find('FlexRow.compose-comment').exists()).toEqual(true);
        expect(component.find('CommentingStatus').exists()).toEqual(false);
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
        const component = getComposeCommentWrapper({}, mutedStore);
        const commentInstance = component.instance();
        // Check conversion to ms from seconds is done at init time.
        expect(commentInstance.state.muteExpiresAtMs).toEqual(5 * 1000);
        // Check we setup a timeout to expire the widget when timeout reached.
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5 * 1000);
        expect(commentInstance.state.showWarning).toBe(true);
        // Compose box should be hidden if muted unless they got muted due to a comment they just posted.
        expect(component.find('FlexRow.compose-comment').exists()).toEqual(false);
        expect(component.find('MuteModal').exists()).toEqual(false);
        expect(component.find('CommentingStatus').exists()).toEqual(true);
        global.Date.now = realDateNow;
    });
    
    test('Comment Status shows when user just submitted a reply comment that got them muted', () => {
        const realDateNow = Date.now.bind(global.Date);
        global.Date.now = () => 0;
        const component = getComposeCommentWrapper({isReply: true});
        const commentInstance = component.instance();
        commentInstance.setState({
            status: 'REJECTED_MUTE',
            muteExpiresAtMs: 100
        });
        component.update();
        expect(component.find('FlexRow.compose-comment').exists()).toEqual(true);
        expect(component.find('MuteModal').exists()).toEqual(false);
        expect(component.find('CommentingStatus').exists()).toEqual(true);
        // Compose box exists but is disabled
        expect(component.find('InplaceInput.compose-input').exists()).toEqual(true);
        expect(component.find('InplaceInput.compose-input').props().disabled).toBe(true);
        expect(component.find('Button.compose-post').props().disabled).toBe(true);
        expect(component.find('Button.compose-cancel').props().disabled).toBe(true);
        global.Date.now = realDateNow;
    });

    test('Comment Status shows when user just submitted a comment that got them muted', () => {
        const realDateNow = Date.now.bind(global.Date);
        global.Date.now = () => 0;
        const component = getComposeCommentWrapper({});
        const commentInstance = component.instance();
        commentInstance.setState({
            status: 'REJECTED_MUTE',
            muteExpiresAtMs: 100
        });
        component.update();
        expect(component.find('FlexRow.compose-comment').exists()).toEqual(true);
        expect(component.find('MuteModal').exists()).toEqual(false);
        expect(component.find('CommentingStatus').exists()).toEqual(true);
        // Compose box exists but is disabled
        expect(component.find('InplaceInput.compose-input').exists()).toEqual(true);
        expect(component.find('InplaceInput.compose-input').props().disabled).toBe(true);
        expect(component.find('Button.compose-post').props().disabled).toBe(true);
        expect(component.find('Button.compose-cancel').props().disabled).toBe(true);
        global.Date.now = realDateNow;
    });
    test('Comment Error does not show for mutes', () => {
        const realDateNow = Date.now.bind(global.Date);
        global.Date.now = () => 0;
        const component = getComposeCommentWrapper({});
        const commentInstance = component.instance();
        commentInstance.setState({
            status: 'REJECTED_MUTE',
            error: 'a mute error'
        });
        component.update();
        expect(component.find('FlexRow.compose-error-row').exists()).toEqual(false);
        expect(component.find('FlexRow.compose-comment').exists()).toEqual(true);
        global.Date.now = realDateNow;
    });
    test('Comment Error does show for non-mute errors', () => {
        const component = getComposeCommentWrapper({});
        const commentInstance = component.instance();
        commentInstance.setState({
            error: 'some error',
            status: 'REJECTED'
        });
        component.update();
        expect(component.find('FlexRow.compose-error-row').exists()).toEqual(true);
        expect(component.find('FlexRow.compose-comment').exists()).toEqual(true);
        expect(component.find('InplaceInput.compose-input').exists()).toEqual(true);
        expect(component.find('InplaceInput.compose-input').props().disabled).toBe(false);
        expect(component.find('Button.compose-post').props().disabled).toBe(false);
        expect(component.find('Button.compose-cancel').props().disabled).toBe(false);
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
        const component = mountWithIntl(
            <ComposeComment
                {...defaultProps()}
            />
            , {context: {store}}
        );
        // set state on the ComposeComment component, not the wrapper
        const commentInstance = component.find('ComposeComment').instance();
        commentInstance.setState({muteOpen: true});
        component.update();
        expect(component.find('MuteModal').exists()).toEqual(true);
        expect(component.find('MuteModal').props().startStep).toEqual(0);
        expect(component.find('MuteModal').props().showWarning).toBe(false);
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
        const component = mountWithIntl(
            <ComposeComment
                {...defaultProps()}
            />
            , {context: {store}}
        );
        // set state on the ComposeComment component, not the wrapper
        const commentInstance = component.find('ComposeComment').instance();
        commentInstance.setState({muteOpen: true});
        component.update();
        expect(component.find('MuteModal').exists()).toEqual(true);
        expect(component.find('MuteModal').props().showWarning).toBe(false);
        commentInstance.setState({
            muteOpen: true,
            showWarning: true
        });
        component.update();
        expect(component.find('MuteModal').props().showWarning).toBe(true);
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

        const component = mountWithIntl(
            <ComposeComment
                {...defaultProps()}
            />
            , {context: {store}}
        );

        const commentInstance = component.find('ComposeComment').instance();
        commentInstance.setState({
            status: 'REJECTED_MUTE',
            error: 'isBad',
            muteOpen: true
        });

        component.update();
        expect(component.find('MuteModal').exists()).toEqual(true);
        expect(component.find('MuteModal').props().showFeedback).toBe(true);

        commentInstance.setState({
            status: 'COMPOSE_DISALLOWED',
            error: 'isMute',
            showWarning: true,
            muteOpen: true
        });

        component.update();
        expect(component.find('MuteModal').exists()).toEqual(true);
        expect(component.find('MuteModal').props().showFeedback).toBe(false);

        commentInstance.setState({
            status: 'REJECTED',
            error: 'isBad',
            showWarning: true,
            muteOpen: true
        });

        component.update();
        expect(component.find('MuteModal').exists()).toEqual(true);
        expect(component.find('MuteModal').props().showFeedback).toBe(false);
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
        commentInstance.setState({
            status: 'REJECTED_MUTE'
        });
        expect(commentInstance.getMuteModalStartStep()).toBe(0);
    });

    test('getMuteModalStartStep: A reply click when already muted', () => {
        const commentInstance = getComposeCommentWrapper({isReply: true}).instance();
        commentInstance.setState({
            status: 'COMPOSE_DISALLOWED'
        });
        expect(commentInstance.getMuteModalStartStep()).toBe(1);
    });

    test('isMuted: expiration is in the future', () => {
        const realDateNow = Date.now.bind(global.Date);
        global.Date.now = () => 0; // Set "now" to 0 for easier testing.

        const commentInstance = getComposeCommentWrapper({}).instance();
        commentInstance.setState({muteExpiresAtMs: 100});
        expect(commentInstance.isMuted()).toBe(true);
        global.Date.now = realDateNow;
    });

    test('isMuted: expiration is in the past', () => {
        const realDateNow = Date.now.bind(global.Date);
        global.Date.now = () => 0;

        const commentInstance = getComposeCommentWrapper({}).instance();
        commentInstance.setState({muteExpiresAtMs: -100});
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
        commentInstance.setState({muteType: 'unconstructive'});
        expect(commentInstance.getMuteMessageInfo(justMuted).commentType).toBe('comment.type.unconstructive');
        expect(commentInstance.getMuteMessageInfo(justMuted)
            .muteStepContent[0]).toBe('comment.unconstructive.content1');
    });

    test('getMuteMessageInfo: muteType set and already muted', () => {
        const justMuted = false;
        const commentInstance = getComposeCommentWrapper({}).instance();
        commentInstance.setState({muteType: 'pii'});
        expect(commentInstance.getMuteMessageInfo(justMuted).commentType).toBe('comment.type.pii.past');
        // PII has the same content1 regardless of whether you were just muted
        expect(commentInstance.getMuteMessageInfo(justMuted).muteStepContent[0]).toBe('comment.pii.content1');

        commentInstance.setState({muteType: 'vulgarity'});
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
        commentInstance.setState({muteType: 'spaghetti'});
        expect(commentInstance.getMuteMessageInfo(justMuted).commentType).toBe('comment.type.general');
    });

    test('getMuteMessageInfo: muteType set to something we don\'t have messages for and already muted', () => {
        const justMuted = false;
        const commentInstance = getComposeCommentWrapper({}).instance();
        commentInstance.setState({muteType: 'spaghetti'});
        expect(commentInstance.getMuteMessageInfo(justMuted).commentType).toBe('comment.type.general.past');
    });
});
