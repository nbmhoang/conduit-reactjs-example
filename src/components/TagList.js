import React from 'react';
import { Tag } from 'antd';

function TagList({ tags, viewArticleByTag }) {
    return (
        <div id="tag-information" style={{width: 230}} >
            <div className="popular-tag">Popular Tags</div>
            <div className="tag-list">
            {tags.map(item => {
                return (<Tag className="tag" onClick={() => viewArticleByTag(item)}>{item}</Tag>)
            })}
            </div>
        </div>
    )
}

export default TagList;