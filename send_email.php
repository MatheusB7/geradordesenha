<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nome = $_POST['name'];
    $email = $_POST['email'];
    
    // Defina os detalhes do e-mail
    $to = "kronygm@gmail.com";  // Seu e-mail
    $subject = "Novo Comprovante Enviado";
    $message = "Comprovante enviado por: " . $nome . " (" . $email . ")";

    // Cabeçalhos do e-mail
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"boundary\"\r\n";
    
    // Corpo do e-mail
    $body = "--boundary\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $message . "\r\n\r\n";

    // Envio dos arquivos
    if (isset($_FILES['attachment']) && count($_FILES['attachment']['name']) > 0) {
        for ($i = 0; $i < count($_FILES['attachment']['name']); $i++) {
            $file_tmp = $_FILES['attachment']['tmp_name'][$i];
            $file_name = $_FILES['attachment']['name'][$i];
            $file_data = file_get_contents($file_tmp);
            $file_encoded = base64_encode($file_data);
            
            $body .= "--boundary\r\n";
            $body .= "Content-Type: application/octet-stream; name=\"$file_name\"\r\n";
            $body .= "Content-Transfer-Encoding: base64\r\n";
            $body .= "Content-Disposition: attachment; filename=\"$file_name\"\r\n\r\n";
            $body .= $file_encoded . "\r\n\r\n";
        }
    }

    $body .= "--boundary--\r\n";

    // Enviar o e-mail
    if (mail($to, $subject, $body, $headers)) {
        echo "✅ Comprovante enviado com sucesso!";
    } else {
        echo "❌ Ocorreu um erro ao enviar o e-mail.";
    }
}
?>
