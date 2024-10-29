import React from 'react';
import MonthCard from './MonthCard';

const PostList = ({ posts, onSelectPost }) => {
    const postsByMonth = posts.reduce((acc, post) => {
        const month = new Date(post.created_at).toLocaleString('default', { year: 'numeric', month: 'long' });
        if (!acc[month]) acc[month] = [];
        acc[month].push(post);
        return acc;
    }, {});

    return (
        <div className="post-list">
            {Object.keys(postsByMonth).map(month => (
                <MonthCard key={month} month={month} posts={postsByMonth[month]} onSelectPost={onSelectPost} />
            ))}
        </div>
    );
};

export default PostList;
