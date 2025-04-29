const PropTypes = require('prop-types');
const React = require('react');

const Box = require('../box/box.jsx');

require('./news.scss');

const defaultItems = require('./news.json');

const News = ({
    items = defaultItems,
    messages = {
        'general.viewAll': 'View All',
        'news.scratchNews': 'Scratch News'
    }
}) => (
    <Box
        className="news"
        moreHref="/discuss/5/"
        moreTitle={messages['general.viewAll']}
        title={messages['news.scratchNews']}
    >
        <ul>
            {items.map(item => (
                <li key={item.id}>
                    <a href={item.url}>
                        <img
                            alt=""
                            className="news-image"
                            height="53"
                            src={item.image}
                            width="53"
                        />
                        <div className="news-description">
                            <h4>{item.headline}</h4>
                            <p>{item.copy}</p>
                        </div>
                    </a>
                </li>
            ))}
        </ul>
    </Box>
);

News.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    messages: PropTypes.shape({
        'general.viewAll': PropTypes.string,
        'news.scratchNews': PropTypes.string
    })
};

module.exports = News;
