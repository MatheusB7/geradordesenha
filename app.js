emailjs.init('8gBv4LP3v5BmBPRnI');  // Inicializa o EmailJS com a chave pública

const form = document.getElementById('comprovanteForm');
const submitButton = document.getElementById('submitButton');
const loading = document.getElementById('loading');
const mensagem = document.getElementById('mensagem');

// Escuta o evento de envio do formulário
form.addEventListener('submit', function(event) {
  event.preventDefault();  // Impede o envio padrão do formulário

  submitButton.value = 'Enviando...';  // Muda o texto do botão
  loading.style.display = 'block';  // Exibe o carregamento
  mensagem.textContent = '';  // Limpa a mensagem anterior

  const serviceID = 'default_service';  // Verifique se o serviceID está correto
  const templateID = 'template_1ktrtnp';  // Verifique se o templateID está correto

  // Cria um objeto FormData para enviar os dados do formulário, incluindo o arquivo
  const formData = new FormData(form);

  // Envia o formulário através do EmailJS
  emailjs.sendForm(serviceID, templateID, formData)
    .then(() => {
      submitButton.value = '📤 Enviar Comprovante';  // Restaura o texto do botão
      loading.style.display = 'none';  // Oculta a animação de carregamento
      mensagem.textContent = '✅ Comprovante enviado com sucesso!';  // Exibe a mensagem de sucesso
      mensagem.style.color = 'green';
      form.reset();  // Reseta o formulário
    })
    .catch((err) => {
      submitButton.value = '📤 Enviar Comprovante';  // Restaura o texto do botão
      loading.style.display = 'none';  // Oculta a animação de carregamento
      mensagem.textContent = `❌ Erro ao enviar o comprovante. Erro: ${err.text}`;  // Exibe a mensagem de erro
      mensagem.style.color = 'red';
    });
});
