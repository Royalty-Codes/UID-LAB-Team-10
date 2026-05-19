// DATE AND TIME
function updateDateTime() {
    let dateTimeEl = document.getElementById("dateTime");
    if (dateTimeEl) {
        dateTimeEl.innerHTML = new Date().toLocaleString(); // date conscturor
    }
}
setInterval(updateDateTime, 1000);
updateDateTime();



// SHOW MESSAGE
function showMessage(elementId, text, isSuccess) {
    let msgEl = document.getElementById(elementId);
    if (!msgEl) return;
    msgEl.innerHTML = text;
    msgEl.className = "message";
    msgEl.classList.add(isSuccess ? "success" : "error");
    
    setTimeout(() => {
        msgEl.className = "message";
    }, 5000);
}

// TOGGLE TEAM FIELDS
let participation = document.getElementById("participation");
if (participation) {
    participation.addEventListener("change", function() {
        let teamFields = document.getElementById("teamFields");
        if (this.value === "Team") {
            teamFields.classList.remove("hidden");
        } else {
            teamFields.classList.add("hidden");
        }
    });
}

// REGISTRATION FORM
let registrations = [];
let regForm = document.getElementById("regForm");
if (regForm) {
    regForm.addEventListener("submit", function(e) {
        e.preventDefault();

        let name = document.getElementById("studentName").value.trim();
        let regNo = document.getElementById("regNo").value.trim();
        let email = document.getElementById("email").value.trim();
        let mobile = document.getElementById("mobile").value.trim();
        let event = document.getElementById("event").value;
        let participationType = document.getElementById("participation").value;
        let teamName = document.getElementById("teamName").value.trim();
        let teamMembers = document.getElementById("teamMembers").value.trim();

        if (!/^[A-Za-z ]+$/.test(name)) return showMessage("message", "Invalid Name. Only alphabets and spaces allowed.", false);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showMessage("message", "Invalid Email ID.", false);
        if (!/^[0-9]{10}$/.test(mobile)) return showMessage("message", "Invalid Mobile. Must be 10 digits.", false);
        if (!/^CB\.EN\.U4CSE\d{5}$/.test(regNo)) return showMessage("message", "Invalid Register Number. Format: CB.EN.U4CSEXXXXX", false);
        if (!event) return showMessage("message", "Please select an event.", false);
        if (event === "Quiz") return showMessage("message", "Registration is Closed for Quiz.", false);
        
        if (participationType === "Team") {
            if (!teamName || !teamMembers) return showMessage("message", "Team details are required.", false);
            let count = parseInt(teamMembers);
            if (isNaN(count) || count < 2 || count > 4) return showMessage("message", "Team size should be between 2 and 4.", false);
        }

        for (let i = 0; i < registrations.length; i++) {
            if (registrations[i].regNo === regNo && registrations[i].event === event) {
                return showMessage("message", "Duplicate Registration. You already registered for this event.", false);
            }
        }

        registrations.push({ regNo: regNo, event: event });
        showMessage("message", "Registration Successful!", true);

        let table = document.getElementById("participants");
        let row = table.insertRow();
        row.insertCell(0).innerHTML = name;
        row.insertCell(1).innerHTML = regNo;
        row.insertCell(2).innerHTML = event;

        document.getElementById("count").innerHTML = parseInt(document.getElementById("count").innerHTML) + 1;
        regForm.reset();
        document.getElementById("teamFields").classList.add("hidden");
    });
}

// FEEDBACK FORM
let feedbacks = [];
let feedbackForm = document.getElementById("feedbackForm");
if (feedbackForm) {
    feedbackForm.addEventListener("submit", function(e) {
        e.preventDefault();

        let name = document.getElementById("fbName").value.trim();
        let reg = document.getElementById("fbReg").value.trim();
        let event = document.getElementById("fbEvent").value;
        let rating = document.getElementById("rating").value;
        let comments = document.getElementById("comments").value.trim();

        if (!rating) return showMessage("feedbackMessage", "Please select a rating.", false);
        if (comments.length < 20) return showMessage("feedbackMessage", "Comments should contain at least 20 characters.", false);
        if (!reg) return showMessage("feedbackMessage", "Register Number is required.", false);
        if (!event) return showMessage("feedbackMessage", "Please select an event.", false);

        feedbacks.push(parseInt(rating));
        let total = feedbacks.reduce((a, b) => a + b, 0);
        document.getElementById("avgRating").innerHTML = (total / feedbacks.length).toFixed(2);

        let summaryDiv = document.getElementById("feedbackSummary");
        let itemDiv = document.createElement("div");
        itemDiv.style.padding = "10px";
        itemDiv.style.borderBottom = "1px solid #eee";
        itemDiv.style.marginBottom = "10px";
        itemDiv.innerHTML = `<strong>${name}</strong> (${reg}) rated <strong>${event}</strong>: ${rating}/5<br><em style="color:#666;">"${comments}"</em>`;
        summaryDiv.appendChild(itemDiv);

        showMessage("feedbackMessage", "Feedback Submitted Successfully!", true);
        feedbackForm.reset();
    });
}