$(document).ready(function() {
    setTimeout(function() {
        $(".err-msg").fadeOut();
    }, 2000);
    if ($("#register_employee_form").length > 0) {
        $("#register_employee_form").validate({
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
            }
        });
    }
  

});
