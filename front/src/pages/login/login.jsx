import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()

  async function logar() {
    let info = {
        "usuario": nome,
        "senha": senha
    }

    const url = `http://localhost:5010/logar`;
    let resp = await axios.post(url, info);
    if (resp.data.erro != undefined) {
      alert(resp.data.erro)
  } else {
    console.log(resp.data.token);
    
      localStorage.setItem('Login', resp.data.token)
      navigate("/conteudo")
  }
}


  return (
    <div className="login">
        <h1>Login</h1>
      <div className='interativo'>
        <input type="text" placeholder='Usuário' value={nome} onChange={e => setNome(e.target.value)}/>
        <input type="password" placeholder='Senha' value={senha} onChange={e => setSenha(e.target.value)}/>

        <button onClick={logar}>Entrar</button>
        <a href="/cadastrar">Cadastre-se</a>
      </div>
    </div>
  );
}


