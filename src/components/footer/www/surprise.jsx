const React = require('react');
const injectIntl = require('react-intl').injectIntl;

const api = require('../../../lib/api');

class Surprise extends React.Component {
    constructor (props) {
        super(props);
        this.state = {clicked: 0, scoreDisplay: {}, elapsed: 0, mousex: 0, mousey: 0};

        this.handleClick = this.handleClick.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.tick = this.tick.bind(this);
    }

    handleMouseMove (e) {
        this.setState({mousex: e.screenX, mousey: e.screenY});
    }

    handleClick () {
        this.postClick((err, count) => {
            const next = this.state.clicked + 1;
            if (err) this.setState({clicked: next});
            else this.setState({clicked: Math.max(count, next)});

            this.setState({
                scoreDisplay: {
                    fontSize: `4em`,
                    fontWeight: 'bold',
                    position: 'absolute',
                    left: this.state.mousex + (25 - (Math.random() * 50)),
                    top: this.state.mousey + (window.pageYOffset - 75) - (Math.random() * 50),
                    userSelect: 'none'
                },
                elapsed: 0
            });

            if (this.state.interval) clearInterval(this.state.interval);

            this.setState({
                interval: setInterval(this.tick, 100)
            });
        });
    }

    postClick (callback) {
        api({
            method: 'post',
            uri: '/surprise'
        }, (err, body) => {
            if (err) return callback(err);
            try {
                return callback(null, body.surprise);
            } catch (e) {
                return callback('404');
            }
        });
    }

    tick () {
        this.setState(prevState => ({elapsed: prevState.elapsed + 1}));
    }

    getScore () {
        if (this.state.elapsed < 11) {
            const scoreStyle = Object.assign({}, this.state.scoreDisplay);
            scoreStyle.opacity = 1 - (this.state.elapsed / 10);
            scoreStyle.top = scoreStyle.top - (this.state.elapsed * 10);

            return <div style={scoreStyle}>+{this.state.clicked}</div>;
        }
    }

    render () {
        return (
            <div onMouseMove={this.handleMouseMove}>
                <a
                    style={{userSelect: 'none'}}
                    onClick={this.handleClick}
                >
                Surprise
                </a>
                {this.state.clicked > 0 ? this.getScore() : ''}
            </div>
        );
    }
}

module.exports = injectIntl(Surprise);
