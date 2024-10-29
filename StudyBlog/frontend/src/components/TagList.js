import React from 'react';

const TagList = ({ tags = [], onSelectTag }) => (
    <div className="tag-list">
        {tags.map(tag => (
            <button key={tag.id} onClick={() => onSelectTag(tag.id)}>
                {tag.name}
            </button>
        ))}
    </div>
);

export default TagList;
