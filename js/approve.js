$(document).ready(function() {

    $(".getDetails").on("click", function() {

        const id = JSON.parse($(this).attr("data-sid"));
        $("#emp_det").html(
            `<div class="col-md-12 col-sm-12">
                <div id="name" style="font-size:24px">${id['name']} </div>
                <div id="email" style="color:blue">${id['email']}</div>
                <div id="conatact"> ${id['contact']}</div>
                <div id="dob"> ${id['dob']}</div>
            </div>
            <div class="col-md-12 col-sm-12">
                <b>Address :</b>
                <p class="text-indent">${id['address']}</p>
            </div>`);
        $("#emp_id").val(id['id']);

    });

    $(".pendingLeavesRow").on('click', '.approveBtn', function() {
        let id = $(this).attr("data-sid");
        console.log(id);
        $("#approveLeaveBtn").attr("href", "/approved/" + id);
        $("#rejectLeaveBtn").attr("href", "/rejected/" + id);
        console.log($("#rejectLeaveBtn"));
    });

});