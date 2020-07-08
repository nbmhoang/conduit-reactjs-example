import React from 'react';
import { Tag } from 'antd';

function PopularTagPane({ tags, filterArticleByTag, selectedTag }) {
    
    return (
        <div id="tag-information" style={{width: "50%"}} >
            <div className="popular-tag">Popular Tags</div>
            <div className="tag-list">
            {tags.map(item => {
                return (<Tag className={`tag${item === selectedTag ? ' selected' : ''}`} onClick={() => filterArticleByTag({item})}>{item}</Tag>)
            })}
            </div>
        </div>
    )
}

export default PopularTagPane;