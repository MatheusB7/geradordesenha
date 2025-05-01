document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('comprovanteForm');
  const loading = document.getElementById('loading');
  const mensagem = document.getElementById('mensagem');
  const botao = document.getElementById('submitButton');

  if (form) {
    form.addEventListener('submit', function () {
      if (loading) loading.style.display = 'block';
      if (mensagem) mensagem.textContent = '';
      if (botao) botao.disabled = true;
    });
  }

  if (window.location.pathname.includes('obrigado.html')) {
    if (mensagem) {
      mensagem.textContent = '✅ Comprovante enviado com sucesso!';
      mensagem.style.color = 'green';
    }
  }
});
