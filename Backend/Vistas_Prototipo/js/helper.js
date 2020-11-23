function getLists(data) {
    var date=data.createdAt.substring(0,data.createdAt.length-14)

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
        "</ul>" +
        "<div class='card-footer'>" +
        "<small class='text-muted'>" + date + "</small>" +
        "</div>" +
        "</div>" +
        "</div>"
}

function getProducts(data) {
    var date=data.createdAt.substring(0,data.createdAt.length-14)
    return "<p>"+date+"</p>"
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
    return "<div class='shadow card'>"+
        "<img class='card-img-top h-100 w-100' src='http://localhost:4000/uploads/" + data.imgURL + "'" +
            "alt='Card image cap'>"+
            "<div class='card-body'>"+
                "<h5 class='card-title'>"+data.name+"</h5>"+
                "<p class='card-text'>"+data.desc+"</p>"+
            "</div>"+
            "<ul class='list-group list-group-flush'>"+
                "<li class='list-group-item'><small>"+data.username+"</small></li>"+
            "</ul>"+
            "<div class='card-footer'>"+
                "<small class='text-muted'>"+data.createdAt+"</small>"+
            "</div>"+
    "</div>"
}

function getCategories(data) { 
    return "<a class='dropdown-item' href='./categoriaProducto.html?category="+data.name+"'>"+data.name+"</a>"+
    "<div class='dropdown-divider'></div>"
 }