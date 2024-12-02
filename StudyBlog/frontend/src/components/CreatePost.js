// src/components/CreatePost.js

import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = ({ onPostCreated }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');


        const tagArray = tags.split(',').map(tag => tag.trim());

        // 전송할 데이터 정의
        const postData = {
            title,
            content,
            tags: tagArray // 태그는 배열로 전송
        };

        console.log('Post Data to send:', postData);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/posts/',{
                title,
                content,
                tags: tags.split(',').map(tag => tag.trim()),
            });
                 
            setSuccessMessage('Post created successfully!');
            setTitle('');
            setContent('');
            setTags('');

            // 새로운 게시물 생성 후 부모 컴포넌트나 전체 목록 갱신 (필요할 경우)
            if (onPostCreated) onPostCreated(response.data);

        } catch (err) {
            setError('Failed to create post. Please try again.');
            console.error('Error creating post:', err);
        }
    };

    return (
        <div>
            <h2>Create a New Post</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Tags (comma-separated):</label>
                    <input 
                        type="text" 
                        value={tags} 
                        onChange={(e) => setTags(e.target.value)} 
                        placeholder="e.g., Django, React, JavaScript"
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreatePost;
