import React from 'react';
import { Avatar, Layout, Menu, Col, Row } from 'antd';
import { Link } from 'react-router-dom';

import {SettingFilled, EditFilled} from '@ant-design/icons';

export default function PageHeaderLoggedIn() {
    const { Header } = Layout;
    return (
        <Row>
            <Col span={12} offset={6}>
            <Header>
                <Link to="/">
                    <div className="logo" />Conduit
                </Link>
                <Menu mode="horizontal" style={{float: "right"}}>
                    <Menu.Item key="home">
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="signin">
                        <Link to="/signin"><EditFilled />New Post</Link>
                    </Menu.Item>
                    <Menu.Item key="signup">
                        <Link to="/signup"><SettingFilled />Setting</Link>
                    </Menu.Item>
                    <Menu.Item key="x">
                        <Link to="/x">
                            <Avatar src="https://www.kpopnews.vn/uploadcontent/fileuploads/uploads/2019/03/14/PhotoGrid_1552570845241.jpg" />
                            Username here
                        </Link>
                    </Menu.Item>
                </Menu>
                </Header>
            
            </Col>
        </Row>
    )
}