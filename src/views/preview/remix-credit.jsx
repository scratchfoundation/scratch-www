const React = require('react');
const FlexRow = require('../../components/flex-row/flex-row.jsx');
const Avatar = require('../../components/avatar/avatar.jsx');
const projectShape = require('./projectshape.jsx').projectShape;

const RemixCredit = props => {
    const projectInfo = props.projectInfo;
    if (Object.keys(projectInfo).length === 0) return null;
    return (
        <FlexRow className="remix-credit">
            <Avatar
                className="remix"
                src={`https://cdn2.scratch.mit.edu/get_image/user/${projectInfo.author.id}_48x48.png`}
            />
            <div className="credit-text">
                Thanks to <a
                    href={`/users/${projectInfo.author.username}`}
                >
                    {projectInfo.author.username}
                </a> for the original project <a
                    href={`/preview/${projectInfo.id}`}
                >
                    {projectInfo.title}
                </a>.
            </div>
        </FlexRow>
    );
};

RemixCredit.propTypes = {
    projectInfo: projectShape
};

module.exports = RemixCredit;
