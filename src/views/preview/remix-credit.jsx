const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;
const FlexRow = require('../../components/flex-row/flex-row.jsx');
const Avatar = require('../../components/avatar/avatar.jsx');
const projectShape = require('./projectshape.jsx').projectShape;
const thumbnailUrl = require('../../lib/user-thumbnail');

const RemixCredit = props => {
    const projectInfo = props.projectInfo;
    if (Object.keys(projectInfo).length === 0) return null;
    if (!projectInfo.author) return null;
    return (
        <FlexRow className="remix-credit">
            <Avatar
                className="remix"
                src={thumbnailUrl(projectInfo.author.id, 48)}
            />
            <div className="credit-text">
                <FormattedMessage
                    id="project.credit"
                    values={{
                        userLink: (
                            <a href={`/users/${projectInfo.author.username}`}>
                                {projectInfo.author.username}
                            </a>
                        ),
                        projectLink: (
                            <a
                                href={`/projects/${projectInfo.id}`}
                                title={projectInfo.title}
                            >
                                {projectInfo.title}
                            </a>
                        )
                    }}
                />
            </div>
        </FlexRow>
    );
};

RemixCredit.propTypes = {
    projectInfo: projectShape
};

module.exports = RemixCredit;
