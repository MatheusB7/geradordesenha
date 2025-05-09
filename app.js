const form = document.getElementById('comprovanteForm');
const loading = document.getElementById('loading');
const mensagem = document.getElementById('mensagem');
const submitButton = document.getElementById('submitButton');

// Nome do projeto
const nomeDoProjeto = 'Gerador de Senhas - MBS Technology';

// Cria e adiciona dinamicamente o campo oculto com o nome do projeto
const campoProjeto = document.createElement('input');
campoProjeto.type = 'hidden';
campoProjeto.name = 'Projeto';
campoProjeto.value = nomeDoProjeto;
form.appendChild(campoProjeto);

form.addEventListener('submit', function (e) {
  e.preventDefault();

  loading.style.display = 'block';
  mensagem.textContent = '';
  submitButton.disabled = true;

  fetch(form.action, {
    method: 'POST',
    body: new FormData(form)
  })
    .then(response => {
      if (response.ok) {
        mensagem.textContent = '✅ Comprovante enviado com sucesso!';
        mensagem.style.color = 'lightgreen';
        form.reset();
      } else {
        mensagem.textContent = '❌ Ocorreu um erro ao enviar o comprovante.';
        mensagem.style.color = 'red';
      }
    })
    .catch(() => {
      mensagem.textContent = '❌ Falha na conexão. Tente novamente.';
      mensagem.style.color = 'red';
    })
    .finally(() => {
      loading.style.display = 'none';
      submitButton.disabled = false;
    });
});
