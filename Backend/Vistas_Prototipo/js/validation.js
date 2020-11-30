function validar_email(email) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
}

function validate_length(text, num) {
    return (text.length >= num) ? true : false;
}

function validate_password(text) {
    var REGEXpass = /^(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&/()=?¡¿])[A-Za-z\d!"#$%&/()=?¡¿]{8,}$/
    return REGEXpass.test(text) ? true : false;
}

function validateImage(id) {

    var imagenes = document.getElementById(id);

    for (var i = 0; i < imagenes.files.length; i++) {
        var imagen = imagenes.files[i];
        var t = imagen.type.split('/').pop().toLowerCase();
        if (t != "jpeg" && t != "jpg" && t != "png" && t != "gif" && t != "bmp") {
            alert('Por favor selecciona una imagen png, jpg, jpeg o bmp');
            document.getElementById(id).value = '';
            return false;
        }
        if (imagen.size > 10240000) {
            alert('Sube un archivo menor a 10MB');
            document.getElementById(id).value = '';
            return false;
        }
    }
    return true;
}