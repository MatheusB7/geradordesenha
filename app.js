const form = document.getElementById('comprovanteForm');
const loading = document.getElementById('loading');
const mensagem = document.getElementById('mensagem');
const botao = document.getElementById('submitButton');

form.addEventListener('submit', async function (e) {
  e.preventDefault(); // Evita o redirecionamento padrão
  loading.style.display = 'block';
  mensagem.innerHTML = '';
  botao.disabled = true;

  const formData = new FormData(form);

  try {
    const response = await fetch('https://formsubmit.co/ajax/kronygm@gmail.com', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      mensagem.innerHTML = `<h1>✅ Comprovante enviado com sucesso!</h1><p>Obrigado! Em breve entraremos em contato.</p>`;
      mensagem.style.color = 'green';
      form.reset();
    } else {
      mensagem.textContent = '❌ Ocorreu um erro. Tente novamente.';
      mensagem.style.color = 'red';
    }
  } catch (error) {
    mensagem.textContent = '❌ Erro de conexão. Verifique sua internet.';
    mensagem.style.color = 'red';
  }

  loading.style.display = 'none';
  botao.disabled = false;
});
