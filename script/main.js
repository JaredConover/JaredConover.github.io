"use strict";

//###################### Functions ################################


//************ Start Activity List ******************************
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

    if (MyActivities != null) {
        while (activities.hasChildNodes()) {
            activities.removeChild(activities.lastChild);
        }
        for (let a of MyActivities.keys()) {
            let item = d.createElement("li");
            item.classList.add("list_element");
            item.innerHTML = a;
            item.addEventListener('click', select_activity);
            // item.addEventListener('mouseover', highlight_btn);
            // item.addEventListener('mouseleave', unhighlight_btn);
            activities.appendChild(item);
        }
    }
}

function highlight_btn(evt) {
    let div = evt.target;
    evt.target.style.backgroundColor = "#7800FF";
    console.log(div.children[0]);
}

function unhighlight_btn(evt) {
    evt.target.style.backgroundColor = "#efffed";
    evt.target.firstElementChild.style.backgroundColor = "#efffed";
}

function select_activity(evt) {
    // let obj = MyActivities.get(evt.target.innerText);
    selected_activity = MyActivities.get(evt.target.textContent);
    display_selected_activity_info();
    display_selected_history_info();
    display_timer_activity();
    //display_tab_dates();
    display_time_average();
    display_tab_length();
    // alert(obj.description);
}


//************ End Activity List ******************************

//************ Start Persistence  ******************************

function load_activities() {

    if (localStorage.getItem("MyActivities") != null) {

        // let get_MyActivities_json = localStorage.getItem("MyActivities");
        // let temp = JSON.parse(get_MyActivities_json);
        let temp = new Map(JSON.parse(localStorage.MyActivities));

        console.log("# activities ", temp.size);
        if (temp.size > 0) {
            MyActivities = temp;
            console.log("activities present in storage");
        } else {
            console.log("local storage empty");
            MyActivities = init_MyActivities();
            console.log(MyActivities.size);
            sauvegarde();
        }
    }else{
        init_MyActivities();
    }

}

function sauvegarde() {

    console.log("je sauvegarde ", MyActivities.size);
    let set_MyActivities_json = JSON.stringify(Array.from(MyActivities.entries()));
    console.log(set_MyActivities_json);
    localStorage.setItem("MyActivities", set_MyActivities_json);
    console.log(localStorage.getItem("MyActivities"));

}
//************ End Persistence  ******************************


//################################## Execution ###################################################

//************* Global Declarations ************************
let d = document;
let btn_add_activity = d.getElementById("btn_add_activity");
let btn_cancel_new_activity = d.getElementById("cancel_new_activity");
let activities = d.getElementById("activities");
let create_new_activity = d.getElementById("create_new_activity");
let MyActivities;

//******** Function Calls *************
load_activities();
list_activities();

//*******************Listeners*****************
btn_add_activity.addEventListener('click', add_activity);

btn_cancel_new_activity.addEventListener('click', function () {
    create_new_activity.style.display = "none";
});