$(document).ready(function () {
    UploadCategory();
    UploadRestaurant();
    UploadFood();
});

function UploadCategory() {
    $(".upload-category").click(function () {

        var categoryName = $("#categoryName").val();
     /*   var categoryImages = $("#categoryImages").val();*/

        var fileUpload = $("#categoryImages").get(0);
        var files = fileUpload.files;
        var fileData = new FormData();
        fileData.append("categoryImages", files[0]);
        fileData.append('categoryName', categoryName);

        $.ajax({
            url: "/Admin/UploadCategory",
            type: "POST",
            processData: false,
            contentType: false,
            data: fileData,
            //data: {
            //    "categoryName": categoryName,
            //    "categoryImages": categoryImages
            //},
            success: function (res) {
                if (res == 1) {
                    alert("Başarılı");
                }
                else {
                    alert("Tüm Alanları Doldurunuz");
                }
            }
        });
    });
}

function UploadRestaurant() {
    $(".upload-restaurant").click(function () {

        var restaurantName = $("#restaurantName").val();
        var restaurantPassword = $("#restaurantPassword").val();
        var restaurantLocation = $("#restaurantLocation").val();
        var restaurantCategoryId = $("#restaurantCategoryId").val();

        var fileUpload = $("#restaurantLogo").get(0);
        var files = fileUpload.files;
        var fileData = new FormData();
        fileData.append("restaurantLogo", files[0]);
        fileData.append('restaurantName', restaurantName);
        fileData.append('restaurantPassword', restaurantPassword);
        fileData.append('restaurantLocation', restaurantLocation);
        fileData.append('restaurantCategoryId', restaurantCategoryId);

        $.ajax({
            url: "/Admin/UploadRestaurant",
            type: "POST",
            processData: false,
            contentType: false,
            data: fileData,
            success: function (res) {
                if (res == 1) {
                    alert("Başarılı");
                }
                else {
                    alert("Tüm Alanları Doldurunuz");
                }
            }
        });
    });
}

function UploadFood() {
    $(".upload-food").click(function () {

        var foodName = $("#foodName").val();
        var foodPrice = $("#foodPrice").val();
        var foodDescription = $("#foodDescription").val();
        var foodCategoryId = $("#foodCategoryId").val();
        var foodRestaurantId = $("#foodRestaurantId").val();

        var fileUpload = $("#foodImages").get(0);
        var files = fileUpload.files;
        var fileData = new FormData();
        fileData.append("foodImages", files[0]);
        fileData.append('foodName', foodName);
        fileData.append('foodPrice', foodPrice);
        fileData.append('foodDescription', foodDescription);
        fileData.append('foodCategoryId', foodCategoryId);
        fileData.append('foodRestaurantId', foodRestaurantId);

        $.ajax({
            url: "/Admin/UploadFood",
            type: "POST",
            processData: false,
            contentType: false,
            data: fileData,
            success: function (res) {
                if (res == 1) {
                    alert("Başarılı");
                }
                else {
                    alert("Tüm Alanları Doldurunuz");
                }
            }
        });
    });
}