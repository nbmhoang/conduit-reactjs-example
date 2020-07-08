import React, { useEffect } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-dom';

import PageHeader from './PageHeader';
import {
    LOGIN
} from '../constants/action';


function SignIn() {

    const { token } = useSelector(state => state.user);
    const dispatch = useDispatch();
    /*
    if (token) {
        return <Redirect to='/' />
    }
    */

    const submitForm = values => {
        // console.log(values);
        const data = {
            user: {
                email: values.email,
                password: values.password
            }
        }
        console.log(data);
        dispatch({ type: LOGIN, payload: data });
    }

    return (
        <>
            <PageHeader key={['signin']} />
            <Row>
                <Col span={6} offset={9}>
                    <center>
                        <h1>Sign In</h1>
                        <Link className="hint-text" to="/signup">Need an account?</Link>
                    </center>
                    <Form
                    onFinish={submitForm}>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Email can\'t be blank' }]}>
                            <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Password can\'t be blank' }]}>
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

export default SignIn;