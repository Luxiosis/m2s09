import React, { useState, useEffect } from 'react';
import Post from './Post';

const PostsList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    setPosts(savedPosts);
  }, []);

  const handleDelete = (id) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const categoryCount = posts.reduce((acc, post) => {
    acc[post.tipo] = (acc[post.tipo] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div className="category-count">
        <h2>Contagem por Categoria</h2>
        <ul>
          {Object.entries(categoryCount).map(([category, count]) => (
            <li key={category}>{category}: {count}</li>
          ))}
        </ul>
      </div>
      {posts.map(post => (
        <Post
          key={post.id}
          id={post.id}
          tipo={post.tipo}
          titulo={post.titulo}
          descricao={post.descricao}
          data={post.data}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default PostsList;