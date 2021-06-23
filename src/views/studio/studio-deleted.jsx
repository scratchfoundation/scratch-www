import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {selectStudioPublic} from '../../redux/studio';

const StudioDeleted = ({deleted}) => {
    if (!deleted) return null;
    return (<div className="studio-deleted studio-info-box studio-info-box-error">
        <FormattedMessage id="studio.showingDeleted" />
    </div>);
};

StudioDeleted.propTypes = {
    deleted: PropTypes.bool
};

export default connect(
    state => ({
        deleted: selectStudioPublic(state) === false
    })
)(StudioDeleted);
