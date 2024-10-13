import 'dotenv/config'
import adicionarRotas from './rotas.js'
import cors from 'cors'
import express from 'express'



const servidor = express();
servidor.use(cors());
servidor.use(express.json());

adicionarRotas(servidor);
let porta = process.env.PORTA

servidor.listen(porta, () => console.log(`Api subiu na porta ${porta}`));