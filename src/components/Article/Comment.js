import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import { useDispatch } from 'react-redux';

import {
    POST_COMMENT
} from '../../constants/action';

export default function CommentBox({ slug }) {

    const { TextArea } = Input;
    const dispatch = useDispatch();

    const postComment = values => {
        const commentBody = values.comment;
        dispatch({ type: POST_COMMENT, payload: {slug, commentBody} });
        // Clear
        values.comment = '';
    }

    return (
        <Card>
            <Form onFinish={postComment}>
                <Form.Item name="comment">
                    <TextArea placeholder="Write a comment..." />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit  
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}