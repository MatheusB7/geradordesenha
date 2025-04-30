emailjs.init('8gBv4LP3v5BmBPRnI'); // Substitua pelo seu próprio ID de usuário

const form = document.getElementById('comprovanteForm');
const submitButton = document.getElementById('submitButton');
const loading = document.getElementById('loading');
const mensagem = document.getElementById('mensagem');

form.addEventListener('submit', function(event) {
  event.preventDefault();  // Impede o envio padrão do formulário

  submitButton.value = 'Enviando...';
  loading.style.display = 'block';  // Exibe a animação de carregamento

  const serviceID = 'default_service';
  const templateID = 'template_1ktrtnp';

  // Cria um novo objeto FormData para pegar os dados do formulário
  const formData = new FormData(form);

  emailjs.sendForm(serviceID, templateID, formData)
    .then(() => {
      submitButton.value = '📤 Enviar Comprovante';
      loading.style.display = 'none';  // Oculta a animação de carregamento
      mensagem.textContent = '✅ Comprovante enviado com sucesso!';
      mensagem.style.color = 'green';
      form.reset();  // Reseta o formulário
    })
    .catch((err) => {
      submitButton.value = '📤 Enviar Comprovante';
      loading.style.display = 'none';
      mensagem.textContent = '❌ Erro ao enviar o comprovante. Tente novamente.';
      mensagem.style.color = 'red';
    });
});
