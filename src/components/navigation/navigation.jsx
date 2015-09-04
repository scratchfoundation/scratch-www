var React = require('react');

require('./navigation.scss');

module.exports = React.createClass({
    render: function () {
        return (
            <div className="inner">
                <ul>
                    <li className="logo"><a href="/"></a></li>
                    
                    <li className="link"><a href="/projects/editor">Create</a></li>
                    <li className="link"><a href="/explore">Explore</a></li>
                    <li className="link"><a href="/discuss">Discuss</a></li>
                    <li className="link"><a href="/about">About</a></li>
                    <li className="link"><a href="/help">Help</a></li>

                    <li className="search">
                        <form action="/search/google_results" method="get">
                            <input type="submit" value="" />
                            <input type="text" placeholder="Search" name="q" />
                            <input type="hidden" name="date" value="anytime" />
                            <input type="hidden" name="sort_by" value="datetime_shared" />
                        </form>
                    </li>

                    <li className="link right"><a href="/join">Join Scratch</a></li>
                    <li className="link right"><a href="">Sign In</a></li>
                </ul>
            </div>
        );
    }
});
