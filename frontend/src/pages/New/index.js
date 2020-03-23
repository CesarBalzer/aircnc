import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import './styles.css';

import camera from '../../assets/camera.svg';

export default function New({ history }) {

  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();
    const user_id = localStorage.getItem('user');
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);
    data.append('thumbnail', thumbnail);

    await api.post('/spots', data, {
      headers: { user_id }
    });

    history.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        className={thumbnail ? 'has-thumbnail' : ''}
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}>
        <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
        <img src={camera} alt="Selecione uma imagem" />
      </label>

      <label htmlFor='company'>Empresa *</label>
      <input
        type="text"
        id="empresa"
        value={company}
        placeholder='Sua empresa incrível'
        onChange={event => setCompany(event.target.value)}
      />

      <label htmlFor='company'>Tecnologias *<span> (Separadas por vírgula)</span></label>
      <input
        type="text"
        id="techs"
        value={techs}
        placeholder='Quais tecnologias usam?'
        onChange={event => setTechs(event.target.value)}
      />

      <label htmlFor='company'>Valor da diária *<span> (em branco para gratuito)</span></label>
      <input
        type="text"
        id="price"
        value={price}
        placeholder='Quais tecnologias usam?'
        onChange={event => setPrice(event.target.value)}
      />

      <button type="submit" className="btn">Cadastrar</button>
    </form>
  );
}
