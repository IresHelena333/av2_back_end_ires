// =============================================
// API REST Simples - Monolito (Node + Express + Cors)
// =============================================

const express = require('express');
const cors = require('cors');

// Inicializa o Express
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());                    // Permite requisições de qualquer origem (útil para frontend)
app.use(express.json());            // Para ler JSON no body (já incluído por boa prática)

// Rota de boas-vindas (GET)
app.get('/', (req, res) => {
  res.status(200).json({
    mensagem: "Bem-vindo à API REST Simples! 🚀",
    status: "online",
    versao: "1.0.0",
    data: new Date().toISOString(),
    autor: "Desenvolvido por Grok (especialista em APIs)"
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em: http://localhost:${PORT}`);
  console.log(`📡 Teste a API acessando: http://localhost:${PORT}/`);
});