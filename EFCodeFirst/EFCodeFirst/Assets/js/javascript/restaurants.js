$(document).ready(function () {
    GetRestaurants();
    GetRestaurantsByName();
    GetFoodByName();
    GetCategories();
});

function GetRestaurants() {
    $.ajax({
        url: "/Home/GetAllRestaurants",
        type: "POST",
        success: function (res) {
            var data = JSON.parse(res);
            var restaurantHtml = "";

            $.each(data, function (index, value) {
                restaurantHtml += " <div style='margin-left:20px'>";
                restaurantHtml += "    <div class='card product-item border-0 mb-4'>"
                restaurantHtml += "         <div class='card-header product-img position-relative overflow-hidden bg-transparent border p-0'>";
                restaurantHtml += "            <img style='width:300px;height:300px' /*class='img-fluid w-100'*/ src ='" + value.Logo + "'>";
                restaurantHtml += "         </div>";
                restaurantHtml += "         <div class='card-body border-left border-right text-center p-0 pt-4 pb-3'>";
                restaurantHtml += "             <h4>" + value.Name + "</h4></a>";
                restaurantHtml += "             <h6 class='text-truncate mb-3'>" + value.Location + "</h6>";
                restaurantHtml += "         </div>";
                restaurantHtml += "         <div class='card-footer d-flex justify-content-between bg-light border'>";
                restaurantHtml += "            <a href='/Home/RestaurantDetail/" + value.Id + "' class='btn btn-sm text-dark p-0'><i class='fas fa-shopping-cart text-primary mr-1'></i>Restoran Detayı</a>";
                restaurantHtml += "         </div>";
                restaurantHtml += "    </div>";
                restaurantHtml += " </div>";
            });

            $("#restaurantHtml").append(restaurantHtml);
        }
    });
}

function GetFoodByName() {
    $(".searchFoodButton").click(function () {

        $("#foodHtml").remove();
        var food = $("#searchFoodByName").val();

        $.ajax({
            url: "/Home/SearchFood",
            type: "POST",
            data: { "food": food },
            success: function (res) {
                var data = JSON.parse(res);
                var foodHtml = "";

                $.each(data, function (index, value) {
                    foodHtml += "<div class='col-lg-4 col-md-6 col-sm-12 pb-1'>";
                    foodHtml += "    <div class='card product-item border-0 mb-4'>"
                    foodHtml += "         <div class='card-header product-img position-relative overflow-hidden bg-transparent border p-0'>";
                    foodHtml += "            <img class='img-fluid w-100' src ='" + value.Images + "'>";
                    foodHtml += "         </div>";
                    foodHtml += "         <div class='card-body border-left border-right text-center p-0 pt-4 pb-3'>";
                    foodHtml += "         <h4>" + value.FoodRestaurantName + "</h6><h6 class='text-muted ml-2'></h6>";
                    foodHtml += "             <h6 class='text-truncate mb-3'>" + value.Name + "</h6>";
                    foodHtml += "             <div class='d-flex justify-content-center'>";
                    foodHtml += "                <h6>" + value.Price + ".00₺</h6><h6 class='text-muted ml-2'></h6>";
                    foodHtml += "             </div>";
                    foodHtml += "         </div>";
                    foodHtml += "         <div class='card-footer d-flex justify-content-between bg-light border'>";
                    foodHtml += "            <a href='/Home/FoodDetail/" + value.Id + "' class='btn btn-sm text-dark p-0'><i class='fas fa-eye text-primary mr-1'></i>Ürün Detayı</a>";
                    foodHtml += "            <a href='' class='btn btn-sm text-dark p-0'><i class='fas fa-shopping-cart text-primary mr-1'></i>Sepete Ekle</a>";
                    foodHtml += "         </div>";
                    foodHtml += "    </div>";
                    foodHtml += "</div>";
                });

                $("#searchFoodHtml").append(foodHtml);
            }
        });
    });
}

function GetRestaurantsByName() {
    $(".searchFoodButton").click(function () {

        $("#foodHtml").remove();
        var restaurants = $("#searchFoodByName").val();

        $.ajax({
            url: "/Home/SearchRestaurants",
            type: "POST",
            data: { "restaurants": restaurants },
            success: function (res) {
                var data = JSON.parse(res);
                var foodHtml = "";

                $.each(data, function (index, value) {
                    foodHtml += "<div class='col-lg-4 col-md-6 col-sm-12 pb-1'>";
                    foodHtml += "    <div class='card product-item border-0 mb-4'>"
                    foodHtml += "         <div class='card-header product-img position-relative overflow-hidden bg-transparent border p-0'>";
                    foodHtml += "            <img class='img-fluid w-100' src ='" + value.Logo + "'>";
                    foodHtml += "         </div>";
                    foodHtml += "         <div class='card-body border-left border-right text-center p-0 pt-4 pb-3'>";
                    foodHtml += "          <a href='/Home/RestaurantDetail/" + value.Id + "'><h4>" + value.Name + "</h6><h6 class='text-muted ml-2'></h6></a>";
                    foodHtml += "             <h6 class='text-truncate mb-3'>" + value.Location + "</h6>";
                    foodHtml += "             <div class='d-flex justify-content-center'>";
                    foodHtml += "             </div>";
                    foodHtml += "         </div>";
                    foodHtml += "         <div class='card-footer d-flex justify-content-between bg-light border'>";
                    foodHtml += "            <a href='/Home/RestaurantDetail/" + value.Id + "' class='btn btn-sm text-dark p-0'><i class='fas fa-eye text-primary mr-1'></i>Ürün Detayı</a>";
                    foodHtml += "            <a href='' class='btn btn-sm text-dark p-0'><i class='fas fa-shopping-cart text-primary mr-1'></i>Sepete Ekle</a>";
                    foodHtml += "         </div>";
                    foodHtml += "    </div>";
                    foodHtml += "</div>";
                });

                $("#searchFoodHtml").append(foodHtml);
            }
        });
    });
}

function GetCategories() {
    $.ajax({
        url: "/Home/GetCategories",
        type: "POST",
        success: function (res) {
            var data = JSON.parse(res);
            var categoriesHtml = "";

            $.each(data, function (index, value) {
                categoriesHtml += "<div style='display:flex; align-items:flex-end; margin-bottom:10px'>";
                categoriesHtml += "    <img style='width:80px;height:80px; border-radius:10px' src ='" + value.CategoriesImages + "'>";
                categoriesHtml += "    <a style='margin-left:15px' href='/Home/Foods/?Id=" + value.Id + "' class='nav-item nav-link'><p class='font-weight-semi-bold mb-4' style='color:#6f6f6f; margin-top:-15px'>" + value.CategoriesName + "</p></a>";
                categoriesHtml += "</div>";
            });

            $("#categoriesHtml").append(categoriesHtml);
        }
    });
}