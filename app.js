// Envio do comprovante
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

  // Usar FileReader para ler o arquivo como base64
  const reader = new FileReader();
  reader.onload = function () {
    const base64Comprovante = reader.result.split(",")[1]; // Obtém o base64 do arquivo

    // Parâmetros para o template
    const templateParams = {
      nome: nome,
      email: email,
      comprovante: base64Comprovante, // Envia o arquivo como base64
      filename: arquivo.name
    };

    // Enviar usando o EmailJS
    emailjs.send("service_vft3aht", "template_1ktrtnp", templateParams)
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

  reader.readAsDataURL(arquivo); // Lê o arquivo como uma URL base64
});
