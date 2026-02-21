document.addEventListener("DOMContentLoaded", () => {
  const cashback = localStorage.getItem("cashbackCompra");
  const mensagem = document.getElementById("mensagemCashback");

  if (!mensagem) {
    console.error("Elemento mensagemCashback não encontrado.");
    return;
  }

  if (cashback) {
    mensagem.innerHTML = `
      Obrigado por comprar na nossa loja! 🛍️<br><br>
      Aqui está seu cashback: <strong>R$ ${parseFloat(cashback).toFixed(2)}</strong>
    `;
  } else {
    mensagem.innerHTML = `
      Obrigado por comprar na nossa loja! 🛍️
    `;
  }

  document.getElementById("voltarLoja").addEventListener("click", () => {
    localStorage.removeItem("produtoSelecionado");
    localStorage.removeItem("cashbackCompra");
    localStorage.removeItem("valorFinalCompra");
    irPara("loja.html");
  });
});
