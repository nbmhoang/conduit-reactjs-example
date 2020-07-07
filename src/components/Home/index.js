import React from 'react';

import PageHeader from '../PageHeader';
import Banner from './Banner';
import MainLayout from './MainLayout';
import PageFooter from '../PageFooter';

export default function Home() {
    return (
        <>
            <PageHeader />
            <Banner />
            <MainLayout />
            <PageFooter />
        </>
    )
}