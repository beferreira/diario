import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

import App from './pages/login/login.jsx';
import Cadastro from './pages/cadastro/cadastro.jsx';
import Acoes from './pages/acoes/acoes.jsx';

import { BrowserRouter, Routes, Route } from 'react-router-dom';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/cadastrar' element={<Cadastro />} />
        <Route path='/conteudo' element={<Acoes />} />
      </Routes>
    </BrowserRouter>


  </React.StrictMode>
);

