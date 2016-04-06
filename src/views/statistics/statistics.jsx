var Chart = require('react-google-charts').Chart;
var classNames = require('classnames');
var FormattedMessage = require('react-intl').FormattedMessage;
var React = require('react');

var render = require('../../lib/render.jsx');
var Api = require('../../mixins/api.jsx');
var Box = require('../../components/box/box.jsx');

require('./statistics.scss');

function formatRowDate (raw_rows) {
    var rows = [];
    raw_rows.forEach(function (value) {
        var new_row = value;
        new_row[0] = new Date(1000*value[0]);
        rows.push(new_row);
    });
    return rows;
}

var MonthlyActivity = React.createClass({
    mixins: [
        Api
    ],

    getInitialState: function () {
        return {
            options: {
                hAxis: {title: 'Month/Year'},
                vAxis: {title: 'Count'},
                height: 400,
                colors: ['#25AFF4', '#F49D25', '#B3B3B3'],
                tooltip: {isHtml: true}
            },
            chartType: 'LineChart',
            div_id: 'monthlyActivityGraph'
        };
    },
    getData: function () {
        this.api({
            uri: '/statistics/monthly/overview'
        }, function (err, body) {
            if (!err) {
                this.setState({
                    rows: formatRowDate(body.chartData.monthlyActivity.rows),
                    columns: body.chartData.monthlyActivity.columns
                });
            }
        }.bind(this));
    },
    componentDidMount: function () {
        this.getData();
    },
    render: function () {
        return (
            <Chart chartType={this.state.chartType}
                chartPackages={['corechart', 'treemap']}
                rows={this.state.rows}
                columns={this.state.columns}
                options = {this.state.options}
                graph_id={this.state.div_id}  />
        );
    }
});

var MonthlyCommentActivity = React.createClass({
    mixins: [
        Api
    ],

    getInitialState: function () {
        return {
            options: {
                hAxis: {title: 'Month/Year'},
                vAxis: {title: 'Count'},
                height: 400,
                isStacked: true,
                colors: ['#25AFF4', '#F49D25', '#B3B3B3'],
                tooltip: {isHtml: true}
            },
            chartType: 'AreaChart',
            div_id: 'monthlyCommentActivityGraph'
        };
    },
    getData: function () {
        this.api({
            uri: '/statistics/monthly/overview'
        }, function (err, body) {
            if (!err) {
                this.setState({
                    rows: formatRowDate(body.chartData.monthlyComments.rows),
                    columns: body.chartData.monthlyComments.columns
                });
            }
        }.bind(this));
    },
    componentDidMount: function () {
        this.getData();
    },
    render: function () {
        return (
            <Chart chartType={this.state.chartType}
                chartPackages={['corechart', 'treemap']}
                rows={this.state.rows}
                columns={this.state.columns}
                options = {this.state.options}
                graph_id={this.state.div_id}  />
        );
    }
});

var MonthlyUserActivity = React.createClass({
    mixins: [
        Api
    ],

    getInitialState: function () {
        return {
            options: {
                hAxis: {title: 'Month/Year'},
                vAxis: {title: 'Count'},
                height: 400,
                colors: ['#25AFF4', '#F49D25', '#B3B3B3'],
                tooltip: {isHtml: true}
            },
            chartType: 'LineChart',
            div_id: 'monthlyUserActivityGraph'
        };
    },
    getData: function () {
        this.api({
            uri: '/statistics/monthly/user/overview'
        }, function (err, body) {
            if (!err) {
                this.setState({
                    rows: formatRowDate(body.chartData.monthlyUserActivity.rows),
                    columns: body.chartData.monthlyUserActivity.columns
                });
            }
        }.bind(this));
    },
    componentDidMount: function () {
        this.getData();
    },
    render: function () {
        return (
            <Chart chartType={this.state.chartType}
                chartPackages={['corechart', 'treemap']}
                rows={this.state.rows}
                columns={this.state.columns}
                options = {this.state.options}
                graph_id={this.state.div_id}  />
        );
    }
});

var AgeDistribution = React.createClass({
    mixins: [
        Api
    ],

    getInitialState: function () {
        return {
            options: {
                hAxis: {title: 'Age'},
                vAxis: {title: 'Count'},
                height: 400,
                legend: { position: 'none' },
                colors: ['#25AFF4', '#F49D25', '#B3B3B3'],
                tooltip: {isHtml: true}
            },
            chartType: 'ColumnChart',
            div_id: 'ageDistributionGraph'
        };
    },
    getData: function () {
        this.api({
            uri: '/statistics/age/overview'
        }, function (err, body) {
            if (!err) {
                this.setState({
                    rows: body.chartData.ageDistribution.rows,
                    columns: body.chartData.ageDistribution.columns
                });
            }
        }.bind(this));
    },
    componentDidMount: function () {
        this.getData();
    },
    render: function () {
        return (
            <Chart chartType={this.state.chartType}
                chartPackages={['corechart', 'treemap']}
                rows={this.state.rows}
                columns={this.state.columns}
                options = {this.state.options}
                graph_id={this.state.div_id}  />
        );
    }
});

var WorldwideDistribution = React.createClass({
    mixins: [
        Api
    ],

    getInitialState: function () {
        return {
            options: {
                colorAxis: {colors: ['#D3EFFC', '#25AFF4']},
                tooltip: {isHtml: true}
            },
            chartType: 'GeoChart',
            div_id: 'worldwideDistributionGraph'
        };
    },
    getData: function () {
        this.api({
            uri: '/statistics/country/overview'
        }, function (err, body) {
            if (!err) {
                this.setState({
                    rows: body.chartData.countries.rows,
                    columns: body.chartData.countries.columns
                });
            }
        }.bind(this));
    },
    componentDidMount: function () {
        this.getData();
    },
    render: function () {
        return (
            <Chart chartType={this.state.chartType}
                chartPackages={['corechart', 'treemap']}
                rows={this.state.rows}
                columns={this.state.columns}
                options = {this.state.options}
                graph_id={this.state.div_id}  />
        );
    }
});

var MonthlyProjectShares = React.createClass({
    mixins: [
        Api
    ],

    getInitialState: function () {
        return {
            options: {
                hAxis: {title: 'Age'},
                vAxis: {title: 'Count'},
                height: 400,
                isStacked: true,
                colors: ['#25AFF4', '#F49D25', '#B3B3B3'],
                tooltip: {isHtml: true}
            },
            chartType: 'AreaChart',
            div_id: 'monthlyProjectSharesGraph'
        };
    },
    getData: function () {
        this.api({
            uri: '/statistics/monthly/project/overview'
        }, function (err, body) {
            if (!err) {
                this.setState({
                    rows: formatRowDate(body.chartData.monthlyProjectShares.rows),
                    columns: body.chartData.monthlyProjectShares.columns
                });
            }
        }.bind(this));
    },
    componentDidMount: function () {
        this.getData();
    },
    render: function () {
        return (
            <Chart chartType={this.state.chartType}
                chartPackages={['corechart', 'treemap']}
                rows={this.state.rows}
                columns={this.state.columns}
                options = {this.state.options}
                graph_id={this.state.div_id}  />
        );
    }
});

var ScratchBlockUsage = React.createClass({
    mixins: [
        Api
    ],

    getInitialState: function () {
        return {
            rows: [],
            columns: [
                { label : 'Block Type', type: 'string' },
                { label : 'Parent', type: 'string' },
                { label : 'Count', type: 'number' },
                { label : 'Block Category (color)', type: 'number' }
            ],
            options: {
                minColor: '#25AFF4',
                maxColor: '#F49D25',
                headerHeight: 0,
                fontColor: 'black',
                showScale: false,
                height: 500
            },
            chartType: 'TreeMap',
            div_id: 'scratchBlockUsageChart'
        };
    },
    getData: function () {
        var count = 0;
        var blockrows = [['Blocks',  null,   0,  0]];

        function showFullTooltip (row, size) {
            var percent = size/count*100;
            return '<div style="background:#ffffff; padding:10px; '
            + 'border-style:solid; border-width: thin; text-align: center;"><b>'
            + blockrows[row][0] + '</b><br>' + size.toLocaleString() + '<br>('
            + percent.toFixed(2) + '%)</div>';
        }

        this.api({
            uri: '/proxy/statistics/monthly'
        }, function (err, body) {
            if (!err) {
                var set = new Set();
                body['block_distribution']['children'].forEach(function (item, index) {
                        blockrows.push([item['name'], 'Blocks', item['count'], 0]);
                        count += item['count'];
                        item['children'].forEach(function (subitem) {
                            if (!set.has(subitem['name'])) {
                                blockrows.push([subitem['name'], item['name'], subitem['count'], index]);
                                set.add(subitem['name']);
                            }
                        });
                    });

                this.setState({
                    rows: blockrows,
                    options: {
                        minColor: '#25AFF4',
                        maxColor: '#F49D25',
                        headerHeight: 0,
                        fontColor: 'black',
                        showScale: false,
                        height: 500,
                        generateTooltip: showFullTooltip
                    }
                });
            }
        }.bind(this));
    },
    componentDidMount: function () {
        this.getData();
    },
    render: function () {
        return (
            <Chart chartType={this.state.chartType}
                chartPackages={['corechart', 'treemap']}
                rows={this.state.rows}
                columns={this.state.columns}
                options = {this.state.options}
                graph_id={this.state.div_id}  />
        );
    }
});

var Statistics = React.createClass({
    type: 'Statistics',
    mixins: [
        Api
    ],

    getInitialState: function () {
        return {
            overviewProjects: 0,
            overviewUsers: 0,
            overviewComments: 0,
            overviewStudios: 0,
            pageviews: 0,
            users: 0,
            sessions: 0
        };
    },
    getOverviewData: function () {
        this.api({
            uri: '/statistics/all/overview'
        }, function (err, body) {
            if (!err) {
                this.setState({
                    overviewProjects: body.projects,
                    overviewUsers: body.users,
                    overviewComments: body.comments,
                    overviewStudios: body.studios
                });
            }
        }.bind(this));
    },
    getGAData: function () {
        this.api({
            uri: '/proxy/statistics/traffic'
        }, function (err, body) {
            if (!err) {
                this.setState({
                    pageviews: parseInt(body.pageviews).toLocaleString(),
                    users: parseInt(body.users).toLocaleString(),
                    sessions: parseInt(body.sessions).toLocaleString()
                });
            }
        }.bind(this));
    },
    componentDidMount: function () {
        this.getOverviewData();
        this.getGAData();
    },
    render: function () {
        var classes = classNames(
            'top-banner',
            this.state.bgClass
        );

        return (
            <div>
                <div className={classes}>
                    <h1>
                        <FormattedMessage
                            id='statistics.title'
                            defaultMessage={'Statistics'} />
                    </h1>
                    <p>
                        <FormattedMessage
                            id='statistics.subTitle'
                            defaultMessage={
                                'Statistics about the Scratch community.'} />
                    </p>
                </div>

                <div className="inner">
                    <Box title={
                        <FormattedMessage
                            id='statistics.communityTitle'
                            defaultMessage={
                                'Community statistics at a glance'
                            }/>
                    } className="leftHalf">
                    <ul className="stats">
                        <li className="data">
                            <span className="value" id="numproject">{this.state.overviewProjects}</span>
                            <span> </span>
                            <FormattedMessage
                                id='statistics.communityProjects'
                                defaultMessage={
                                    'projects shared,'
                                } />
                        </li>
                        <li className="data">
                            <span className="value" id="numusers">{this.state.overviewUsers}</span>
                            <span> </span>
                            <FormattedMessage
                                id='statistics.communityUsers'
                                defaultMessage={
                                    'users registered,'
                                } />
                        </li>
                        <li className="data">
                            <span className="value" id="numcomments">{this.state.overviewComments}</span>
                            <span> </span>
                            <FormattedMessage
                                id='statistics.communityComments'
                                defaultMessage={
                                    'comments posted,'
                                } />
                        </li>
                        <li className="data">
                            <span className="value" id="numstudios">{this.state.overviewStudios}</span>
                            <span> </span>
                            <FormattedMessage
                                id='statistics.communityStudios'
                                defaultMessage={
                                    'studios created'
                                } />
                        </li>
                        <li>...and growing!</li>
                    </ul>
                </Box>
                <Box title={
                    <FormattedMessage
                        id='statistics.websiteTrafficTitle'
                        defaultMessage={
                            'Website traffic last month'
                        } />
                } className="rightHalf">
                    <ul className="stats">
                        <li className="data">
                            <span className="value" id="ga-pageviews">{this.state.pageviews}</span>
                            <span> </span>
                            <FormattedMessage
                                id='statistics.websitePageviews'
                                defaultMessage={
                                    'pageviews'
                                } />
                        </li>
                        <li className="data">
                            <span className="value" id="ga-visits">{this.state.sessions}</span>
                            <span> </span>
                            <FormattedMessage
                                id='statistics.websiteVisits'
                                defaultMessage={
                                    'visits'
                                } />
                        </li>
                        <li className="data">
                            <span className="value" id="ga-users">{this.state.users}</span>
                            <span> </span>
                            <FormattedMessage
                                id='statistics.websiteVisitors'
                                defaultMessage={
                                    'unique visitors'
                                } />
                        </li>
                    </ul>
                </Box>

                    <Box title={
                            <FormattedMessage
                                id='statistics.monthlyActivityTitle'
                                defaultMessage={'Monthly Activity Trends'}
                                />
                        }>
                    <MonthlyActivity />
                    </Box>
                    <Box title={
                        <FormattedMessage
                            id='statistics.monthlyUsersTitle'
                            defaultMessage={
                                'Monthly Active Users'
                            } />
                        }>
                    <MonthlyUserActivity />
                    </Box>
                    <Box title={
                        <FormattedMessage
                            id='statistics.ageDistributionTitle'
                            defaultMessage={
                                'Age Distribution of New Scratchers'
                            } />
                        }>
                    <AgeDistribution />
                    </Box>
                    <Box title={
                        <FormattedMessage
                            id='statistics.scratchersWorldwideTitle'
                            defaultMessage={
                                'Scratchers Worldwide'
                            } />
                    }>
                    <WorldwideDistribution />
                    </Box>
                    <Box title={
                        <FormattedMessage
                            id='statistics.monthlyProjectSharesTitle'
                            defaultMessage={
                                'Monthly Project Shares'
                            } />
                    }>
                    <MonthlyProjectShares />
                    </Box>
                    <Box title={
                        <FormattedMessage
                            id='statistics.monthlyCommentsTitle'
                            defaultMessage={
                                'Monthly Comment Activity'
                            } />
                    }>
                    <MonthlyCommentActivity />
                    </Box>
                    <Box title={
                        <FormattedMessage
                            id='statistics.blocksTitle'
                            defaultMessage={
                                'Scratch Block Usage (random sample)'
                            } />
                    }>
                    <ScratchBlockUsage />
                    <FormattedMessage
                        id='statistics.blocksInstructions'
                        defaultMessage={
                            'Click on a cell to zoom in. Ctrl + click to zoom out.'
                        } />
                </Box>
                </div>
            </div>
        );
    }
});

render(<Statistics />, document.getElementById('view'));
