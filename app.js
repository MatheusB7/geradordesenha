// app.js

// Botão de download
document.getElementById('downloadBtn').addEventListener('click', () => {
    window.location.href = "geradordesenha.exe";
  });
  
  // Copiar código Pix
  function copyPixCode() {
    const pixInput = document.getElementById("pixCode");
    pixInput.select();
    document.execCommand("copy");
    alert("Código Pix copiado!");
  }
  
  // Gerar código de ativação
  function generateActivationCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
  
  // Mostrar código
  function showActivationCode(code) {
    document.getElementById("code").innerText = code;
    document.getElementById("activationCode").style.display = "block";
  }
  
  // Enviar comprovante
  document.getElementById("receiptForm").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const fileInput = document.getElementById("receiptFile");
    const email = document.getElementById("userEmail").value;
    const file = fileInput.files[0];
  
    if (!file) {
      alert("Selecione um arquivo.");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = function () {
      const base64File = reader.result.split(",")[1];
  
      emailjs.send("service_vft3aht", "template_1ktrtnp", {
        user_email: email,
        receipt_file: base64File,
        receipt_name: file.name
      }, "0QIJxs5ZKn3W6rfKX7G_m") // Private key (opcional, pode usar só public key no init)
      .then(function () {
        alert("Comprovante enviado com sucesso!");
        const code = generateActivationCode();
        showActivationCode(code);
      }, function (error) {
        console.error("Erro ao enviar:", error);
        alert("Erro ao enviar o comprovante.");
      });
    };
  
    reader.readAsDataURL(file);
  });
  