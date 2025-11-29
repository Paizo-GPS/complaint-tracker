let pending = JSON.parse(localStorage.getItem("pending")) || [];
let completed = JSON.parse(localStorage.getItem("completed")) || [];

// Switch Tabs
function showTab(tab) {
    document.getElementById("pendingSection").classList.add("d-none");
    document.getElementById("completedSection").classList.add("d-none");

    document.getElementById("pending-tab").classList.remove("active");
    document.getElementById("completed-tab").classList.remove("active");

    if (tab === "pending") {
        document.getElementById("pendingSection").classList.remove("d-none");
        document.getElementById("pending-tab").classList.add("active");
    } else {
        document.getElementById("completedSection").classList.remove("d-none");
        document.getElementById("completed-tab").classList.add("active");
    }
}

function showLists() {
    let pList = document.getElementById("pendingList");
    let cList = document.getElementById("completedList");

    pList.innerHTML = "";
    cList.innerHTML = "";

    pending.forEach((item, i) => {
        pList.innerHTML += `
        <li class="list-group-item">
            <div>
                <b>${item.name}</b> <br>
                <small class="text-muted">${item.date}</small> <br>
                ${item.work}
            </div>
    
            <div>
                <button class="btn btn-success btn-sm me-2" onclick="markCompleted(${i})">✔</button>
                <button class="btn btn-danger btn-sm" onclick="deletePending(${i})">Delete</button>
            </div>
        </li>`;
    
    });

    completed.forEach(item => {
        cList.innerHTML += `
        <li class="list-group-item text-success">
            <b>${item.name}</b> <br>
            <small class="text-muted">${item.date}</small> <br>
            ${item.work}
        </li>`;
    });
    
}

function addComplaint() {
    let name = document.getElementById("clientName").value.trim();
    let work = document.getElementById("workDetail").value.trim();
    let date = document.getElementById("workDate").value;

    if (name === "" || work === "" || date === "") {
        alert("Fill all fields da!");
        return;
    }

    pending.push({
        name: name,
        work: work,
        date: date
    });

    document.getElementById("clientName").value = "";
    document.getElementById("workDetail").value = "";
    document.getElementById("workDate").value = "";

    saveData();
    showLists();
}


function markCompleted(index) {
    completed.push(pending[index]);
    pending.splice(index, 1);

    saveData();
    showLists();
}

function deletePending(index) {
    pending.splice(index, 1);
    saveData();
    showLists();
}

// Search filter
function searchComplaints() {
    let key = document.getElementById("searchBox").value.toLowerCase();

    document.querySelectorAll("#pendingList li, #completedList li").forEach(li => {
        li.style.display = li.textContent.toLowerCase().includes(key) ? "" : "none";
    });
}

function saveData() {
    localStorage.setItem("pending", JSON.stringify(pending));
    localStorage.setItem("completed", JSON.stringify(completed));
}

showLists();
