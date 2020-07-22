import React from 'react';
import { Layout } from 'antd';
import { GithubOutlined } from '@ant-design/icons'

export default function PageFooter() {
    const {Footer} = Layout;
    return (
        <Footer>
          <a href="https://github.com/expressyoona/conduit-reactjs-example" target="_blank" rel="noopener"><GithubOutlined /> Fork on Github</a>
        </Footer>
    )
}