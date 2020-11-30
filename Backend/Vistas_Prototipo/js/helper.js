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

function getUsers(data) {
    var date = data.createdAt.substring(0, data.createdAt.length - 14)

    return "<div class='col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2'>" +
        "<div class='shadow card'>" +
        "<img class='card-img-top h-100 w-100' src='http://localhost:4000/uploads/" + data.imgURL + "'" +
        "alt='Card image cap'>" +
        "<div class='card-body'>" +
        "<p style='font-size: large; class='card-title'>" + data.username + "</p>" +
        "<p class='card-text'>" + data.email + "</p>" +
        "</div>" +
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
        "<div class='card-footer'>" +
        "<small class='text-muted'>" + date + "</small>" +
        "</div>" +
        "</div>" +
        "</div>"
}

function getProductsList(data, ismylist) {
    var date = data.createdAt.substring(0, data.createdAt.length - 14)

    seTiBus = (data.seTiene) ? "Lo tiene" : "Lo busca";

    var buttons = (ismylist) ? "<button data-id='" + data._id + "' data-toggle='modal' data-target='#ModProductModal' class='modProduct w-50 my-2 mx-auto btn btn-warning'>Modificar</button>" +
        "<button data-id='" + data._id + "' class='deleteProduct w-50 my-2 mx-auto btn btn-danger'>Eliminar</button>" : "";

    return "<div class='col-xs-6 col-md-4 col-lg-3'>" +
        "<div class='shadow card'>" +
        "<img class='card-img-top h-100 w-100' src='http://localhost:4000/uploads/" + data.imgURL + "'" +
        "alt='Card image cap'>" +
        "<div class='card-body'>" +
        "<h5 class='card-title'>" + data.name + "</h5>" +
        "<p class='card-text'>" + data.desc + "</p>" +
        "<small class='card-text' style='color: rgb(108, 108, 255);'>" + seTiBus + "</small>" +
        "</div>" +
        "<ul class='listproduct list-group list-group-flush'>" +
        buttons +
        "</ul>" +
        "<div class='card-footer'>" +
        "<small class='text-muted'>" + date + "</small>" +
        "</div>" +
        "</div>" +
        "</div>"
}

function getBigList(data, ismylist) {
    var date = data.createdAt.substring(0, data.createdAt.length - 14)
    var buttons = (ismylist) ? "<button data-toggle='modal' data-target='#ModListModal' class='modList w-50 my-2 mx-auto btn btn-warning'>Modificar</button>" +
        "<button class='deleteList w-50 my-2 mx-auto btn btn-danger'>Eliminar</button>" : "";
    return "<div class='shadow card'>" +
        "<img class='card-img-top h-100 w-100' src='http://localhost:4000/uploads/" + data.imgURL + "'" +
        "alt='Card image cap'>" +
        "<div class='card-body'>" +
        "<h5 class='card-title'>" + data.name + "</h5>" +
        "<p class='card-text'>" + data.desc + "</p>" +
        "</div>" +
        "<ul class='list-group list-group-flush'>" +
        "<li class='list-group-item'><small>" + data.username + "</small></li>" +
        buttons +
        "</ul>" +
        "<div class='card-footer'>" +
        "<small class='text-muted'>" + date + "</small>" +
        "</div>" +
        "</div>"
}

//ADDLIST MODAL

function getListsList(data) {
    return "<option value='" + data._id + "'>" + data.name + "</option>"
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

    return "<a class='nav-link dropdown-toggle' href='#' id='navbarDropdownUser' role='button' data-toggle='dropdown'" +
        "aria-haspopup='true' aria-expanded='false'>" +
        data.username +
        "</a>" +
        "<div id='' class='dropdown-menu' aria-labelledby='navbarDropdownUser'>" +
        helper +
        "</div>"
}

function getUserImage(data) {
    return "<img style='border-radius: 50%; height: 5vh;width: auto;' class='d-inline' src='http://localhost:4000/uploads/" + data.imgURL + "' alt=''>"
}

function getList(List) {
    switch (List) {
        case "myList": {
            return "<li class='nav-item'>" +
                "<a class='nav-link' href='./misListas.html'>Mis Listas</a>" +
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

