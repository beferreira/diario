import con from "./connection.js";


export async function cadastrarLogin(informacoes) {
    const comando = `
        insert into tb_usuario (nm_usuario, ds_senha) 
		values (?, ?)
    `;

    let mensagem = await con.query(comando, [informacoes.nome, informacoes.senha])
    let registro = mensagem[0];

    return registro.insertId;
};



export async function logar(informacoes) {
    const comando = `
    select * from tb_usuario 
    where nm_usuario = ?
    and ds_senha = ?
`;
    let resp = await con.query(comando, [informacoes.usuario, informacoes.senha])
    let registros = resp[0]
    return registros[0];
};



export async function inserirNoDiario(informacoes, id) {
    const comando = `
    insert into tb_diario (dt_dia, ds_conteudo, id_usuario) 
	values (?, ?, ?)
    `;

    let resposta = await con.query(comando, [informacoes.dia, informacoes.conteudo, id])
    let info = resposta[0];

    return info.insertId;
}



export async function consultarDiario(idUsuario) {
    const comando = `
        select id_diario     id,
            dt_dia           dia,
            ds_conteudo      conteudo         
          from tb_diario
          where id_usuario = ?
    `;

    let resposta = await con.query(comando, [idUsuario]);
    let registros = resposta[0];

    return registros;
};


export async function editarDiario(informacoes) {
    const comando = `
        UPDATE tb_diario
        SET dt_dia = ?,
        ds_conteudo = ?
        WHERE id_diario = ?;
    `;

    let resposta = await con.query(comando, [informacoes.dia, informacoes.conteudo, informacoes.id])
    let info = resposta[0];

    return info.affectedRows;
}


export async function excluirDiario(id) {
    const comando = `
        DELETE FROM tb_diario
        WHERE id_diario = ?;
    `;

    let resposta = await con.query(comando, [id])
    let info = resposta[0];

    return info.affectedRows
}






