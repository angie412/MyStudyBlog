// src/components/TagList.js

import React from 'react';

const TagList = ({ posts, onSelectTag }) => {
    const uniqueTags = Array.from(new Set(posts.flatMap(post => post.tags)));

    return (
        <div className="tag-list">
            {uniqueTags.map(tag => (
                <button key={tag} onClick={() => onSelectTag(tag)}>
                    {tag}
                </button>
            ))}
        </div>
    );
};

export default TagList;
