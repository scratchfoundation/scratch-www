var React = require('react');

var Box = require('../../../components/box/box.jsx');
var Carousel = require('../../../components/carousel/carousel.jsx');

require('./splash.scss');

var ShuffledRows = (props) => {
    var formatMessage = props.intl.formatMessage;
    return (
        <div>
            <Box title={
                        formatMessage({
                            id: 'splash.communityRemixing',
                            defaultMessage: 'What the Community is Remixing' })}
                 key="community_most_remixed_projects">

                <Carousel items={props.topRemixed}
                          showRemixes={true} />
            </Box>
            <Box title={
                        formatMessage({
                            id: 'splash.communityLoving',
                            defaultMessage: 'What the Community is Loving' })}
                 key="community_most_loved_projects">

                <Carousel items={props.topLoved}
                          showLoves={true} />
            </Box>
        </div>
    );
};

module.exports = ShuffledRows;
