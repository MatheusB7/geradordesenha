#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <windows.h>

void limparTela() {
    system("cls");
}

int validarCodigo(char *codigoDigitado) {
    time_t t = time(NULL);
    struct tm tm = *localtime(&t);

    int mes = tm.tm_mon + 1;
    int ano = tm.tm_year + 1900;
    int diferencaAno = ano - 2025;
    int base = 29042904 + (diferencaAno * 10001001);
    int resultado = base * mes;

    char codigoCorreto[20];
    sprintf(codigoCorreto, "MBS%d", resultado);

    return strcmp(codigoDigitado, codigoCorreto) == 0;
}

void salvarSenhaEmArquivo(const char *senha) {
    time_t t = time(NULL);
    struct tm tm = *localtime(&t);
    char nomeArquivo[200];
    char caminhoDesktop[300];

    sprintf(caminhoDesktop, "C:\\Users\\%s\\Desktop", getenv("USERNAME"));
    sprintf(nomeArquivo, "%s\\senhambs - %02d_%04d.txt", caminhoDesktop, tm.tm_mon + 1, tm.tm_year + 1900);

    FILE *arquivo = fopen(nomeArquivo, "a");
    if (arquivo != NULL) {
        fprintf(arquivo, "Senha gerada: %s\n", senha);
        fclose(arquivo);
        printf("\n✅ Senha salva com sucesso no arquivo:\n📁 \"%s\"\n", nomeArquivo);
        printf("💾 O arquivo foi salvo automaticamente na sua Área de Trabalho.\n");
        Sleep(5000);
    } else {
        printf("❌ Erro ao salvar a senha no arquivo.\n");
    }
}

void gerarSenha(int premium) {
    int tamanho = 8;

    if (premium) {
        printf("Quantos caracteres (entre 8 e 20)? ");
        scanf("%d", &tamanho);
        if (tamanho < 8) tamanho = 8;
        if (tamanho > 20) tamanho = 20;
    }

    const char *minusculas = "abcdefghijklmnopqrstuvwxyz";
    const char *maiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const char *numeros = "0123456789";
    const char *simbolos = "!@#$%&*";

    char todos[100] = "";
    strcat(todos, minusculas);
    strcat(todos, numeros);
    if (premium) {
        strcat(todos, maiusculas);
        strcat(todos, simbolos);
    }

    srand(time(NULL));
    char senha[25] = "";

    for (int i = 0; i < tamanho; i++) {
        senha[i] = todos[rand() % strlen(todos)];
    }
    senha[tamanho] = '\0';

    printf("\n🔑 Senha gerada: %s\n", senha);

    char salvar;
    printf("\n❓ Deseja salvar a senha automaticamente na Área de Trabalho? (s/n): ");
    scanf(" %c", &salvar);

    if (salvar == 's' || salvar == 'S') {
        salvarSenhaEmArquivo(senha);
    } else {
        printf("🔕 Senha **não** salva.\n");
    }
}

int main() {
    SetConsoleOutputCP(65001); // Suporte a UTF-8 no Windows
    limparTela();

    printf("=====================================\n");
    printf(" Gerador de Senhas Seguras - MBS\n");
    printf("=====================================\n");

    printf("\nModos disponíveis:\n\n");

    printf("Modo Gratuito (Free):\n");
    printf("➤ Gera senha com 8 caracteres\n");
    printf("➤ Usa apenas letras minúsculas e números\n\n");

    printf("Modo Premium (Pago):\n");
    printf("➤ Solicita um código de ativação\n");
    printf("➤ Se o código estiver correto:\n");
    printf("   - Permite senha com 8 a 20 caracteres\n");
    printf("   - Pode incluir letras maiúsculas, minúsculas, números e símbolos\n");
    printf("➤ O código muda mensalmente (baseado no mês e ano)\n\n");

    int opcao;
    printf("Escolha o modo de geração de senha:\n");
    printf("=====================================\n");
    printf("[1] Modo Grátis  ➜ Senha com 8 caracteres (letras e números)\n");
    printf("[2] Modo Premium ➜ Senha com até 20 caracteres (inclui símbolos)\n");
    printf("=====================================\n");
    printf("Digite sua opção: ");
    scanf("%d", &opcao);

    if (opcao == 1) {
        gerarSenha(0);
    } else if (opcao == 2) {
        char codigo[30];
        printf("\n🔐 Digite o código de ativação (ex: MBS116171616): ");
        scanf("%s", codigo);

        if (validarCodigo(codigo)) {
            printf("✅ Código válido. Acesso ao modo premium liberado!\n");
            gerarSenha(1);
        } else {
            printf("❌ Código de ativação inválido. Encerrando...\n");
            exit(0);
        }
    } else {
        printf("❌ Opção inválida. Encerrando...\n");
    }

    return 0;
}
