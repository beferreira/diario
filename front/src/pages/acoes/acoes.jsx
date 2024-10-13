import { Link, useNavigate } from 'react-router-dom';
import './acoes.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Acoes() {

    const [dia, setDia] = useState('');
    const [conteudo, setConteudo] = useState('')
    const [token, setToken] = useState(null);
    const navigate = useNavigate();
    const [Diario, setDiario] = useState([])
    const [id, setId] = useState('')
    const [id2, setId2] = useState('')

    useEffect(() => {
        let usuario = localStorage.getItem('Login')
        setToken(usuario)

        if (usuario == undefined) {
            navigate('/')
        }
    }, [])

    async function cadastrar() {
        let info = {
            "dia": dia,
            "conteudo": conteudo
        }

        const url = `http://localhost:5010/inserir-informacoes?x-access-token=${token}`;
        let resp = await axios.post(url, info);
        alert('Anotação adicionada ao diário. Id: ' + resp.data.novoId);

    }

    async function consultar() {
        const url = `http://localhost:5010/consulta?x-access-token=${token}`;
        let resp = await axios.get(url);
        console.log(resp);

        setDiario(resp.data)

    }

    async function Editar() {
        let info = {
            "dia": dia,
            "conteudo": conteudo,
            "id":id
        }

        const url = `http://localhost:5010/editar-informacoes?x-access-token=${token}`;
        let resp = await axios.put(url, info);
        alert(`Anotação alterada do diario. Id: ${id}`);

    }

    async function Excluir() {
        const url = `http://localhost:5010/excluir/${id2}?x-access-token=${token}`;
        let resp = await axios.delete(url);
        alert(`Id: ${id2} deletado da lista de anotações.`);

    }

    return (
        <div className='consulta'>

            <div className="cabecalho">
                <nav>
                    <a href="#registrar">Cadastrar</a>
                    <a href="#consultar">Consultar</a>
                    <a href="#editar">Alterar</a>
                    <a href="#excluir">Deletar</a>
                    <a className='voltar' href="/">Voltar</a>
                </nav>
            </div>

        <div className='resto'>

            <section id='registrar'>
            <div className='add'>
                <h1>Cadastrar</h1>

            <div className='inputs'>
                    <input className='inp' type='date' value={dia} onChange={e => setDia(e.target.value)} />
                
                    <input className='desc' type="text" placeholder='Descreva o que aconteceu' value={conteudo} onChange={e => setConteudo(e.target.value)}/>
                
            </div>

            <button onClick={cadastrar}> Adicionar </button>

        </div>

            </section>
            <section id='consultar'>

            <div className='get'>
                <h1>Consultar</h1>

            <button onClick={consultar}>Consultar</button>

            
            <table>
                <thead>
                    <tr>
                        <th>ID Diario </th>
                        <th>Data</th>
                        <th>Conteudo</th>
                    </tr>
                </thead>

                <tbody>
                    {Diario.map(item => 
                        <tr>
                            <td>{item.id}</td>
                            <td>{new Date(item.dia).toLocaleDateString()}</td>
                            <td>{item.conteudo}</td>
                        </tr>
                    )}
                </tbody>

            </table>
        </div>
    </section>

        <section id='editar'>

            <div className='alt'>
                
            <h1>Alterar</h1>    

            <div className='inputs'>
            <input className='inp' type='text' placeholder='Insira o ID a ser alterado  ' value={id} onChange={e => setId(e.target.value)}/>

                    <input className='inp' type='date' value={dia} onChange={e => setDia(e.target.value)} />
                
                    <input className='desc' type="text" placeholder='Descreva o que aconteceu' value={conteudo} onChange={e => setConteudo(e.target.value)}/>
                
            </div>

            <button onClick={Editar}> Adicionar </button>
        </div>

    </section>
        <section id='excluir'>
            <div className='del'>
                
                <h1>Deletar</h1>

                <div className='id'>
                    <input type='text' placeholder='ID que deseja remover' value={id2} onChange={e => setId2(e.target.value)} />
                </div>

                <button onClick={Excluir}> Deletar </button>

            </div>

        </section>                 
    </div>
</div>
    );
}


