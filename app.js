const form = document.getElementById('comprovanteForm');
const loading = document.getElementById('loading');
const mensagem = document.getElementById('mensagem');
const botao = document.getElementById('submitButton');

form.addEventListener('submit', async function (e) {
  e.preventDefault();  // Impede o envio tradicional do formulário
  loading.style.display = 'block';  // Exibe a barra de carregamento
  mensagem.innerHTML = '';  // Limpa qualquer mensagem anterior
  botao.disabled = true;  // Desativa o botão de envio para evitar múltiplos cliques

  const formData = new FormData(form);

  try {
    // Envia o formulário com AJAX para o FormSubmit
    const response = await fetch('https://formsubmit.co/ajax/kronygm@gmail.com', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      // Exibe a mensagem de sucesso após o envio
      mensagem.innerHTML = `<h1>✅ Comprovante enviado com sucesso!</h1><p>Obrigado! Em breve entraremos em contato.</p>`;
      mensagem.style.color = 'green';
      form.reset();  // Reseta o formulário
    } else {
      // Exibe a mensagem de erro caso o envio falhe
      mensagem.textContent = '❌ Ocorreu um erro. Tente novamente.';
      mensagem.style.color = 'red';
    }
  } catch (error) {
    // Exibe mensagem de erro caso ocorra um problema de conexão
    mensagem.textContent = '❌ Erro de conexão. Verifique sua internet.';
    mensagem.style.color = 'red';
  }

  loading.style.display = 'none';  // Esconde a barra de carregamento
  botao.disabled = false;  // Reativa o botão de envio
});
