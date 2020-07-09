import React from 'react';
import { Avatar, Comment } from 'antd';
import { DeleteFilled } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux';

import {
    DELETE_COMMENT
} from '../../constants/action';

export default function UserComment({ slug, commentList }) {

    const { username } = useSelector(state => state.user);
    const dispatch = useDispatch()

    const deleteComment = commentId => {
        dispatch({ type: DELETE_COMMENT, payload: {slug, commentId} });
    }

    const canDelete = (comment) => {
        if (comment.author.username === username) {
            return [<DeleteFilled onClick={() => deleteComment(comment.id)}/>,]
        }
        return null;
    }

    return (
        <>
        {commentList.map(item => {
            return (
                <Comment
                    className="user-comment"
                    author={item.author.username}
                    avatar={<Avatar src={item.author.image} />}
                    content={item.body}
                    datetime={new Date(item.createdAt).toDateString()}
                    actions={canDelete(item)}
                />
            )
        })}
        </>
    )
}