const token = localStorage.getItem("token");
const produtoId = localStorage.getItem("produtoSelecionado");

if (!token) {
  irPara("login.html");
}

if (!produtoId || produtoId === "null") {
  console.error("Produto inválido!");
  irPara("loja.html");
}

let cashbackCalculado = 0;
let valorFinalCalculado = 0;

async function carregarResumo() {
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
    const preco = parseFloat(produto.preco);

    // ==========================
    // CÁLCULO DO CASHBACK
    // ==========================
    if (preco <= 100) {
      cashbackCalculado = preco * 0.05;
    } else {
      cashbackCalculado = preco * 0.1;
    }

    valorFinalCalculado = preco - cashbackCalculado;

    // SALVA NO LOCALSTORAGE
    localStorage.setItem("cashbackCompra", cashbackCalculado.toFixed(2));
    localStorage.setItem("valorFinalCompra", valorFinalCalculado.toFixed(2));

    const container = document.getElementById("resumoCompra");

    container.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h2>${produto.nome}</h2>
      <p><strong>Preço:</strong> R$ ${preco.toFixed(2)}</p>
      <p><strong>Cashback:</strong> R$ ${cashbackCalculado.toFixed(2)}</p>
      <p><strong>Valor Final:</strong> R$ ${valorFinalCalculado.toFixed(2)}</p>
    `;
  } catch (erro) {
    console.error("Erro ao carregar produto:", erro);
  }
}

carregarResumo();

// ==========================
// BOTÃO CONFIRMAR
// ==========================
const btnConfirmar = document.getElementById("confirmarCompra");

if (btnConfirmar) {
  btnConfirmar.addEventListener("click", (e) => {
    e.preventDefault();

    // Evita clique duplo
    btnConfirmar.disabled = true;
    btnConfirmar.innerText = "Processando...";

    if (!localStorage.getItem("cashbackCompra")) {
      localStorage.setItem("cashbackCompra", cashbackCalculado.toFixed(2));
    }

    setTimeout(() => {
      irPara("confiCompra.html");
    }, 700);
  });
}
