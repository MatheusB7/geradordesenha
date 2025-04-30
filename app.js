// Substitua com sua chave pública do Stripe
const stripe = Stripe('pk_test_TuA7Dq7UqOdcHZh7CxxS0Tgf00AXkjHVRp');
const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');

// Processa pagamento com Stripe
const paymentForm = document.getElementById('paymentForm');
paymentForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const { token, error } = await stripe.createToken(cardElement);
    if (error) {
        alert("Erro ao processar o pagamento: " + error.message);
    } else {
        const response = await fetch('/process_payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: token.id,
                email: document.getElementById('email').value
            })
        });
        const result = await response.json();
        if (result.success) {
            alert('Pagamento realizado com sucesso!');
        } else {
            alert('Erro no pagamento. Tente novamente.');
        }
    }
});

// Copiar código Pix
function copyPixCode() {
    const pixInput = document.getElementById("pixCode");
    pixInput.select();
    pixInput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Código Pix copiado!");
}

// Download do app
document.getElementById('downloadBtn').addEventListener('click', () => {
    window.location.href = "link_do_download_do_app"; // substitua pelo link real
});
