$(document).ready(function () {
    GetAllFoods(200);
    GetRestaurantsByName();
    GetFoodByName();
    GetCategories();

    $("#adminPanelHover").mouseover(function () {
        $("#adminPanel").show(500);
    });

    var slideTimer;
    $("#slider-3").slider({
        value: 200,
        max: 200,
        orientation: "horizontal",
        slide: function (event, ui) {
            window.clearTimeout(slideTimer);
            //var millisecBeforeRedirect = 10000; 
            slideTimer = window.setTimeout(function ()
            {
                $("#price").val(ui.value + "₺");
                var price = ui.value;
                $("#foodHtml").html("");
                GetAllFoods(price);
            }, 300);
        }
    });
    $("#price").val($("#slider-3").slider("values", 0) + "₺");
});

function AddFoodBasket() {
    $(".food-to-basket").unbind().click(function () {

        var basketType = $(this).attr('type')
        var foodId = $(this).attr('foodId');
        /*var foodPrice = $(this).attr('foodPrice');*/

        $.ajax({
            url: "/Home/AddFoodToBasket",
            type: "POST",
            data: { "foodId": foodId, "type": basketType },
            success: function (res) {
                var data = JSON.parse(res);
                var foodHtml = "";
                $("#foodBasket").html("");

                $.each(data, function (index, value) {
                    foodHtml += "<input id='basket-price' type='hidden' value='" + value.TotalBasketPrice + "'>";
                    foodHtml += "<div foodId='" + value.Id + "' class='col-lg-12 col-md-12 col-sm-12 pb-1'>";
                    foodHtml += "    <div class='card product-item border-0 mb-4'>";
                    foodHtml += "         <div class='card-header product-img position-relative overflow-hidden bg-transparent border p-0'></div>";
                    foodHtml += "         <div class='card-body border-left border-right text-center p-0 pt-4 pb-3'>";
                    foodHtml += "             <div style='color:red;float:right;margin-top:-25px;width:95px' class='input-group quantity mx-auto' style='width: 100px;'>";
                    foodHtml += "                 <div class='input-group-btn'>";
                    foodHtml += "                     <button class='btn btn-sm btn-primary btn-minus food-to-basket' foodId='" + value.Id + "' type='remove'>";
                    foodHtml += "                           <i id='foodMinus' class='fa fa-minus'></i>";
                    foodHtml += "                     </button>";
                    foodHtml += "                 </div>";
                    foodHtml += "                <input id='foodCount' type='text' class='form-control form-control-sm bg-secondary text-center' value='" + value.BasketCount + "'>";
                    foodHtml += "                 <div class='input-group-btn'>";
                    foodHtml += "                     <button class='btn btn-sm btn-primary btn-plus food-to-basket' foodId='" + value.Id + "' type='add'>";
                    foodHtml += "                           <i class='fa fa-plus'></i>";
                    foodHtml += "                      </button>";
                    foodHtml += "                 </div>";
                    foodHtml += "              </div>";
                    /*foodHtml += "            <button type='button' style='color:red;float:right;margin-top:-25px' class='btn'><i class='fa fa-trash'></i></button>";*/
                    foodHtml += "              <div style='align-items:center;margin-top:15px;display:flex;justify-content:space-around' class='d-flex /*justify-content-center*/'>";
                    foodHtml += "                  <img style='width:70px; height:70px; border-radius:10px' src ='" + value.Images + "'>";
                    foodHtml += "                  <h6 style='margin-left:10px;' class='text-truncate mb-3'>" + value.Name + "</h6>";
                    foodHtml += "                  <h6 style='margin-left:10px'>" + value.Price + "₺</h6>";
                    foodHtml += "              </div>";
                    foodHtml += "          </div>";
                    foodHtml += "          <div class='d-flex justify-content-between bg-light border'></div>";
                    foodHtml += "     </div>";
                    foodHtml += "</div>";
                });

                $("#foodBasket").append(foodHtml);

                var basketPrice = $("#basket-price").val();
                $("#totalPrice").html(basketPrice + '₺');
                $("#totalPriceKDV").html(basketPrice + '₺');

                $("#foodBasketDiv").show();

                //$("#orderButton").click(function () {
                //    window.location = "/Home/Order/? foodId = " + foodId + "";
                //})

                $("#orderButton").click(function () {
                    window.location = "/Home/Order";
                })

                AddFoodBasket();
            }
        });
    });
}

//function ClearFoodBasket() {
//    $(".fa-minus").click(function () {

//        var foodId = $(".food-to-basket").attr('foodId');

//        $.ajax({
//            url: "/Home/ClearFoodBasket",
//            type: "POST",
//            data: { "foodId": foodId },
//            success: function (res) {
//                if (res == 1) {
//                    $("#foodMinus").removeClass();
//                    $("#foodMinus").addClass('fa fa-trash');

//                }
//                else if (res == 0) {
//                    $("div[foodId=" + foodId + "]").remove();
//                    $("#foodBasketDiv").hide();

//                }
//                else if (res == -1) {
//                    $("#foodBasketDiv").hide();
//                }
//                $("#foodCount").val(res);
//            }
//        });
//    });
//}

function GetAllFoods(price) {
    $.ajax({
        url: "/Home/GetAllFoods",
        type: "POST",
        data: { "price": price },
        success: function (res) {
            var data = JSON.parse(res);
            var foodHtml = "";

            $.each(data, function (index, value) {
                /*foodHtml += "<div class='col-lg-4 col-md-6 col-sm-12 pb-1'>";*/
                foodHtml += " <div style='margin-left:20px'>";
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
                foodHtml += "            <p class='btn btn-sm text-dark p-0 food-to-basket' foodId='" + value.Id + "' type='add' foodPrice='" + value.Price + "'><i class='fas fa-shopping-cart text-primary mr-1'></i>Sepete Ekle</p>";
                foodHtml += "         </div>";
                foodHtml += "    </div>";
                foodHtml += " </div>";
                /*foodHtml += "</div>";*/
            });

            $("#foodHtml").append(foodHtml);

            AddFoodBasket();
        }
    });
}

function GetFoodByName() {
    $(".searchFoodButton").click(function () {

        /*$("#foodHtml").remove();*/
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
                    /*foodHtml += "<div class='col-lg-4 col-md-6 col-sm-12 pb-1'>";*/
                    foodHtml += "    <div class='card product-item border-0 mb-4'>"
                    foodHtml += "         <div class='card-header product-img position-relative overflow-hidden bg-transparent border p-0'>";
                    foodHtml += "            <img style='width:290px;height:290px' /*class='img-fluid w-100'*/ src ='" + value.Images + "'>";
                    foodHtml += "         </div>";
                    foodHtml += "         <div class='card-body border-left border-right text-center p-0 pt-4 pb-3'>";
                    foodHtml += "         <a href='/Home/RestaurantDetail/" + value.Id + "'><h4>" + value.FoodRestaurantName + "</h4></a>";
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
                    /*foodHtml += "</div>";*/
                });

                $("#foodHtml").append(foodHtml);
            }
        });
    });
}

function GetRestaurantsByName() {
    $(".searchFoodButton").click(function () {

        /*$("#foodHtml").remove();*/
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
                    /*foodHtml += "<div class='col-lg-4 col-md-6 col-sm-12 pb-1'>";*/
                    foodHtml += "    <div class='card product-item border-0 mb-4'>"
                    foodHtml += "         <div class='card-header product-img position-relative overflow-hidden bg-transparent border p-0'>";
                    foodHtml += "            <img style='width:290px;height:290px' /*class='img-fluid w-100*/' src ='" + value.Logo + "'>";
                    foodHtml += "         </div>";
                    foodHtml += "         <div class='card-body border-left border-right text-center p-0 pt-4 pb-3'>";
                    foodHtml += "          <a href='/Home/RestaurantDetail/" + value.Id + "'><h4>" + value.Name + "</h4></a>";
                    foodHtml += "             <h6 class='text-truncate mb-3'>" + value.Location + "</h6>";
                    foodHtml += "             <div class='d-flex justify-content-center'>";
                    foodHtml += "             </div>";
                    foodHtml += "         </div>";
                    foodHtml += "         <div class='card-footer d-flex justify-content-between bg-light border'>";
                    foodHtml += "            <a href='/Home/RestaurantDetail/" + value.Id + "' class='btn btn-sm text-dark p-0'><i class='fas fa-eye text-primary mr-1'></i>Ürün Detayı</a>";
                    foodHtml += "         </div>";
                    foodHtml += "    </div>";
                    /*foodHtml += "</div>";*/
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
                categoriesHtml += "    <a style='margin-left:15px' href='/Home/Foods/?Id=" + value.Id + "' class='nav-item nav-link'><p class='font-weight-semi-bold mb-4' style='color:#6f6f6f; margin-top:-15px;font-size:17px'>" + value.CategoriesName + "</p></a>";
                categoriesHtml += "</div>";
            });

            $("#categoriesHtml").append(categoriesHtml);
        }
    });
}

//function OrderByPriceMethod(clickİd) {
//    $(clickİd).click(function () {
//        //var url = document.location.href + "?success=yes";
//        //document.location = url;

//        //var type = "Active";
//        //var oldURL = window.location.protocol + "//" + window.location.host + window.location.pathname;
//        //var newUrl = oldURL + "?status=" + type;
//        //if (window.history != 'undefined' && window.history.pushState != 'undefined')
//        //{
//        //    window.history.pushState({ path: newUrl }, '', newUrl);
//        //}

//        if ($(clickİd).is(':checked')) {

//            $("#foodHtml").html("");
//            var priceL = $(this).val();
//            var priceH = $(this).attr("value2");

//            $("#price-all").removeAttr("checked");

//            $.ajax({
//                url: "/Home/GetFoodsByOrderPrice",
//                type: "POST",
//                data: {
//                    "priceL": priceL,
//                    "priceH": priceH,
//                },
//                success: function (res) {
//                    var data = JSON.parse(res);
//                    var foodHtml = "";

//                    $.each(data, function (index, value) {
//                        foodHtml += " <div style='margin-left:20px'>";
//                        foodHtml += "    <div class='card product-item border-0 mb-4'>"
//                        foodHtml += "         <div class='card-header product-img position-relative overflow-hidden bg-transparent border p-0'>";
//                        foodHtml += "            <img style='width:300px;height:300px' /*class='img-fluid w-100'*/ src ='" + value.Images + "'>";
//                        foodHtml += "         </div>";
//                        foodHtml += "         <div class='card-body border-left border-right text-center p-0 pt-4 pb-3'>";
//                        foodHtml += "          <a href='/Home/RestaurantDetail/" + value.RestaurantId + "'><h4>" + value.FoodRestaurantName + "</h4></a>";
//                        foodHtml += "             <h6 class='text-truncate mb-3'>" + value.Name + "</h6>";
//                        foodHtml += "             <div class='d-flex justify-content-center'>";
//                        foodHtml += "                <h6>" + value.Price + ".00₺</h6><h6 class='text-muted ml-2'></h6>";
//                        foodHtml += "             </div>";
//                        foodHtml += "         </div>";
//                        foodHtml += "         <div class='card-footer d-flex justify-content-between bg-light border'>";
//                        foodHtml += "            <a href='/Home/FoodDetail/" + value.Id + "' class='btn btn-sm text-dark p-0'><i class='fas fa-eye text-primary mr-1'></i>Ürün Detayı</a>";
//                        foodHtml += "            <a href='' class='btn btn-sm text-dark p-0'><i class='fas fa-shopping-cart text-primary mr-1'></i>Sepete Ekle</a>";
//                        foodHtml += "         </div>";
//                        foodHtml += "    </div>";
//                        foodHtml += " </div>";
//                    });

//                    $("#foodHtml").append(foodHtml);
//                }
//            });
//        }
//        else {
//            $("#foodHtml").html("");
//            GetAllFoods();
//        }
//    });
//}

//function OrderByPrice() {
//    $("#price-all").click(function () {

//        $("#foodHtml").html("");
//        GetAllFoods();

//        $("#price-1").removeAttr(":checked");
//        $("#price-2").removeAttr(":checked");
//        $("#price-3").removeAttr(":checked");
//        $("#price-4").removeAttr(":checked");
//    });

//    OrderByPriceMethod($("#price-1"));
//    OrderByPriceMethod($("#price-2"));
//    OrderByPriceMethod($("#price-3"));
//    OrderByPriceMethod($("#price-4"));
//}

//function OrderByPrice() {
//    $("#price-all").click(function () {

//        $("#foodHtml").html("");
//        GetAllFoods();

//        $("#price-1").removeAttr("checked");
//        $("#price-2").removeAttr("checked");
//    });


//    $("#price-1").click(function () {

//        $("#foodHtml").html("");
//        var priceL = $('#price-1').val();
//        var priceH = $('#price-11').val();

//        $("#price-all").removeAttr("checked");
//        $("#price-2").removeAttr("checked");

//        $.ajax({
//            url: "/Home/GetFoodsByOrderPrice",
//            type: "POST",
//            data: {
//                "priceL": priceL,
//                "priceH": priceH,
//            },
//            success: function (res) {
//                var data = JSON.parse(res);
//                var foodHtml = "";

//                $.each(data, function (index, value) {
//                    foodHtml += " <div style='margin-left:35px'>";
//                    foodHtml += "    <div class='card product-item border-0 mb-4'>"
//                    foodHtml += "         <div class='card-header product-img position-relative overflow-hidden bg-transparent border p-0'>";
//                    foodHtml += "            <img style='width:300px;height:300px' /*class='img-fluid w-100'*/ src ='" + value.Images + "'>";
//                    foodHtml += "         </div>";
//                    foodHtml += "         <div class='card-body border-left border-right text-center p-0 pt-4 pb-3'>";
//                    foodHtml += "          <a href='/Home/RestaurantDetail/" + value.RestaurantId + "'><h4>" + value.FoodRestaurantName + "</h4></a>";
//                    foodHtml += "             <h6 class='text-truncate mb-3'>" + value.Name + "</h6>";
//                    foodHtml += "             <div class='d-flex justify-content-center'>";
//                    foodHtml += "                <h6>" + value.Price + ".00₺</h6><h6 class='text-muted ml-2'></h6>";
//                    foodHtml += "             </div>";
//                    foodHtml += "         </div>";
//                    foodHtml += "         <div class='card-footer d-flex justify-content-between bg-light border'>";
//                    foodHtml += "            <a href='/Home/FoodDetail/" + value.Id + "' class='btn btn-sm text-dark p-0'><i class='fas fa-eye text-primary mr-1'></i>Ürün Detayı</a>";
//                    foodHtml += "            <a href='' class='btn btn-sm text-dark p-0'><i class='fas fa-shopping-cart text-primary mr-1'></i>Sepete Ekle</a>";
//                    foodHtml += "         </div>";
//                    foodHtml += "    </div>";
//                    foodHtml += " </div>";
//                });

//                $("#foodHtml").append(foodHtml);
//            }
//        });
//    });

//    $("#price-2").click(function () {

//        $("#foodHtml").html("");
//        var priceL = $('#price-2').val();
//        var priceH = $('#price-22').val();

//        $("#price-all").removeAttr("checked");
//        $("#price-1").removeAttr("checked");

//        $.ajax({
//            url: "/Home/GetFoodsByOrderPrice",
//            type: "POST",
//            data: {
//                "priceL": priceL,
//                "priceH": priceH,
//            },
//            success: function (res) {
//                var data = JSON.parse(res);
//                var foodHtml = "";

//                $.each(data, function (index, value) {
//                    foodHtml += " <div style='margin-left:35px'>";
//                    foodHtml += "    <div class='card product-item border-0 mb-4'>"
//                    foodHtml += "         <div class='card-header product-img position-relative overflow-hidden bg-transparent border p-0'>";
//                    foodHtml += "            <img style='width:300px;height:300px' /*class='img-fluid w-100'*/ src ='" + value.Images + "'>";
//                    foodHtml += "         </div>";
//                    foodHtml += "         <div class='card-body border-left border-right text-center p-0 pt-4 pb-3'>";
//                    foodHtml += "          <a href='/Home/RestaurantDetail/" + value.RestaurantId + "'><h4>" + value.FoodRestaurantName + "</h4></a>";
//                    foodHtml += "             <h6 class='text-truncate mb-3'>" + value.Name + "</h6>";
//                    foodHtml += "             <div class='d-flex justify-content-center'>";
//                    foodHtml += "                <h6>" + value.Price + ".00₺</h6><h6 class='text-muted ml-2'></h6>";
//                    foodHtml += "             </div>";
//                    foodHtml += "         </div>";
//                    foodHtml += "         <div class='card-footer d-flex justify-content-between bg-light border'>";
//                    foodHtml += "            <a href='/Home/FoodDetail/" + value.Id + "' class='btn btn-sm text-dark p-0'><i class='fas fa-eye text-primary mr-1'></i>Ürün Detayı</a>";
//                    foodHtml += "            <a href='' class='btn btn-sm text-dark p-0'><i class='fas fa-shopping-cart text-primary mr-1'></i>Sepete Ekle</a>";
//                    foodHtml += "         </div>";
//                    foodHtml += "    </div>";
//                    foodHtml += " </div>";
//                });

//                $("#foodHtml").append(foodHtml);
//            }
//        });
//    });
//}

//function Deneme() {
  // var foodIdSplit = foodId.split(",");

    //for (var i = 0; i < foodIdSplit.length; i++) {
    //    console.log(foodIdSplit[i]);
    //    alert([i]);
    //}

//      //var names = 'Harry ;Fred Barney; Helen Rigby ; Bill Abel ;Chris Hand ';

//    //console.log(names);

//    //var re = /\s*(?:;|$)\s*/;
//    //var nameList = names.split(re);

//    //console.log(nameList[1]);

//    /* $("#totalPrice").append($("div[foodId=" + foodId + "]"));*/

 //$(".fa-trash").click(function () {
                //    $("div[foodId=" + foodId + "]").remove();
                //});

//         //var click = $(".food-to-basket").bind();
//                //var toplam = 0;
//                //for (var i = 0; i <= click.bind; i++) {
//                //    var sayi = parseInt($(".food-to-basket").attr('foodPrice')).val();
//                //    toplam += sayi;
//                //    $("#totalPrice").html(toplam + '₺');
//                //    $("#totalPriceKDV").html(toplam + '₺');
//                //}

//                //const ids = [];
//                //ids[0] = foodId;
//                //ids[1] = foodId;
//                //ids[2] = foodId;

//                //var id = ["" + foodId[0] + "", "" + foodId[1] + ""];
//    /*var id = ["1", "2", "3"];*/
//    /*var myArray = id.split(",");*/

//                //$("#orderButton").click(function () {
//                //    window.location = "/Home/Order/?foodId=" + id + "";
//                //})
//}