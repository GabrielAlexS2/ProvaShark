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
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome: nome + " " + sobrenome,
          email,
          senha
        })
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.erro);
        return;
      }

      alert("Conta criada com sucesso!");
      window.location.href = "index.html";

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
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha })
      });

      if (!resposta.ok) {
        const erro = await resposta.json();
        alert(erro.erro);
        return;
      }

      const dados = await resposta.json();

      localStorage.setItem("token", dados.token);

      alert("Login realizado com sucesso!");
      window.location.href = "loja.html";

    } catch (erro) {
      alert("Erro ao conectar com o servidor.");
    }
  });
}
function mostrarPopup(tipo, mensagem) {
  document.querySelectorAll(".popup").forEach(p => {
    p.style.display = "none";
  });

  const popup = document.querySelector(`.${tipo}-popup`);
  const messageElement = document.querySelector(`.${tipo}-message`);

  if (popup && messageElement) {
    messageElement.textContent = mensagem;
    popup.style.display = "flex";

    setTimeout(() => {
      popup.style.display = "none";
    }, 4000);
  }
}

document.querySelectorAll(".close-svg").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.target.closest(".popup").style.display = "none";
  });
});