// Função para criptografar o texto
function criptografar(texto) {
    return texto.replace(/e/g, "enter")
                .replace(/i/g, "imes")
                .replace(/a/g, "ai")
                .replace(/o/g, "ober")
                .replace(/u/g, "ufat");
}

// Função para descriptografar o texto
function descriptografar(texto) {
    return texto.replace(/enter/g, "e")
                .replace(/imes/g, "i")
                .replace(/ai/g, "a")
                .replace(/ober/g, "o")
                .replace(/ufat/g, "u");
}

// Função para copiar o texto para a área de transferência
function copiarTexto(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        alert("Texto copiado para a área de transferência!");
    }).catch(err => {
        console.error('Erro ao copiar texto: ', err);
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    const btnCriptografar = document.querySelector('.btn__cript');
    const btnDescriptografar = document.querySelector('.btn__descript');
    const textArea = document.querySelector('.text__area');
    const responseDefault = document.querySelector('.response__default');
    const responseTextArea = document.querySelector('.response__text');
    const copyButton = document.querySelector('.btn__copy');

    btnCriptografar.addEventListener('click', () => {
        const texto = textArea.value;
        if (!validarTexto(texto)) {
            alert("Por favor, utilize apenas letras minúsculas e sem acentos.");
            return;
        }
        const textoCriptografado = criptografar(texto);
        exibirResposta(textoCriptografado);
    });

    btnDescriptografar.addEventListener('click', () => {
        const texto = textArea.value;
        if (!validarTexto(texto)) {
            alert("Por favor, utilize apenas letras minúsculas e sem acentos.");
            return;
        }
        const textoDescriptografado = descriptografar(texto);
        exibirResposta(textoDescriptografado);
    });

    copyButton.addEventListener('click', () => {
        copiarTexto(responseTextArea.value);
    });

    responseTextArea.addEventListener('input', () => {
        if (responseTextArea.value.trim() === "") {
            ocultarResposta();
        }
    });

    function exibirResposta(texto) {
        responseDefault.style.display = 'none';
        responseTextArea.style.display = 'block';
        responseTextArea.value = texto;
        copyButton.style.display = 'block';
    }

    function validarTexto(texto) {
        const regex = /^[a-z\s]*$/;
        return regex.test(texto);
    }
});
