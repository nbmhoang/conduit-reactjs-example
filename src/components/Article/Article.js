import React from 'react';

import PageHeader from '../PageHeader';

export default function Article({ match, location }) {
    console.log(match);
    
    return (
        <>
            <PageHeader />
            <hr />
        </>
    )
}