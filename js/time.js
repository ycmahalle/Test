$(document).ready(function() {

    setTimeout(function() {
        $(".err-msg").fadeOut();
    }, 2000);
    const defaultEntryTime = "10:01:59";
    const defaultEntryTimeHours = 10;
    const date = new Date().toLocaleDateString();
    const mark = document.getElementById("mark");
    const logoutBtn = document.getElementById("logoutBtn");
    const timeInput = document.getElementById("time");
    const timeInputs = document.getElementById("times");
    const late = document.getElementById("late");
    const lateInput = document.getElementById("lateInput");

    let incentive = 0;
    const getTime = () => {
        let today = new Date().toLocaleTimeString('en-GB');

        if (defaultEntryTime < today) {

            let hours = new Date().getHours();
            let hr = hours - defaultEntryTimeHours;
            let min = (new Date().getMinutes());

            lateInput.setAttribute('value', hr + ":" + min);
            late.innerHTML = `Bro ,You are late by <b class="text-danger">${hr + ":" + min}</b> Hrs.`;



        }
        timeInput.setAttribute('value', today);
        timeInputs.setAttribute('value', today);
    }

    mark.onClick = getTime();
    // =================Aplly Leave-=======================//
    const fromDate = document.getElementById("fromDate");
    const toDate = document.getElementById("toDate");
    const selectDayBtn = document.getElementById("selectDays");
    const leaveType = document.getElementById("leaveType");

    leaveType.addEventListener('change', () => {

        let leaveTypeVal = leaveType.value;
        if (leaveTypeVal == 'Earned Leave') {
            console.log(leaveTypeVal);

        }
    })

    function putvalue(fromDateValue) {
        if (selectDayBtn.checked == 1) {
            toDate.setAttribute("value", fromDateValue);
            toDate.readOnly = true;
        } else {
            toDate.setAttribute("value", "");
            toDate.readOnly = false;
        }
    }
    selectDayBtn.addEventListener('change', () => {

        let fromDateValue = fromDate.value;
        if (fromDateValue != '') {
            // console.log(fromDateValue);
            putvalue(fromDateValue);
        }
    });
    fromDate.addEventListener('change', () => {
        let fromDateValue = fromDate.value;
        putvalue(fromDateValue);
    })


});