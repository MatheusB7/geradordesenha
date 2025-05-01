const form = document.getElementById('comprovanteForm');
const loading = document.getElementById('loading');
const mensagem = document.getElementById('mensagem');
const botao = document.getElementById('submitButton');

form.addEventListener('submit', async function (e) {
  e.preventDefault(); // Impede o envio normal do formulário
  loading.style.display = 'block'; // Exibe a barra de carregamento
  mensagem.innerHTML = ''; // Limpa qualquer mensagem anterior
  botao.disabled = true; // Desabilita o botão de envio enquanto processa

  const formData = new FormData(form);

  try {
    const response = await fetch('https://formsubmit.co/ajax/kronygm@gmail.com', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      // Se o envio for bem-sucedido, exibe a mensagem de sucesso
      mensagem.innerHTML = `<h1>✅ Comprovante enviado com sucesso!</h1><p>Obrigado! Em breve entraremos em contato.</p>`;
      mensagem.style.color = 'green';
      form.reset(); // Limpa o formulário
    } else {
      // Se houver erro no envio, exibe a mensagem de erro
      mensagem.textContent = '❌ Ocorreu um erro. Tente novamente.';
      mensagem.style.color = 'red';
    }
  } catch (error) {
    // Se houver erro de rede ou conexão, exibe mensagem de erro
    mensagem.textContent = '❌ Erro de conexão. Verifique sua internet.';
    mensagem.style.color = 'red';
  }

  loading.style.display = 'none'; // Oculta a barra de carregamento
  botao.disabled = false; // Habilita o botão de envio novamente
});
