const token = localStorage.getItem("token");

if (!token) {
  alert("Você precisa estar logado!");
  window.location.href = "index.html";
}

// =======================
// LOGOUT
// =======================
const btnLogout = document.getElementById("btnLogout");

if (btnLogout) {
  btnLogout.addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });
}

// =======================
// CARREGAR PRODUTOS
// =======================
async function carregarProdutos() {
  try {
    const resposta = await fetch(`${API_URL}/produtos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (resposta.status === 401) {
      alert("Sessão expirada");
      localStorage.removeItem("token");
      window.location.href = "index.html";
      return;
    }

    const produtos = await resposta.json();
    const container = document.getElementById("produtos");

    produtos.forEach((produto) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco}</p>
  `;

      card.addEventListener("click", () => {
        localStorage.setItem("produtoSelecionado", produto.id);
        irPara("detalhe.html");
      });

      container.appendChild(card);
    });
  } catch (erro) {
    console.error("Erro ao carregar produtos:", erro);
  }
}

carregarProdutos();
