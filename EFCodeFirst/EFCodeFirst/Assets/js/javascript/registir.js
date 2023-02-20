$(document).ready(function () {
    Registir();
});

function Registir() {
    $(".btn-primary").click(function () {

        var name = $("#name").val();
        var email = $("#email").val();
        var password = $("#password").val();

        $.ajax({
            url: "/User/Registir",
            type: "POST",
            data: {
                "name": name,
                "email": email,
                "password": password
            },
            //success: function (res) {
            //    if (res == 0) {
            //        $("#registirError").html("Tüm alanları doldurunuz!")
            //    }
            //    else if (res == -1) {
            //        $("#registirError").html("Kullanıcı Adı veya Email adresi Kullanılmaktadır!")
            //    }
            //    else {
            //        location.href = "/Home/Index";
            //    }
            //}
            success: function (res) {
                if (res.Result == true) {
                    location.href = "/Home/Index";
                }
                else {
                    $("#registirError").html(res.ErrorMessage);
                }
            }
        });
    });
};