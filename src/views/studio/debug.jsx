import React from 'react';
import PropTypes from 'prop-types';

const Debug = ({label, data}) => (<div style={{padding: '2rem', border: '1px solid red', margin: '2rem'}}>
    <small>{label}</small>
    <code>
        <pre style={{fontSize: '0.75rem'}}>
            {JSON.stringify(data, null, '  ')}
        </pre>
    </code>
</div>);

Debug.propTypes = {
    label: PropTypes.string,
    data: PropTypes.any // eslint-disable-line react/forbid-prop-types
};

export default Debug;
