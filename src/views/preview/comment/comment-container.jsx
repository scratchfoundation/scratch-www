const React = require('react');
const PropTypes = require('prop-types');

const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const Comment = require('./comment.jsx');

require('./comment.scss');

const TEST_REPLIES = [{
    id: 49856950,
    parent_id: 49855470,
    content: 'Thanks! :)',
    datetime_created: '2015-10-24T22:58:58.000Z',
    datetime_modified: '2015-10-24T22:58:58.000Z',
    author: {
        id: 36977,
        username: 'technoboy10',
        image: 'https://cdn2.scratch.mit.edu/get_image/user/36977_60x60.png'
    },
    reply_count: 0
}, {
    id: 49857282,
    parent_id: 49855470,
    // eslint-disable-next-line max-len
    content: 'i like it when scratchers legitly remix things and not just recolor things. u want some waffles _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_ _waffle_',
    datetime_created: '2015-10-24T23:02:42.000Z',
    datetime_modified: '2015-10-24T23:02:42.000Z',
    author: {
        id: 4351253,
        username: 'CreeperDudeEX',
        image: 'https://cdn2.scratch.mit.edu/get_image/user/4351253_60x60.png'
    },
    reply_count: 0
}, {
    id: 53664195,
    parent_id: 49855470,
    content: 'Ewww! 3 month old waffles!',
    datetime_created: '2016-01-14T09:16:37.000Z',
    datetime_modified: '2016-01-14T09:16:37.000Z',
    author: {
        id: 199051,
        username: 'fireaction2001',
        image: 'https://cdn2.scratch.mit.edu/get_image/user/199051_60x60.png'
    },
    reply_count: 0
}, {
    id: 53668081,
    parent_id: 49855470,
    content: 'Haha xD',
    datetime_created: '2016-01-14T14:25:01.000Z',
    datetime_modified: '2016-01-14T14:25:01.000Z',
    author: {
        id: 36977,
        username: 'technoboy10',
        image: 'https://cdn2.scratch.mit.edu/get_image/user/36977_60x60.png'
    },
    reply_count: 0
}, {
    id: 53668426,
    parent_id: 49855470,
    content: 'xD',
    datetime_created: '2016-01-14T14:41:04.000Z',
    datetime_modified: '2016-01-14T14:41:04.000Z',
    author: {
        id: 199051,
        username: 'fireaction2001',
        image: 'https://cdn2.scratch.mit.edu/get_image/user/199051_60x60.png'
    },
    reply_count: 0
}, {
    id: 53687383,
    parent_id: 49855470,
    content: 'xD 3 months yet so many artificial preservatives it only expires on 7025',
    datetime_created: '2016-01-14T23:23:33.000Z',
    datetime_modified: '2016-01-14T23:23:33.000Z',
    author: {
        id: 4351253,
        username: 'CreeperDudeEX',
        image: 'https://cdn2.scratch.mit.edu/get_image/user/4351253_60x60.png'
    },
    reply_count: 0
}, {
    id: 53700627,
    parent_id: 49855470,
    // eslint-disable-next-line max-len
    content: "Introducing, the McWaffle! Made of 1.00% REAL plastic! No artificial preservatives added... Well, except for (3 hours lator) and we can't forget about (3 hours latoror) and finally, bleach! Buy one now and get 7 for DOUBLE the price! What a bargain! Only at McDonalds!",
    datetime_created: '2016-01-15T04:52:13.000Z',
    datetime_modified: '2016-01-15T04:52:13.000Z',
    author: {
        id: 199051,
        username: 'fireaction2001',
        image: 'https://cdn2.scratch.mit.edu/get_image/user/199051_60x60.png'
    },
    reply_count: 0
}, {
    id: 53711678,
    parent_id: 49855470,
    // eslint-disable-next-line max-len
    content: 'NOW GET THE SUPER MC WAFFLE FILLED WITH BLEACH ARtificial hormones, and other chemicals you all know and hate. so get now for 0.0001 DOLAORS TO BUUY TEMMIE COLLAG',
    datetime_created: '2016-01-15T16:49:33.000Z',
    datetime_modified: '2016-01-15T16:49:33.000Z',
    author: {
        id: 4351253,
        username: 'CreeperDudeEX',
        image: 'https://cdn2.scratch.mit.edu/get_image/user/4351253_60x60.png'
    },
    reply_count: 0
}, {
    id: 53743336,
    parent_id: 49855470,
    content: 'OH MAH GAAAAAWWWWDDDDD!!!!11!!!! I NEAD DAT STUPH',
    datetime_created: '2016-01-16T04:05:29.000Z',
    datetime_modified: '2016-01-16T04:05:29.000Z',
    author: {
        id: 199051,
        username: 'fireaction2001',
        image: 'https://cdn2.scratch.mit.edu/get_image/user/199051_60x60.png'
    },
    reply_count: 0
}];

const CommentContainer = ({
    author,
    content,
    datetime_created,
    id,
    parent_id,
    reply_count
}) => (
    <FlexRow className="comment-container">
        <Comment {...{author, content, datetime_created, id}} />
        {reply_count > 0 && id === 49855470 && // eslint-disable-line camelcase
            <FlexRow
                className="replies column"
                key={parent_id} // eslint-disable-line camelcase
            >
                {TEST_REPLIES.map(reply => (
                    <Comment
                        {...reply}
                        key={reply.id}
                    />
                ))}
            </FlexRow>
        }
    </FlexRow>
);

CommentContainer.propTypes = {
    author: PropTypes.shape({
        id: PropTypes.number,
        image: PropTypes.string,
        username: PropTypes.string
    }),
    content: PropTypes.string,
    datetime_created: PropTypes.string,
    id: PropTypes.number,
    parent_id: PropTypes.number,
    reply_count: PropTypes.number
};

module.exports = CommentContainer;
