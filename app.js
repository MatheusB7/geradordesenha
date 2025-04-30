// Inicializar EmailJS
emailjs.init("8gBv4LP3v5BmBPRnI");

// Botão de download - redireciona para o arquivo .zip
document.getElementById('downloadBtn').addEventListener('click', () => {
  window.location.href = "geradordesenha_MBS_Technology.zip"; // Certifique-se de que esse .zip está no mesmo diretório do index.html
});

// Função para copiar código Pix
function copyPixCode() {
  const pixInput = document.getElementById("pixCode");
  navigator.clipboard.writeText(pixInput.value)
    .then(() => alert("✅ Código Pix copiado!"))
    .catch(() => alert("❌ Erro ao copiar código Pix."));
}

// Função para gerar um código de ativação aleatório
function generateActivationCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Função para mostrar o código de ativação na tela
function showActivationCode(code) {
  document.getElementById("code").innerText = code;
  document.getElementById("activationCode").style.display = "block";
}

// Envio do comprovante via EmailJS + exibição do código
document.getElementById("receiptForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("userEmail").value;
  const arquivo = document.getElementById("receiptFile").files[0];

  if (!arquivo) {
    alert("⚠️ Selecione um arquivo de comprovante!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const base64Comprovante = reader.result.split(",")[1];

    const templateParams = {
      user_email: email,
      comprovante: base64Comprovante,
      filename: arquivo.name
    };

    emailjs.send("service_vft3aht", "template_1ktrtnp", templateParams)
      .then(() => {
        alert("✅ Comprovante enviado com sucesso!");
        const code = generateActivationCode();
        showActivationCode(code);
        document.getElementById("receiptForm").reset();
      })
      .catch(() => {
        alert("❌ Erro ao enviar o comprovante. Tente novamente.");
      });
  };

  reader.readAsDataURL(arquivo);
});
