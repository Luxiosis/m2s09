import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostList from './PostList';
import './App.css';

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [category, setCategory] = useState('');
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    setTotalPosts(savedPosts.length);
  }, []);

  const validateForm = () => {
    if (!title.trim()) {
      toast.error('O título não pode estar vazio!');
      return false;
    }
    if (!description.trim()) {
      toast.error('A descrição não pode estar vazia!');
      return false;
    }
    if (!coverImageUrl.trim() || !coverImageUrl.startsWith('http')) {
      toast.error('A URL da imagem deve começar com http!');
      return false;
    }
    if (!category) {
      toast.error('A categoria é obrigatória!');
      return false;
    }
    const today = new Date();
    const selectedDate = new Date(publishDate);
    if (selectedDate < today) {
      toast.error('A data de publicação deve ser no presente ou futuro!');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const newPost = { title, description, coverImageUrl, publishDate, category };
      const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
      savedPosts.push(newPost);
      localStorage.setItem('posts', JSON.stringify(savedPosts));
      setTotalPosts(savedPosts.length);

      setTitle('');
      setDescription('');
      setCoverImageUrl('');
      setPublishDate('');
      setCategory('');
      toast.success('Post salvo com sucesso!');
    }
  };

  return (
    <div className="container">
      <h1>Painel de Gerenciamento</h1>
      <p>Atualmente, você tem <b>{totalPosts} posts </b>  cadastrados</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <p className="novoPost">Novo Post</p>
          <label>Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
          />
        </div>
        <div className="form-group">
          <label>Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição"
          />
        </div>
        <div className="form-group">
          <label>URL da imagem de capa</label>
          <input
            type="text"
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            placeholder="URL da imagem de capa"
          />
        </div>
        <div className="form-group">
          <label>Data de publicação</label>
          <input
            type="date"
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Tipo do post</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Selecione uma categoria</option>
            <option value="Artigo">Artigo</option>
            <option value="Notícia">Notícia</option>
            <option value="Tutorial">Tutorial</option>
            <option value="Entrevista">Entrevista</option>
          </select>
        </div>
        <button type="submit"><b>Publicar</b></button>
      </form>
      <PostList />
      <ToastContainer aria-label="Notification alerts" />
    </div>
  );
};

export default App;
