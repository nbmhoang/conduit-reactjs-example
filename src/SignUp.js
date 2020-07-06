import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

import PageHeader from './PageHeader';

export default function SignUp() {
    return (
        <>
            <PageHeader key={['signup']} />
            <Row>
                <Col span={6} offset={9}>
                    <center>
                        <h1>Sign Up</h1>
                        <Link to="/signin">Have an account?</Link>
                    </center>
                    <Form>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}>
                            <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password visibilityToggle={false} placeholder="Password" />
                        </Form.Item>
                        <Form.Item>
                            <Button className="button-submit" type="primary" htmlType="submit" style={{float: "right"}}>
                                Sign in
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    )
}