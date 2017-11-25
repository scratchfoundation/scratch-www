import React from 'react';
import {FormattedMessage} from 'react-intl';
import render from '../../lib/render.jsx';

import InformationPage from '../../components/informationpage/informationpage.jsx';
import Page from '../../components/page/www/page.jsx';

var Dmca = React.createClass({
    type: 'Dmca',
    render: function () {
        return (
                <InformationPage title={'DMCA'}>
                    <div className="inner info-inner">
                        <p><FormattedMessage id='dmca.intro' /></p>
                        <p>
                            Copyright Agent / Mitchel Resnick<br/>
                            MIT Media Laboratory<br/>
                            77 Massachusetts Ave<br/>
                            Room E14-445A<br/>
                            Cambridge, MA 02139<br/>
                            Tel: (617) 253-9783
                        </p>
                        <p><FormattedMessage id='dmca.llkresponse' /></p>
                        <p><FormattedMessage id='dmca.assessment' /></p>
                        <p><FormattedMessage id='dmca.eyetoeye' /></p>
                        <p><FormattedMessage id='dmca.afterfiling' /></p>
                    </div>
                </InformationPage>
        );
    }
});

render(<Page><Dmca /></Page>, document.getElementById('app'));
