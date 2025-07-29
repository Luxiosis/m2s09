import React from 'react';

const Post = ({ tipo, titulo, descricao, data, handleDelete, id }) => {
  return (
    <div className='post'>
      <img src="https://totalip.com.br/wp-content/uploads/2023/08/A-tecnologia-impulsiona-o-futuro-do-Brasil.png" alt={titulo} style={{ width: '20%', height: 'auto' }} />
      <h2 style={{ color: '#1E90FF' }}>{tipo}</h2>
      <h3>{titulo}</h3>
      <p>{descricao}</p>
      <p className='date'>Publicado em: {data}</p>
      <button onClick={() => handleDelete(id)}>Excluir</button>
    </div>
  );
};

export default Post;