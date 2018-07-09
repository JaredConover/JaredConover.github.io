function add_activity() {

    create_new_activity.style.display = "block";
    let new_title = d.getElementById("title");
    let new_desc = d.getElementById("desc");
    let new_goal = d.getElementById("goal");
    let confirm_new_activity = d.getElementById("confirm_new_activity");

    function confirm() {
        let newActivity = new Activity();
        newActivity.title = new_title.value;
        newActivity.description = new_desc.value;
        newActivity.current_goal = new_goal.value;

        new_title.value = "";
        new_desc.value = "";
        new_goal.value = "";

        create_new_activity.style.display = "none";
        MyActivities.set(newActivity.title, newActivity);
        sauvegarde();
        list_activities();
    }

    confirm_new_activity.addEventListener('click', confirm);
}

function list_activities() {
    while (activities.hasChildNodes()) {
        activities.removeChild(activities.lastChild);
    }
    for (let a of MyActivities.keys()) {
        let item = d.createElement("div");
        item.innerHTML = "<span>" + a + "</span>";
        item.style.display = "block";
        activities.appendChild(item);
        item.addEventListener('click', select_activity);
        item.addEventListener('mouseover', highlight_btn);
        item.addEventListener('mouseout', unhighlight_btn);
    }
}

function highlight_btn(evt) {
    evt.target.style.backgroundColor = "#7800FF";
    evt.target.innerHTML += "<span class='delete'>X</span>";
}

function unhighlight_btn(evt) {
    evt.target.style.backgroundColor = "#efffed";

}

function select_activity(evt) {
    alert(evt.target.innerText);
}

