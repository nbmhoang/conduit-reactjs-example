import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

export default function BookCard({ book }) {

    const { Meta } = Card;

    return (
        <Link to={`/book/${book.id}`}>
        <Card
            hoverable
            cover={<img alt="Book cover" src={book.image && book.image.publicUrlTransformed ? book.image.publicUrlTransformed : "https://marketplace.canva.com/EADapLihYCA/1/0/251w/canva-pastel-photo-kindle-cover-G3D0R8hjBdk.jpg"} />}>
            <Meta title={book.name} description={book.author.name} />
        </Card>
        </Link>
    )
}