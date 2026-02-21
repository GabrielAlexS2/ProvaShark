const API_URL = "http://localhost:5000";

// =======================
// CADASTRO
// =======================
const cadastroForm = document.querySelector("#form-cadastro");

if (cadastroForm) {
  cadastroForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.querySelector("#nome").value;
    const sobrenome = document.querySelector("#sobrenome").value;
    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;
    const confirmarSenha = document.querySelector("#confirmarSenha").value;

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem");
      return;
    }

    try {
      const resposta = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome + " " + sobrenome,
          email,
          senha,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.erro);
        return;
      }

      alert("Conta criada com sucesso!");
      irPara("index.html");
    } catch (erro) {
      alert("Erro ao conectar com o servidor.");
    }
  });
}

// =======================
// LOGIN
// =======================
const loginForm = document.querySelector("#form-login");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;

    try {
      const resposta = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!resposta.ok) {
        const erro = await resposta.json();
        alert(erro.erro);
        return;
      }

      const dados = await resposta.json();

      localStorage.setItem("token", dados.token);

      alert("Login realizado com sucesso!");
      irPara("teste.html");
    } catch (erro) {
      alert("Erro ao conectar com o servidor.");
    }
  });
}

// =============================
// TESTE DE PROCESSAMENTO
// =============================

const monitorForm = document.getElementById("monitorForm");

if (monitorForm) {
  monitorForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const cpu = parseFloat(document.getElementById("cpu").value);
    const ram = parseFloat(document.getElementById("ram").value);

    let mensagemLoja = "";

    if (cpu < 50 && ram < 50) {
      mensagemLoja =
        "Sistema Estável! Já tem um bom sistema, mas dá pra melhorar com nossos produtos.";
    } else if (cpu > 50 && cpu < 80 && ram > 50 && ram < 80) {
      mensagemLoja =
        "Atenção: Uso Moderado! Vamos dar um Upgrade na sua máquina!";
    } else {
      mensagemLoja =
        "ALERTA: Sobrecarga! Precisa de peças novas urgente, aproveite as nossas promoções.";
    }

    localStorage.setItem("mensagemSistema", mensagemLoja);

    irPara("loja.html");
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("overlay");
  const mensagemTexto = document.getElementById("mensagemSistema");
  const botaoFechar = document.getElementById("fecharModal");

  const mensagemSalva = localStorage.getItem("mensagemSistema");

  if (overlay && mensagemTexto && mensagemSalva) {
    mensagemTexto.textContent = mensagemSalva;
    overlay.classList.remove("hidden");
    localStorage.removeItem("mensagemSistema");
  }

  if (botaoFechar) {
    botaoFechar.addEventListener("click", function () {
      overlay.classList.add("hidden");
    });
  }
});

// =============================
// MODAL NA LOJA
// =============================

document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("overlay");
  const mensagemTexto = document.getElementById("mensagemSistema");
  const botaoFechar = document.getElementById("fecharModal");

  if (!overlay) return;

  const mensagemSalva = localStorage.getItem("mensagemSistema");

  if (mensagemSalva) {
    mensagemTexto.textContent = mensagemSalva;
    overlay.classList.remove("hidden");
    localStorage.removeItem("mensagemSistema");
  }

  botaoFechar.addEventListener("click", function () {
    overlay.classList.add("hidden");
  });
});

// =============================
// PRELOAD
// =============================

function irPara(pagina) {
  localStorage.setItem("proximaPagina", pagina);
  window.location.href = "preLoad.html";
}
