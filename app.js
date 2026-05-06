const express = require('express');
const app = express();

app.use(express.json());

// Banco de dados em memória com exemplos
let filmes = [
    { id: 1, titulo: "Desventuras em Série", genero: "Suspense", ano_lancamento: 2004 },
    { id: 2, titulo: "O Último Mestre do Ar", genero: "Ação", ano_lancamento: 2010 },
    { id: 3, titulo: "Meu Amigo Totoro", genero: "Animação", ano_lancamento: 1995 }
];

let usuarios = [
    { id: 1, nome: "Maria Silva", email: "maria@email.com", plano: "Premium" },
    { id: 2, nome: "João Souza", email: "joao@email.com", plano: "Básico" },
    { id: 3, nome: "Ana Costa", email: "ana@email.com", plano: "Premium" }
];

let favoritos = [
    { id: 1, id_usuario: 1, id_filme: 2 },
    { id: 2, id_usuario: 2, id_filme: 1 },
    { id: 3, id_usuario: 3, id_filme: 3 }
];

// Contadores de ID
let filmeId = filmes.length + 1;
let usuarioId = usuarios.length + 1;
let favoritoId = favoritos.length + 1;

// FILMES
app.get('/filmes', (req, res) => {
    res.json(filmes);
});

app.post('/filmes', (req, res) => {
    const { titulo, genero, ano_lancamento } = req.body;
    const novoFilme = { id: filmeId++, titulo, genero, ano_lancamento };
    filmes.push(novoFilme);
    res.json({ mensagem: "Filme cadastrado com sucesso!", filme: novoFilme });
});

app.delete('/filmes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    filmes = filmes.filter(f => f.id !== id);
    favoritos = favoritos.filter(fav => fav.id_filme !== id);
    res.json({ mensagem: "Filme removido com sucesso!" });
});

// USUÁRIOS
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.post('/usuarios', (req, res) => {
    const { nome, email, plano } = req.body;
    const novoUsuario = { id: usuarioId++, nome, email, plano };
    usuarios.push(novoUsuario);
    res.json({ mensagem: "Usuário cadastrado com sucesso!", usuario: novoUsuario });
});

app.put('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, email, plano } = req.body;
    const usuario = usuarios.find(u => u.id === id) || {};
    if (usuario.id) {
        if (nome) usuario.nome = nome;
        if (email) usuario.email = email;
        if (plano) usuario.plano = plano;
    }
    res.json({ mensagem: "Usuário atualizado com sucesso!", usuario });
});

// FAVORITOS
app.post('/favoritos', (req, res) => {
    const { id_usuario, id_filme } = req.body;
    const novoFavorito = { id: favoritoId++, id_usuario, id_filme };
    favoritos.push(novoFavorito);
    res.json({ mensagem: "Favorito cadastrado com sucesso!", favorito: novoFavorito });
});

app.get('/favoritos', (req, res) => {
    res.json(favoritos);
});

app.get('/favoritos/usuario/:id_usuario', (req, res) => {
    const id_usuario = parseInt(req.params.id_usuario);
    const favoritosDoUsuario = favoritos
        .filter(fav => fav.id_usuario === id_usuario)
        .map(fav => filmes.find(f => f.id === fav.id_filme))
        .filter(f => f);
    res.json(favoritosDoUsuario);
});

// SERVIDOR
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});