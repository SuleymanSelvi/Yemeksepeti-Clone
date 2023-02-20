$(document).ready(function () {
    Login();
});

function Login() {
    $(".btn-primary").click(function () {
        var name = $("#name").val();
        var password = $("#password").val();
     
        $.ajax({
            url: "/User/Login",
            type: "POST",
            data: {
                "name": name,
                "password": password
            },
            success: function (res) {
                if (res == 1) {
                   location.href = "/Home/Index"
                }
                else {
                    $("#loginError").html("HATALI GİRİŞ")
                }
            }
        });
    });
}