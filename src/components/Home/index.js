import React from 'react';

import PageHeader from '../PageHeader';
import PageHeaderLoggedIn from '../PageHeaderLoggedIn';
import Banner from './Banner';
import MainLayout from './MainLayout';
import PageFooter from '../PageFooter';

export default function Home() {
    return (
        <>
            {localStorage.getItem('token') ? <PageHeaderLoggedIn /> : <PageHeader />}
            <Banner />
            <MainLayout />
            <PageFooter />
        </>
    )
}