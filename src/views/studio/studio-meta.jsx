import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {selectStudioDescription, selectStudioId, selectStudioTitle} from '../../redux/studio';

const StudioMeta = ({id, description, title}) => (
    <Helmet>
        <title>{`${title} - Scratch Studio`}</title>
        <meta
            content={`${title}, a studio on Scratch`}
            name="description"
        />
        <meta
            content={`Scratch - ${title}`}
            property="og:title"
        />
        <meta
            content={description.split(' ').slice(0, 50)
                .join(' ')}
            property="og:description"
        />
        <link
            href={`https://scratch.mit.edu/studios/${id}`}
            rel="canonical"
        />
    </Helmet>
);

StudioMeta.propTypes = {
    description: PropTypes.string,
    id: PropTypes.string,
    title: PropTypes.string
};

export default connect(
    state => ({
        description: selectStudioDescription(state),
        id: selectStudioId(state),
        title: selectStudioTitle(state)
    })
)(StudioMeta);
