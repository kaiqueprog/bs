function enviar() {
    let nome = document.getElementById('name').value;
    let numero = document.getElementById('numero').value;

    if (nome === "" || numero === "") {
        $('#success_message').hide();
        $('#error_message').show();
    } else {
        $('#success_message').show();
        $('#error_message').hide();
    }
}