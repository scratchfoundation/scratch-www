var React = require('react');

var Box = require('../../../components/box/box.jsx');
var Carousel = require('../../../components/carousel/carousel.jsx');

require('./splash.scss');

var CustomRows = React.createClass({
    type: 'CustomRows',
    getDefaultProps: function () {
        return {
            featured: {}
        };
    },
    render: function () {
        var formatMessage = this.props.intl.formatMessage;
        return (
            <div>
                <Box title={
                        formatMessage({
                            id: 'splash.projectsByScratchersFollowing',
                            defaultMessage: 'Projects by Scratchers I\'m Following'})}
                     key="custom_projects_by_following">

                    <Carousel items={this.props.featured.custom_projects_by_following} />
                </Box>
                <Box title={
                        formatMessage({
                            id: 'splash.projectsLovedByScratchersFollowing',
                            defaultMessage: 'Projects Loved by Scratchers I\'m Following'})}
                     key="custom_projects_loved_by_following">

                    <Carousel items={this.props.featured.custom_projects_loved_by_following} />
                </Box>
                <Box title={
                        formatMessage({
                            id:'splash.projectsInStudiosFollowing',
                            defaultMessage: 'Projects in Studios I\'m Following'})}
                     key="custom_projects_in_studios_following">

                    <Carousel items={this.props.featured.custom_projects_in_studios_following} />
                </Box>
            </div>
        );
    }
});

module.exports = CustomRows;
