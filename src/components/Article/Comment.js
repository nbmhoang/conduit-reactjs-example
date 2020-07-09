import React from 'react';

import { Form, Input, Button, Card } from 'antd';


export default function CommentBox() {

    const { TextArea } = Input;

    return (
        <Card>
            <Form>
                <TextArea placeholder="Write a comment..." />
                <Button type="primary" htmlType="submit">
                    Submit  
                </Button>
            </Form>
        </Card>
    )
}