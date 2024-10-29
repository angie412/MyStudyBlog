import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import PostList from './components/PostList';
import TagList from './components/TagList';
import Login from './components/Login';
import CreatePost from './components/CreatePost';
import axios from 'axios';
import './styles/App.css';

const App = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [posts, setPosts] = useState([]);

    const handleLoginSuccess = (token, isAdminStatus) => {
        setIsLoggedIn(true);
        setIsAdmin(isAdminStatus);
        axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    };

    useEffect(() => {
        if (isLoggedIn) {
            let url = 'http://127.0.0.1:8000/api/posts/';
            if (selectedTag) {
                url += `?tags=${selectedTag}`;
            }
            axios.get(url)
                .then(response => setPosts(response.data || []))
                .catch(error => {
                    console.error('Error fetching posts:', error);
                    setPosts([]);
                });
        }
    }, [isLoggedIn, selectedTag]);

    const handleSelectPost = (postId) => {
        setSelectedPost(postId);
    };

    if (!isLoggedIn) {
        return <Login onLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <Router>
            <div className="App">
                <aside className="sidebar">
                    <TagList onSelectTag={setSelectedTag} />
                    {isAdmin && <AddPostButton />}
                </aside>
                <main className="content">
                    <h1>Angela's Study Room</h1>
                    <Routes>
                        <Route path="/create" element={<CreatePost />} />
                        <Route path="/" element={
                            selectedPost ? (
                                <div>상세 페이지</div>
                            ) : (
                                <PostList posts={posts} onSelectPost={handleSelectPost} />
                            )
                        } />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

const AddPostButton = () => {
    const navigate = useNavigate();

    const handleAddPostClick = () => {
        navigate('/create');
    };

    return (
        <button className="add-button" onClick={handleAddPostClick}>
            + 글 작성
        </button>
    );
};

export default App;
