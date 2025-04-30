// Inicializar EmailJS
emailjs.init("8gBv4LP3v5BmBPRnI");

// Botão de download via MediaFire
document.getElementById('downloadBtn').addEventListener('click', () => {
  window.open("https://www.mediafire.com/file/67er1sgh6w26537/geradordesenha_MBS_Technology.exe/file", "_blank");
});

// Função para copiar código Pix
function copyPixCode() {
  const pixInput = document.getElementById("pixCode");
  navigator.clipboard.writeText(pixInput.value)
    .then(() => alert("Código Pix copiado!"))
    .catch(() => alert("Erro ao copiar código Pix."));
}

// Gera um código de ativação aleatório
function generateActivationCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Exibe o código na tela
function showActivationCode(code) {
  document.getElementById("code").innerText = code;
  document.getElementById("activationCode").style.display = "block";
}

// Envio do comprovante + exibição do código de ativação
document.getElementById("comprovanteForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const arquivo = document.getElementById("arquivo").files[0];
  const mensagemEl = document.getElementById("mensagem");

  if (!arquivo) {
    mensagemEl.textContent = "⚠️ Selecione um comprovante!";
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const base64Comprovante = reader.result.split(",")[1];

    const templateParams = {
      nome: nome,
      email: email,
      comprovante: base64Comprovante,
      filename: arquivo.name
    };

    emailjs
      .send("service_vft3aht", "template_1ktrtnp", templateParams)
      .then(() => {
        mensagemEl.textContent = "✅ Comprovante enviado com sucesso!";
        const code = generateActivationCode();
        showActivationCode(code);
        document.getElementById("comprovanteForm").reset();
      })
      .catch(() => {
        mensagemEl.textContent = "❌ Erro ao enviar o comprovante. Tente novamente.";
      });
  };

  reader.readAsDataURL(arquivo);
});
