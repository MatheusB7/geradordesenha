document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('comprovanteForm');
  const loading = document.getElementById('loading');
  const mensagem = document.getElementById('mensagem');
  const botao = document.getElementById('submitButton');

  if (form) {
    form.addEventListener('submit', function () {
      // Mostra loading
      if (loading) loading.style.display = 'block';

      // Oculta mensagens anteriores
      if (mensagem) mensagem.textContent = '';

      // Desativa o botão
      if (botao) botao.disabled = true;
    });
  }

  // Detecta se estamos na página de sucesso (obrigado.html)
  if (window.location.pathname.includes('obrigado.html')) {
    if (mensagem) {
      mensagem.textContent = '✅ Comprovante enviado com sucesso!';
      mensagem.style.color = 'green';
    }

    if (loading) loading.style.display = 'none';
  }
});
