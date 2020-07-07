import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

export default function PageHeader() {
    const { Header } = Layout;
    return (
        <Header>
          <Link to="/">
            <div className="logo" />Conduit
          </Link>
          <Menu mode="horizontal" style={{float: "right"}}>
            <Menu.Item key="home">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="signin">
              <Link to="/signin">Sign in</Link>
            </Menu.Item>
            <Menu.Item key="signup">
              <Link to="/signup">Sign up</Link>
            </Menu.Item>
          </Menu>
        </Header>
    )
}