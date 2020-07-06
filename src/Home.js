import React from 'react';

import PageHeader from './PageHeader';
import Banner from './Banner';
import MainLayout from './MainLayout';

export default function Home() {
    return (
        <>
            <PageHeader />
            <Banner />
            <MainLayout />
        </>
    )
}