const token = localStorage.getItem("token");
const produtoId = localStorage.getItem("produtoSelecionado");

if (!token) {
  irPara("login.html");
}

if (!produtoId || produtoId === "null") {
  console.error("Produto inválido.");
  irPara("loja.html");
}

async function carregarDetalhe() {
  try {
    const resposta = await fetch(`${API_URL}/produtos/${produtoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!resposta.ok) {
      throw new Error("Erro ao buscar produto");
    }

    const produto = await resposta.json();

    const container = document.getElementById("detalheProduto");

    container.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h2>${produto.nome}</h2>
      <p><strong>Preço:</strong> R$ ${parseFloat(produto.preco).toFixed(2)}</p>
      <p><strong>Descrição:</strong> ${produto.descricao || "Sem descrição disponível."}</p>
    `;
  } catch (erro) {
    console.error("Erro ao carregar produto:", erro);
  }
}

carregarDetalhe();

document.getElementById("btnVoltar").addEventListener("click", () => {
  irPara("loja.html");
});

// =======================
// BOTÃO COMPRAR
// =======================

const btnComprar = document.getElementById("btnComprar");

if (btnComprar) {
  btnComprar.addEventListener("click", () => {
    irPara("concluirPg.html");
  });
}
