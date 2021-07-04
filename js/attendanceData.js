$(document).ready(function() {

    let tableData = '';
    $("#attendance_data_tbody").on('click', '.logoutBtn', function(e) {
        e.preventDefault();
        let id = $(this).attr("data-sid");
        console.log(id);
        $.ajax({
            method: 'get',
            url: "/get-report/" + id,
            success: function(response) {
                console.log(response);
                if (response == 10) {
                    alert("Mark Your Attendance ,Before Logout.");
                    location.reload();
                    // $("#msg").html("<div class='alert alert-danger'>Mark Your Attendance First.</div>")
                    // document.getElementById("logout").setAttribute("aria-disabled", "true");
                } else if (response == 0) {

                } else {
                    const datea = response['date'];

                    const inTime = response['in_time'];
                    const inTimeHours = inTime.split(":");
                    let today = new Date().toLocaleTimeString('en-GB');
                    const exitTimeHours = today.split(":");
                    const totalworkHours = exitTimeHours[0] - inTimeHours[0];
                    $("#report").html("<h3>your today's work hours are <b class='yc'>" + totalworkHours + " Hrs</b> .</h3>");
                    if (totalworkHours < 6) {
                        $(".yc").css("color", "red");
                    } else if (totalworkHours < 9) {
                        $(".yc").css("color", "orange");
                    } else if (totalworkHours == 9) {
                        $(".yc").css("color", "green");
                    } else if (totalworkHours > 9) {
                        $(".yc").css("color", "green");
                        let incentive = totalworkHours - 9;
                        console.log(incentive);
                        $("#extraWork").html("Excellent ,Today you had done Incentive work for <b class='text-info'>" + incentive + " Hrs.</b>  ");
                        $("#incentives").val(incentive + " Hrs");
                    }
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
    $("#attendance_data_tbody").on('click', '.missPunchBtn', function(e) {
        e.preventDefault();
        let id = $(this).attr("data-sid");
        console.log(id);
        $.ajax({
            method: 'get',
            url: "/getmiss/" + id,
            success: function(response) {
                if (response == 0) {
                    console.log("miss", response);
                    // alert("Mark Your Attendance ,Before Logout.");
                    // location.reload();
                    $("#msg").html("<div class='alert alert-danger'>Mark Your Attendance First.</div>")
                    document.getElementById("logout").setAttribute("aria-disabled", "true");

                } else {
                    const datea = response['date'];
                    $("#missdate").val(datea);
                    const inTime = response['in_time'];
                    const inTimeHours = inTime.split(":");
                    $("#missPunchModal #times").change(function() {
                        let today = $(this).val();
                        const exitTimeHours = today.split(":");
                        const totalworkHours = exitTimeHours[0] - inTimeHours[0];
                        $("#reporta").html("<h3>your work hours for <i class='text-warning'>Date :" + datea + "</i> are <b class='yc'>" + totalworkHours + " Hrs</b> .</h3>");
                        if (totalworkHours < 6) {
                            $(".yc").css("color", "red");
                        } else if (totalworkHours < 9) {
                            $(".yc").css("color", "orange");
                        } else if (totalworkHours == 9) {
                            $(".yc").css("color", "green");
                        } else if (totalworkHours > 9) {
                            $(".yc").css("color", "green");
                            let incentive = totalworkHours - 9;
                            console.log(incentive);
                            $("#missPunchModal #inc").html("Excellent ,Today you had done Incentive work for <b class='text-info'>" + incentive + " Hrs.</b>  ");
                            $("#incentivess").val(incentive + " Hrs");
                        }
                    });

                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
    $.ajax({
        method: "get",
        url: "/get-attendance-data",
        success: function(response) {
            let date = $("#today").val();
            let missPunch = '';
            let btnValue = '';
            let color = '';
            let colValue = '';
            let outTIme = '';
            for (let x = 0; x < response.length; x++) {

                if (response[x]['out_time'] == null && response[x]['date'] == date) {
                    btnValue = `<button title="mark your End of Day" id="logoutBtn" class=" logoutBtn btn btn-success" data-toggle="modal" data-sid="${response[x]['id']}" data-target="#EodModal">
                     Mark EOD</button>`;
                    outTIme = "--:--";
                } else if (response[x]['out_time'] == null && response[x]['date'] != date) {
                    btnValue = `<button title="" id="missPunchBtn" class="missPunchBtn btn mr-1 btn-warning " data-toggle="modal" data-sid="${response[x]['id']}" data-target="#missPunchModal">
                    Miss Punch</button>`;

                } else if (response[x]['out_time'] != null) {

                    btnValue = `<button title="Your End of Day is Marked" id="logoutBtn" class=" logoutBtn btn text-danger" >
                     EOD is Marked</button>`;
                    outTIme = response[x]['out_time'];

                }
                if (response[x]['attendance_status'] == 1) {
                    color = "text-success";
                    colValue = "Approved";
                } else {
                    color = "text-warning";
                    colValue = "Pending.."
                }
                tableData = `
                <tr>
                <td>${response[x]['date']}</td>
                <td>${response[x]['in_time']}</td>
                <td>${outTIme}</td>
                <td><a  class="btn ${color}">${colValue}</a></td>
                <td>
                ${btnValue}

                </td>

                </tr>`;
                $(attendance_data_tbody).append(tableData);
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
});