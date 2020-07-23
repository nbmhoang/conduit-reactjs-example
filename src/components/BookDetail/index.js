import React, { useEffect } from 'react';
import { Breadcrumb, Descriptions, Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { HomeOutlined } from '@ant-design/icons';

import {
    LOAD_BOOK_DETAIL
} from '../../constants/action';


export default function BookDetail({ match: { params: { slug } } }) {

    const { name, describe, image, author, category, pageNumber, numberInStorage, publishDate } = useSelector(state => state.bookDetail);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: LOAD_BOOK_DETAIL, payload: slug })
    }, []);

    return (
        <Row>
            <Col span={20} offset={4}>
                <Breadcrumb>
                    <Breadcrumb.Item href='/'>
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {name}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Col>
            <Col span={4}>
                <img style={{height: "100%", width: "80%"}} alt="Book cover" src={image && image.publicUrlTransformed ? image.publicUrlTransformed : "https://marketplace.canva.com/EADapLihYCA/1/0/251w/canva-pastel-photo-kindle-cover-G3D0R8hjBdk.jpg"} />
            </Col>
            <Col span={20}>
                <Descriptions title="Book Info" column={1} bordered>
                    <Descriptions.Item label="Book Name">{name}</Descriptions.Item>
                    <Descriptions.Item label="Description">{describe}</Descriptions.Item>
                    <Descriptions.Item label="Author">{author.name}</Descriptions.Item>
                    <Descriptions.Item label="Category">{category.name}</Descriptions.Item>
                    <Descriptions.Item label="Page Number">{pageNumber}</Descriptions.Item>
                    <Descriptions.Item label="Number In Storage">{numberInStorage > 0 ? numberInStorage : <div style={{color: "red"}}>Out of stock</div>}</Descriptions.Item>
                    <Descriptions.Item label="Publish Date">{new Date(publishDate).toDateString()}</Descriptions.Item>
                </Descriptions>
            </Col>
        </Row>
    )
}