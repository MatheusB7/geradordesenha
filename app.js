const form = document.getElementById('comprovanteForm');
const loading = document.getElementById('loading');
const mensagem = document.getElementById('mensagem');
const submitButton = document.getElementById('submitButton');

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  
  // Mostrar o indicador de carregamento
  loading.style.display = 'block';
  mensagem.innerHTML = '';
  submitButton.disabled = true;

  const formData = new FormData(form);

  try {
    // Envio do formulário via Fetch
    const response = await fetch('https://formsubmit.co/ajax/kronygm@gmail.com', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      // Se o envio for bem-sucedido
      mensagem.innerHTML = `<h1>✅ Comprovante enviado com sucesso!</h1><p>Obrigado! Em breve entraremos em contato.</p>`;
      mensagem.style.color = 'green';
      form.reset();
    } else {
      // Se o envio falhar
      mensagem.textContent = '❌ Ocorreu um erro. Tente novamente.';
      mensagem.style.color = 'red';
    }
  } catch (error) {
    // Erro de conexão
    mensagem.textContent = '❌ Erro de conexão. Verifique sua internet.';
    mensagem.style.color = 'red';
  }

  // Esconde o indicador de carregamento e habilita o botão novamente
  loading.style.display = 'none';
  submitButton.disabled = false;
});
