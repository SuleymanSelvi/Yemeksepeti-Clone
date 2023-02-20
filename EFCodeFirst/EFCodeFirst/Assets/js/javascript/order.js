$(document).ready(function () {
    FoodDetail();
});

function FoodDetail() {
    $.ajax({
        url: "/Home/GetFoodsForOrder",
        type: "POST",
        success: function (res) {
            var data = JSON.parse(res);
            var foodHtml = "";

            $.each(data, function (index, value) {
                foodHtml += "<tr id='total-basket-price' price='" + value.TotalBasketPrice + "' style='display:none'></tr>";
                foodHtml += "<tr foodId='" + value.Id + "'>";
                foodHtml += "    <td class='align-middle'><img src='" + value.Images + "'style='width:125px; height:80px; border-radius:5px'></td>";
                foodHtml += "    <td class='align-middle'>" + value.Name + "</td>";
                foodHtml += "    <td class='align-middle'>" + value.Price + "₺</td>";
                foodHtml += "    <td class='align-middle'>";
                foodHtml += "      <div class='input-group quantity mx-auto' style='width:100px;'>";
                foodHtml += "         <div class='input-group-btn'>";
                foodHtml += "         <button class='btn btn-sm btn-primary btn-minus food-to-basket' foodId='" + value.Id + "' type='remove'>";
                foodHtml += "                <i id='foodMinus' class='fa fa-minus'></i>";
                foodHtml += "             </button>";
                foodHtml += "          </div>";
                foodHtml += "          <input id='foodCount' type='text' class='form-control form-control-sm bg-secondary text-center' value='" + value.BasketCount + "'>";
                foodHtml += "         <div class='input-group-btn'>";
                foodHtml += "              <button class='btn btn-sm btn-primary btn-plus food-to-basket' foodId='" + value.Id + "' type='add'>";
                foodHtml += "                <i id='foodPlus' foodPrice=" + value.Price + " class='fa fa-plus'></i>";
                foodHtml += "             </button>";
                foodHtml += "          </div>";
                foodHtml += "     </td>";
                foodHtml += "     <td id='basket-price' class='align-middle'>" + value.BasketPrice + "₺</td>";
                foodHtml += "     <td class='align-middle'>";
                foodHtml += "         <button style='color:red;' class='btn food-to-basket' foodId='" + value.Id + "' type='delete'>";
                foodHtml += "               <i class='fa fa-trash'></i>";
                foodHtml += "         </button>";
                foodHtml += "     </td>";
                foodHtml += "</tr>";
            });
            
            $("#foodHtml").append(foodHtml);

            var totalBasketPrice = $("#total-basket-price").attr('price');
            $("#totalPrice").html(totalBasketPrice + '₺');
            $("#totalPriceKDV").html(totalBasketPrice + '₺');
            $("#orderTotal").html(totalBasketPrice + '₺');

            UpdateFoodCount();
        }
    });
}

function UpdateFoodCount() {
    $(".food-to-basket").click(function () {

        var basketType = $(this).attr('type')
        var foodId = $(this).attr('foodId');

        $.ajax({
            url: "/Home/AddFoodToBasket",
            type: "POST",
            data: { "foodId": foodId, "type": basketType },
            success: function (res) {
                $("#foodHtml").html("");
                FoodDetail();
              
                //$("#foodCount").html(res.BasketCount);
                //$("#basket-price").html(res.BasketPrice);
                //$("#total-basket-price").html(res.TotalBasketPrice);

                //var totalBasketPrice = $("#total-basket-price").attr('price');
                //$("#totalPrice").html(totalBasketPrice + '₺');
                //$("#totalPriceKDV").html(totalBasketPrice + '₺');
                //$("#orderTotal").html(totalBasketPrice + '₺');
            }
        });
    });
}

function x() {
    //var sayi = parseInt($("#foodPlus").attr('foodPrice'));
    //var adet = parseInt($("#foodCount").val());
    //var carpma = adet * sayi;
    //$("#totalPrice").html(carpma + '₺');
    //$("#totalPriceKDV").html(carpma + '₺');
    //$("#orderTotal").html(carpma + '₺');
    //$("#toplamtutar").html(carpma + '₺');

    //$(".fa-trash").click(function () {
    //    $("tr[foodId=" + res.Id + "]").remove();
    //});

    //$(".fa-minus").click(function () {
    //    var foodCount = $("#foodCount").val();
    //    if (foodCount > 1) {
    //        foodCount--;
    //        $("#foodCount").val(foodCount);
    //    }
    //    if (foodCount == 1) {
    //        $("#foodMinus").removeClass();
    //        $("#foodMinus").addClass('fa fa-trash');
    //    }
    //});

    //$(".fa-plus").click(function () {
    //    var foodCount = $("#foodCount").val();
    //    if (foodCount < 20) {
    //        foodCount++;
    //        $("#foodCount").val(foodCount);
    //        $("#foodMinus").removeClass();
    //        $("#foodMinus").addClass('fa fa-minus');
    //    }
    //});
}
