$(document).ready(function () {
    GetFoodsById();
    GetRestaurantsByName();
    GetFoodByName();
    GetCategories();
    OrderByPrice();
});

function GetFoodsById() {

    var categoriesId = $("#categoriesId").val();

    $.ajax({
        url: "/Home/GetFoodsById",
        type: "POST",
        data: { "categoriesId" : categoriesId},
        success: function (res) {
            var data = JSON.parse(res);
            var foodHtml = "";  

            $.each(data, function (index, value) {
                /*  foodHtml += "<div class='col-lg-2 col-md-6 col-sm-12 pb-1'>";*/
                foodHtml += "    <div style='margin-left:20px' class='card product-item border-0 mb-4'>"
                foodHtml += "         <div class='card-header product-img position-relative overflow-hidden bg-transparent border p-0'>";
                foodHtml += "            <img style='width:300px;height:300px' src ='" + value.Images + "'>";
                foodHtml += "         </div>";
                foodHtml += "         <div class='card-body border-left border-right text-center p-0 pt-4 pb-3'>";
                foodHtml += "        <a href='/Home/RestaurantDetail/" + value.RestaurantId + "'><h4>" + value.FoodRestaurantName + "</h4></a>";
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
             /*   foodHtml += "</div>";*/
            });

            $("#foodHtml").append(foodHtml);
        }
    });
}

function GetFoodByName() {
    $(".searchFoodButton").click(function () {

        $("#foodHtml").html("");
        var food = $("#searchFoodByName").val();

        $.ajax({
            url: "/Home/SearchFood",
            type: "POST",
            data: { "food": food },
            success: function (res) {
                var data = JSON.parse(res);
                var foodHtml = "";

                $.each(data, function (index, value) {
                    /*                foodHtml += "<div class='col-lg-4 col-md-6 col-sm-12 pb-1'>";*/
                    foodHtml += "    <div class='card product-item border-0 mb-4'>"
                    foodHtml += "         <div class='card-header product-img position-relative overflow-hidden bg-transparent border p-0'>";
                    foodHtml += "            <img style='width:300px;height:300px' src ='" + value.Images + "'>";
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
          /*          foodHtml += "</div>";*/
                });

                $("#foodHtml").append(foodHtml);
            }
        });
    });
}

function GetRestaurantsByName() {
    $(".searchFoodButton").click(function () {

        $("#foodHtml").html("");
        var restaurants = $("#searchFoodByName").val();

        $.ajax({
            url: "/Home/SearchRestaurants",
            type: "POST",
            data: { "restaurants": restaurants },
            success: function (res) {
                var data = JSON.parse(res);
                var foodHtml = "";

                $.each(data, function (index, value) {
                    /*      foodHtml += "<div class='col-lg-4 col-md-6 col-sm-12 pb-1'>";*/
                    foodHtml += "    <div class='card product-item border-0 mb-4'>"
                    foodHtml += "         <div class='card-header product-img position-relative overflow-hidden bg-transparent border p-0'>";
                    foodHtml += "            <img style='width:300px;height:300px' src ='" + value.Logo + "'>";
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
                 /*   foodHtml += "</div>";*/
                });

                $("#foodHtml").append(foodHtml);
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

function OrderByPriceMethod(clickİd) {
    $(clickİd).click(function () {
       
        $("#foodHtml").html("");
        var priceL = $(this).val();
        var priceH = $(this).attr("value2");
        var categoryId = $("categoriesId").val();

        $("#price-all").removeAttr("checked");

        $.ajax({
            url: "/Home/GetFoodsByCategoryByOrderPrice",
            type: "POST",
            data: {
                "priceL": priceL,
                "priceH": priceH,
                "categoryId": categoryId,
            },
            success: function (res) {
                var data = JSON.parse(res);
                var foodHtml = "";

                $.each(data, function (index, value) {
                    foodHtml += " <div style='margin-left:35px'>";
                    foodHtml += "    <div class='card product-item border-0 mb-4'>"
                    foodHtml += "         <div class='card-header product-img position-relative overflow-hidden bg-transparent border p-0'>";
                    foodHtml += "            <img style='width:300px;height:300px' /*class='img-fluid w-100'*/ src ='" + value.Images + "'>";
                    foodHtml += "         </div>";
                    foodHtml += "         <div class='card-body border-left border-right text-center p-0 pt-4 pb-3'>";
                    foodHtml += "          <a href='/Home/RestaurantDetail/" + value.RestaurantId + "'><h4>" + value.FoodRestaurantName + "</h4></a>";
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
                    foodHtml += " </div>";
                });

                $("#foodHtml").append(foodHtml);
            }
        });
    });
}

function OrderByPrice() {
    $("#price-all").click(function () {

        $("#foodHtml").html("");
        GetAllFoods();

        $("#price-1").removeAttr("checked");
        $("#price-2").removeAttr("checked");
    });

    OrderByPriceMethod($("#price-1"));
    OrderByPriceMethod($("#price-2"));
    OrderByPriceMethod($("#price-3"));
    OrderByPriceMethod($("#price-4"));
}
