var React = require('react');

var Box = require('../../components/box/box.jsx');
var Carousel = require('../../components/carousel/carousel.jsx');

require('./splash.scss');

var CustomRows = React.createClass({
    type: 'CustomRows',
    getDefaultProps: function () {
        return {
            featured: {}
        };
    },
    rowMap: {
        custom_projects_by_following: {
            id: 'splash.projectsByScratchersFollowing',
            defaultMessage: 'Projects by Scratchers I\'m Following'
        },
        custom_projects_loved_by_following: {
            id: 'splash.projectsLovedByScratchersFollowing',
            defaultMessage: 'Projects Loved by Scratchers I\'m Following'
        },
        custom_projects_in_studios_following: {
            id: 'splash.projectsInStudiosFollowing',
            defaultMessage: 'Projects in Studios I\'m Following'
        }
    },
    componentWillReceiveProps: function (){
        var formatMessage = this.props.intl.formatMessage;
        var rows = [];
        var keys = Object.keys(this.props.featured);
        for (var i=0; i < keys.length; i++){
            if (this.props.featured[keys[i]]){
                if (this.props.featured[keys[i]].length > 0) {
                    rows.push(
                        <Box title={
                                formatMessage({
                                    id: this.rowMap[keys[i]].id,
                                    defaultMessage: this.rowMap[keys[i]].defaultMessage})}
                             key={keys[i]}>

                            <Carousel items={this.props.featured[keys[i]]} />
                        </Box>
                    );
                    /*TODO: This seems really messy to me,
                     * although not *technically* against the container/presentation split.
                     */
                }
            }
        }
    },
    render: function () {
        var formatMessage = this.props.intl.formatMessage;
        var rows = [];
        var keys = Object.keys(this.props.featured);
        for (var i=0; i < keys.length; i++){
            if (this.props.featured[keys[i]]){
                if (this.props.featured[keys[i]].length > 0) {
                    rows.push(
                        <Box title={
                                formatMessage({
                                    id: this.rowMap[keys[i]].id,
                                    defaultMessage: this.rowMap[keys[i]].defaultMessage})}
                             key={keys[i]}>

                            <Carousel items={this.props.featured[keys[i]]} />
                        </Box>
                    );
                    /*TODO: This seems really messy to me,
                     * although not *technically* against the container/presentation split.
                     */
                }
            }
        }
        return (
            <div>
                {rows}
            </div>
        );
    }
});

module.exports = CustomRows;

/*
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
*/
