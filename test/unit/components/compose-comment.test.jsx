const React = require('react');
const {shallowWithIntl} = require('../../helpers/intl-helpers.jsx');
const ComposeComment = require('../../../src/views/preview/comment/compose-comment.jsx');
import configureStore from 'redux-mock-store';


describe('Compose Comment test', () => {
    const mockStore = configureStore();
    const defaultProps = () =>({
        user: {
            thumbnailUrl: 'scratch.mit.edu',
            username: 'auser'
        }
    });

    let store;
    beforeEach(() => {
        store = mockStore({
            session: {
                session: {
                    user: {}
                }

            }
        });
    });

    const getComposeCommentWrapper = props => {
        const wrapper = shallowWithIntl(
            <ComposeComment
                {...defaultProps()}
                {...props}

            />
            , {context: {store}}
        );
        return wrapper.dive(); // unwrap redux connect(injectIntl(JoinFlow))
    };

    test('Modal & Comment status do not show ', () => {
        const component = getComposeCommentWrapper({});
        // Comment compsoe box is there
        expect(component.find('FlexRow.compose-comment').exists()).toEqual(true);
        // No error message
        expect(component.find('FlexRow.compose-error-row').exists()).toEqual(false);
        expect(component.find('MuteModal').exists()).toEqual(false);
        expect(component.find('CommentingStatus').exists()).toEqual(false);
    });

    test('Error messages shows when comment rejected ', () => {
        const component = getComposeCommentWrapper({});
        const commentInstance = component.instance();
        commentInstance.setState({error: 'isFlood'});
        component.update();
        expect(component.find('FlexRow.compose-error-row').exists()).toEqual(true);
    });

    test('No error message shows when comment rejected because user muted ', () => {
        const component = getComposeCommentWrapper({});
        const commentInstance = component.instance();
        commentInstance.setState({
            error: 'isMuted',
            status: 'REJECTED_MUTE'
        });
        component.update();
        expect(component.find('FlexRow.compose-error-row').exists()).toEqual(false);
    });

    test('Comment Status shows when state is REJECTED_MUTE ', () => {
        const component = getComposeCommentWrapper({});
        const commentInstance = component.instance();
        commentInstance.setState({status: 'REJECTED_MUTE'});
        component.update();
        expect(component.find('FlexRow.compose-comment').exists()).toEqual(true);
        expect(component.find('MuteModal').exists()).toEqual(false);
        expect(component.find('CommentingStatus').exists()).toEqual(true);
    });

    test('Mute Modal shows when muteOpen is true ', () => {
        const component = getComposeCommentWrapper({});
        const commentInstance = component.instance();
        commentInstance.setState({muteOpen: true});
        component.update();
        expect(component.find('FlexRow.compose-comment').exists()).toEqual(true);
        expect(component.find('MuteModal').exists()).toEqual(true);
    });

    test('shouldShowMuteModal is false when list is undefined ', () => {
        const commentInstance = getComposeCommentWrapper({}).instance();
        expect(commentInstance.shouldShowMuteModal()).toBe(false);
    });

    test('shouldShowMuteModal is false when list empty ', () => {
        const offenses = [];
        const commentInstance = getComposeCommentWrapper({}).instance();
        expect(commentInstance.shouldShowMuteModal(offenses)).toBe(false);
    });

    test('shouldShowMuteModal is true when only 1 recent offesnse ', () => {
        const offenses = [];
        const realDateNow = Date.now.bind(global.Date);
        global.Date.now = () => 0;
        // Since Date.now mocked to 0 above, we just need a small number to make
        // it look like it was created < 2 minutes ago.
        const offense = {
            expiresAt: '1000',
            createdAt: '-60' // ~1 ago min given shouldShowMuteModal's conversions,
        };
        offenses.push(offense);
        const commentInstance = getComposeCommentWrapper({}).instance();
        expect(commentInstance.shouldShowMuteModal(offenses)).toBe(true);
        global.Date.now = realDateNow;
    });

    test('shouldShowMuteModal is false when multiple offenses, even if 1 is recent ', () => {
        const offenses = [];
        const realDateNow = Date.now.bind(global.Date);
        global.Date.now = () => 0;
        // Since Date.now mocked to 0 above, we just need a small number to make
        // it look like it was created more than 2 minutes ago.
        let offense = {
            expiresAt: '1000',
            createdAt: '-119' // just shy of two min ago
        };
        offenses.push(offense);
        offense.createdAt = '-180'; // 3 minutes ago;
        offenses.push(offense);
        const commentInstance = getComposeCommentWrapper({}).instance();
        expect(commentInstance.shouldShowMuteModal(offenses)).toBe(false);
        global.Date.now = realDateNow;
    });

});
