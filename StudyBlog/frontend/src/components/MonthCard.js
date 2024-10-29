import React from 'react';

const MonthCard = ({ month, posts, onSelectPost }) => (
    <div className="month-card">
        <h2>{month}</h2>
        {posts.map(post => (
            <div key={post.id} onClick={() => onSelectPost(post.id)}>
                <h3>{post.title}</h3>
                <p>{post.content.substring(0, 100)}...</p>
            </div>
        ))}
    </div>
);

export default MonthCard;
