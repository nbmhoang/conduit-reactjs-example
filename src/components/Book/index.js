import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Col, Row, Input, Checkbox, List, Select } from 'antd';
import { SearchOutlined, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';

import BookCard from './BookCard';
import {
    // LOAD_ALL_BOOK,
    // LOAD_ALL_CATEGORY,
    // LOAD_ALL_AUTHOR,
    APPLY_FILTER_BOOK,
    LOAD_BOOK_HOME,
    LOAD_MORE_BOOK,
    CHANGE_ORDER
} from '../../constants/action';

export default function Home() {
    const { books, authors, categories, more, page, size, orderBy } = useSelector(state => state.book);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch({ type: LOAD_BOOK_HOME, payload: { orderBy, page, offset: 0, size } });
        return () => {
            dispatch({ type: "CLEAR" })
          }
    }, []);

    const filterBook = values => {
        const option = {
            name: values.name,
            author: {},
            category: {}
        }
        if (values.author && values.author.length > 0) {
            option.author = {
                id_in: values.author
            }   
        }
        if (values.category && values.category.length > 0) {
            option.category = {
                id_in: values.category
            }   
        }
        // const offset = page*size;
        dispatch({ type: APPLY_FILTER_BOOK, payload: { page: 0, offset: 0, size, ...option } })
    }

    const loadBooks = () => {
        const offset = page*size;
        // dispatch({ type: LOAD_BOOK_HOME, payload: { page, offset, size } })
        dispatch({ type: LOAD_MORE_BOOK, payload: { orderBy, page, offset, size } })
    }

    const changeOrder = value => {
        dispatch({ type: CHANGE_ORDER, payload: { orderBy: value, offset: 0, page: 0, size } });
    }

    return (
        <Row>
            <Col span={6}>
                <Form
                    style={{position: "fixed"}}
                    className="filter-pane"
                    layout="vertical"
                    onFinish={filterBook} >
                    <Form.Item label="Search by name" name="name">
                        <Input style={{width: "200px"}} placeholder="Enter book name here" />
                    </Form.Item>
                    <Form.Item  label="Filter by authors" name="author">
                        <Checkbox.Group>
                            {authors ? authors.map(item => {
                                return <><Checkbox value={item.id}>{item.name}</Checkbox><br /></>
                            }) : "No data"}
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item label="Filter by categories" name="category">
                        <Checkbox.Group>
                            {categories ? categories.map(item => {
                                return <><Checkbox value={item.id}>{item.name}</Checkbox><br /></>
                            }) : "No data"}
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" style={{width: "200px"}} htmlType="submit" icon={<SearchOutlined />}>Search</Button>
                    </Form.Item>
                </Form>
            </Col>
            <Col span={18}>
                <Select defaultValue={orderBy} onChange={changeOrder}>
                    <Select.Option value="id_ASC">ID <SortAscendingOutlined /></Select.Option>
                    <Select.Option value="id_DESC">ID <SortDescendingOutlined /></Select.Option>
                    <Select.Option value="name_ASC">Name <SortAscendingOutlined /></Select.Option>
                    <Select.Option value="name_DESC">Name <SortDescendingOutlined /></Select.Option>
                </Select>
                <List
                    grid={{ gutter: 10, column: 5, }}
                    dataSource={books}
                    loadMore={more ? <div style={{textAlign: "center"}}><Button type="primary" onClick={loadBooks}>Load more</Button></div> : null}
                    renderItem={item => (
                        <List.Item>
                            <BookCard book={item} />
                        </List.Item>
                    )}
                />
            </Col>
        </Row>
    )

}