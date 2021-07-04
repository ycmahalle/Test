$(document).ready(function() {

    setTimeout(function() {
        $(".err-msg").fadeOut();
    }, 2000);
    if ($("#register_hr").length > 0) {
        $("#register_hr").validate({
            rules: {
                name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                contact: {
                    required: true,
                    digits: true,
                },

                address: {
                    required: true
                },
                password: {
                    required: true
                },
                password_confirmation: {
                    required: true,
                    equalTo: "#regPass"
                },
            }
        });

    }


});
