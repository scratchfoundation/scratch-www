const React = require('react');

const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const InplaceInput = require('../../../components/forms/inplace-input.jsx');
const Button = require('../../../components/forms/button.jsx');

require('./comment.scss');

const onUpdate = update => update;

const ComposeComment = () => (
    <FlexRow className="compose-comment column">
        <InplaceInput
            handleUpdate={onUpdate}
            name="compose-comment"
            type="textarea"
        />
        <FlexRow className="compose-bottom-row">
            <Button className="compose-post">Post</Button>
            <Button className="compose-cancel">Cancel</Button>
            <span className="compose-limit">500 characters left</span>
        </FlexRow>
    </FlexRow>
);

module.exports = ComposeComment;
