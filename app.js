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

  // Verifica o tipo de arquivo
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (!allowedTypes.includes(arquivo.type)) {
    mensagemEl.textContent = "⚠️ Formato de arquivo não permitido! Aceite apenas imagens (.jpg, .png) e PDFs.";
    return;
  }

  // Desabilita o botão de envio enquanto o arquivo está sendo processado
  const submitButton = document.querySelector("button");
  submitButton.disabled = true;
  submitButton.textContent = "Enviando...";

  const reader = new FileReader();
  reader.onload = function () {
    const base64Comprovante = reader.result.split(",")[1]; // Lê o arquivo como base64

    const templateParams = {
      nome: nome,
      email: email,
      comprovante: base64Comprovante,  // Arquivo como base64
      filename: arquivo.name
    };

    emailjs.send("service_vft3aht", "template_1ktrtnp", templateParams)
      .then(() => {
        mensagemEl.textContent = "✅ Comprovante enviado com sucesso!";
        const code = generateActivationCode();
        showActivationCode(code);
        document.getElementById("comprovanteForm").reset();
      })
      .catch((error) => {
        console.error("Erro ao enviar o comprovante:", error);  // Log do erro
        mensagemEl.textContent = "❌ Erro ao enviar o comprovante. Tente novamente.";
      })
      .finally(() => {
        // Habilita o botão de envio novamente
        submitButton.disabled = false;
        submitButton.textContent = "📤 Enviar Comprovante";
      });
  };

  reader.readAsDataURL(arquivo); // Lê o arquivo como base64
});

function generateActivationCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

function showActivationCode(code) {
  alert("Seu código de ativação é: " + code);
}
