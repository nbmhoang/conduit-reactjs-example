import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import {
    LOAD_BOOK_DETAIL
} from '../../constants/action';


export default function BookDetail({ match: { params: { slug } } }) {

    const { name, describe, image, author } = useSelector(state => state.bookDetail);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: LOAD_BOOK_DETAIL, payload: slug })
    }, []);

    return (
        <Row>
            <Col span={8}>
                <img alt="Book cover" src={image.publicUrlTransformed ? image.publicUrlTransformed : "https://marketplace.canva.com/EADapLihYCA/1/0/251w/canva-pastel-photo-kindle-cover-G3D0R8hjBdk.jpg"} />
            </Col>
            <Col span={16}>
                <div>{name}</div>
                <div>{describe}</div>
                <div>{author.name}</div>
            </Col>
        </Row>
    )
}