const classNames = require('classnames');
const omit = require('lodash.omit');
const PropTypes = require('prop-types');
const React = require('react');
const Avatar = require('../../components/avatar/avatar.jsx');

const PeopleGrid = props => (
    <ul className="avatar-grid">
        {props.people.map((person, index) => (
            <li
                className="avatar-item"
                key={`person-${index}`}
            >
                <div>
                    {person.userName ? (
                        <a href={`https://scratch.mit.edu/users/${person.userName}/`}>
                            <Avatar
                                alt=""
                                src={`https://cdn.scratch.mit.edu/get_image/user/${person.userId || 'default'}_80x80.png`}
                            />
                        </a>
                    ) : (
                        /* if userName is not given, there's no chance userId is given */
                        <Avatar
                            alt=""
                            src={`https://cdn.scratch.mit.edu/get_image/user/default_80x80.png`}
                        />
                    )}
                </div>
                <span className="avatar-text">
                    {person.name}
                </span>
            </li>
        ))}
    </ul>
);

PeopleGrid.propTypes = {
    people: PropTypes.arrayOf(PropTypes.shape({
    	userName: PropTypes.string,
    	userId: PropTypes.number,
    	name: PropTypes.string
    }))
};

module.exports = PeopleGrid;