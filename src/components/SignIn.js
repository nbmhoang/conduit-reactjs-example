import React, { useEffect } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import PageHeader from './PageHeader';
import {
    LOGIN,
    LOAD_CURRENT_USER
} from '../constants/action';


function SignIn() {

    const { isLoggedIn, errors } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn) {
            dispatch({ type: LOAD_CURRENT_USER })
        }
        
    }, []);
    

    const submitForm = values => {
        const data = {
            user: {
                email: values.email,
                password: values.password
            }
        }
        dispatch({ type: LOGIN, payload: data });
    }

    if(isLoggedIn) {
         return <Redirect to="/" />
    }

    
    const Error = () => {       
        if (!errors) {
            return null;
        }
        return (
            <ul>
            {Object.keys(errors).map(key => {
                return <li className="error">{key} {errors[key].join()}</li>
            })}
            </ul>
        )
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
                        <Error />
                        <Form
                        onFinish={submitForm}>
                            <Form.Item
                                name="email">
                                <Input placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                name="password" >
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