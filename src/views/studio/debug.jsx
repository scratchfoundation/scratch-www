import React from 'react';

export default function Debug({label, data}) {
    return <div style={{padding: '2rem', 'border': '1px solid red', margin: '2rem'}}>
        <small>{label}</small>
        <code>
            <pre style={{fontSize: '0.75rem'}}>
                {JSON.stringify(data, null, '  ')}
            </pre>
        </code>
    </div>
}