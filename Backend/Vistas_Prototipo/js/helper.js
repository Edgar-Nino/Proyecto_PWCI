function getLists(data) {
    var date = data.createdAt.substring(0, data.createdAt.length - 14)

    return "<div class='col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2'>" +
        "<div class='shadow card'>" +
        "<img class='card-img-top h-100 w-100' src='http://localhost:4000/uploads/" + data.imgURL + "'" +
        "alt='Card image cap'>" +
        "<div class='card-body'>" +
        "<a style='font-size: large;' href=lista.html?lista=" + data._id + " class='card-title'>" + data.name + "</a>" +
        "<p class='card-text'>" + data.desc + "</p>" +
        "</div>" +
        "<ul class='list-group list-group-flush'>" +
        "<li class='list-group-item'><small>" + data.username + "</small></li>" +
        "</ul>" +
        "<div class='card-footer'>" +
        "<small class='text-muted'>" + date + "</small>" +
        "</div>" +
        "</div>" +
        "</div>"
}

function getMyLists(data) {
    var date = data.createdAt.substring(0, data.createdAt.length - 14)

    return "<div class='col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2'>" +
        "<div class='shadow card'>" +
        "<img class='card-img-top h-100 w-100' src='http://localhost:4000/uploads/" + data.imgURL + "'" +
        "alt='Card image cap'>" +
        "<div class='card-body'>" +
        "<a style='font-size: large;' href=lista.html?" + data._id + " class='card-title'>" + data.name + "</a>" +
        "<p class='card-text'>" + data.desc + "</p>" +
        "</div>" +
        "<ul class='list-group list-group-flush'>" +
        "<li class='list-group-item'><small>" + data.username + "</small></li>" +
        "<li class='list-group-item'><button>Eliminar Lista</button></li>" +
        "</ul>" +
        "<div class='card-footer'>" +
        "<small class='text-muted'>" + date + "</small>" +
        "</div>" +
        "</div>" +
        "</div>"
}

function getProducts(data) {
    var date = data.createdAt.substring(0, data.createdAt.length - 14)
    return "<div class='col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2'>" +
        "<div class='shadow card'>" +
        "<img class='card-img-top h-100 w-100' src='http://localhost:4000/uploads/" + data.imgURL + "'" +
        "alt='Card image cap'>" +
        "<div class='card-body'>" +
        "<h5 class='card-title'>" + data.name + "</h5>" +
        "<p class='card-text'>" + data.desc + "</p>" +
        "</div>" +
        "<ul class='list-group list-group-flush'>" +
        "<li class='list-group-item'><small>" + data.category + "</small></li>" +
        "</ul>" +
        "<ul class='list-group list-group-flush'>" +
        "<button data-toggle='modal' data-target='#AddProductList' class='w-50 my-2 mx-auto btn btn-primary'>Agregar a lista</button>" +
        "</ul>" +
        "<div class='card-footer'>" +
        "<small class='text-muted'>" + date + "</small>" +
        "</div>" +
        "</div>" +
        "</div>"
}

function getProductsList(data) {
    return "<div class='col-xs-6 col-md-4 col-lg-3'>" +
        "<div class='shadow card'>" +
        "<img class='card-img-top h-100 w-100' src='http://localhost:4000/uploads/" + data.imgURL + "'" +
        "alt='Card image cap'>" +
        "<div class='card-body'>" +
        "<h5 class='card-title'>" + data.name + "</h5>" +
        "<p class='card-text'>" + data.desc + "</p>" +
        "</div>" +
        "<ul class='list-group list-group-flush'>" +
        "<li class='list-group-item'><small>" + data.category + "</small></li>" +
        "</ul>" +
        "<div class='card-footer'>" +
        "<small class='text-muted'>" + data.createdAt + "</small>" +
        "</div>" +
        "</div>" +
        "</div>"
}

function getBigList(data) {
    return "<div class='shadow card'>" +
        "<img class='card-img-top h-100 w-100' src='http://localhost:4000/uploads/" + data.imgURL + "'" +
        "alt='Card image cap'>" +
        "<div class='card-body'>" +
        "<h5 class='card-title'>" + data.name + "</h5>" +
        "<p class='card-text'>" + data.desc + "</p>" +
        "</div>" +
        "<ul class='list-group list-group-flush'>" +
        "<li class='list-group-item'><small>" + data.username + "</small></li>" +
        "</ul>" +
        "<div class='card-footer'>" +
        "<small class='text-muted'>" + data.createdAt + "</small>" +
        "</div>" +
        "</div>"
}

//NAVBAR

function getCategories(data) {
    return "<a class='dropdown-item' href='./categoriaProducto.html?category=" + data.name + "'>" + data.name + "</a>" +
        "<div class='dropdown-divider'></div>"
}

function userDropdown(data) {
    helper = "<a href='./settingsUser.html'><button class='dropdown-item'>Editar</button></a>" +
        "<button id='buttonDeleteUser' class='dropdown-item' >Darte de baja</button>" +
        "<button class='dropdown-item' id='LogOut' href='#'>Log Out</button>"

    return "<a class='nav-link dropdown-toggle' href='#' id='navbarDropdownUser' role='button' data-toggle='dropdown'"+
    "aria-haspopup='true' aria-expanded='false'>"+
    data.username +
    "</a>"+
    "<div id='' class='dropdown-menu' aria-labelledby='navbarDropdownUser'>"+
    helper+
    "</div>"
}

function getList(List) {
    switch (List) {
        case "myList": {
            return "<li class='nav-item'>" +
                "<a class='nav-link' href='./misListas.html'>Mis Listas</a>" +
                "</li>"
            break;
        }
        case "Admin": {
            return "<li class='nav-item'>" +
                "<a class='nav-link' href='./CrearSecPro.html'>Crear Productos y/o Secciones</a>" +
                "</li>"
            break;
        }
    }
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

