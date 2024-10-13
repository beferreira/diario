
import { useState } from 'react';
import './cadastro.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('')
    const navigate = useNavigate()

    async function cadastrar() {
        let info = {
            "nome": nome,
            "senha": senha
        }

        const url = `http://localhost:5010/registro`;
        let resp = await axios.post(url, info);
        alert('Registro adicionado na tabela. Id: ' + resp.data.novoId);
        navigate("/")
    }

        return (
            <div className="cadastro">
                <h1>Cadastrar-se</h1>
                <div className='interativo'>
                <input type="text" placeholder='Usuário' value={nome} onChange={e => setNome(e.target.value)}/>
                <input type="password" placeholder='Senha' value={senha} onChange={e => setSenha(e.target.value)}/>
        
                <button onClick={cadastrar}>Entrar</button>
                <a href="/">Login</a>
              </div>
            </div>
          );
        }

