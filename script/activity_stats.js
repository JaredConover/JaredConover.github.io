"use strict";


/**************** SECTION title ****************/

let div_title_content = document.getElementById("div_title_content");

/**************** SECTION desc ****************/

let div_desc_content = document.getElementById("div_desc_content");
let div_desc_content_to_edit = document.getElementById("div_desc_content_to_edit");
let new_desc = document.getElementById("stats_desc");

/* DISPLAY DIV TO EDIT desc */
div_desc_content_to_edit.style.display = "none";

/* EDIT BUTTON */
let edit_desc = document.getElementById("edit_desc");
edit_desc.addEventListener("click", function (evt) {
    div_desc_content.style.display = "none";
    div_desc_content_to_edit.style.display = "flex";
});

/* SAVE BUTTON */
let save_desc = document.getElementById("save_desc");
save_desc.addEventListener("click", function (evt) {
    div_desc_content.style.display = "flex";
    div_desc_content_to_edit.style.display = "none";
    selected_activity.description = document.getElementById("stats_desc").value;
    sauvegarde();
    display_selected_activity_info();
    window.alert("Your new desc has been saved!");

});

/**************** SECTION GOAL ****************/

let div_goal_content = document.getElementById("div_goal_content");
let div_goal_content_to_edit = document.getElementById("div_goal_content_to_edit");

/* DISPLAY DIV TO EDIT GOAL */
div_goal_content_to_edit.style.display = "none";


/* EDIT BUTTON */
let edit_goal = document.getElementById("edit_goal");
edit_goal.addEventListener("click", function (evt) {
    div_goal_content.style.display = "none";
    div_goal_content_to_edit.style.display = "flex";
});

/* SAVE BUTTON */
let save_goal = document.getElementById("save_goal");
save_goal.addEventListener("click", function (evt) {
    div_goal_content.style.display = "flex";
    div_goal_content_to_edit.style.display = "none";
    selected_activity.current_goal = document.getElementById("stats_goal").value;
    sauvegarde();
    display_selected_activity_info();
    window.alert("Your new goal has been saved!");
});



//******************************* Some functions **********************************
function display_selected_activity_info() {
    // console.log(evt.target.textContent);
    // selected_activity = MyActivities.get(evt.target.textContent);
    div_title_content.firstElementChild.textContent = selected_activity.title;
    div_desc_content.firstElementChild.textContent = selected_activity.description;
    div_goal_content.firstElementChild.textContent = selected_activity.current_goal;

    div_desc_content_to_edit.firstElementChild.textContent = selected_activity.description;
    div_goal_content_to_edit.firstElementChild.textContent = selected_activity.current_goal;

    console.log("selected_activity : ", selected_activity);

}

function delete_selected_activity(evt) {
    if (selected_activity !== undefined) {
        MyActivities.delete(selected_activity.title);
        sauvegarde();
        list_activities();
        selected_activity = new Activity();
        display_selected_activity_info();
        display_selected_history_info();
    }
}

//****************************** some Executions **************************8
let selected_activity;
console.log(selected_activity);

let btn_delete_activity = document.getElementById("delete_activity");
btn_delete_activity.addEventListener("click", delete_selected_activity);


//****************************** SECTION HISTORY **************************//

let div_table_sessions = document.getElementById("div_table_sessions");

function display_selected_history_info(){

        while (div_table_sessions.hasChildNodes()) {
        div_table_sessions.removeChild(div_table_sessions.lastChild);
    }

        let table = document.createElement("table");
        div_table_sessions.appendChild(table);

        let tr = document.createElement("tr");
        table.appendChild(tr);
        // td focus
        let td_focus = document.createElement("td");
        td_focus.textContent = "Focus";
        tr.appendChild(td_focus);
        // td notes
        let td_notes = document.createElement("td");
        td_notes.textContent = "Notes";
        tr.appendChild(td_notes);
        // td length
        let td_length = document.createElement("td");
        td_length.textContent = "Length";
        tr.appendChild(td_length);
        // td date
        let td_date = document.createElement("td");
        td_date.textContent = "Date";
        tr.appendChild(td_date);

        if (selected_activity.timed_sessions.length > 0){
        for(let s of selected_activity.timed_sessions){

            let tr = document.createElement("tr");
            table.appendChild(tr);
            // td focus
            let td_focus = document.createElement("td");
            td_focus.textContent = s.focus;
            tr.appendChild(td_focus);
            // td notes
            let td_notes = document.createElement("td");
            td_notes.textContent = s.notes;
            tr.appendChild(td_notes);
            // td length
            let td_length = document.createElement("td");
            td_length.textContent = s.length;
            tr.appendChild(td_length);
            // td date
            let td_date = document.createElement("td");
            td_date.textContent = s.date;
            tr.appendChild(td_date);

        }
        }
}

//****************************** SECTION TIME AVERAGE ********************//


let div_time_average = document.getElementById("div_time_average");

function display_time_average(){

    let total = 0;
    let cpt = 0;
    let moyenne = 0;

    if (selected_activity.timed_sessions.length > 0){
        for (let s of selected_activity.timed_sessions){

            lengthforgraph = (s.lengthgraph === undefined ? 0 : s.lengthgraph);

            total += lengthforgraph;
            cpt++;

        }
        moyenne = (total / cpt).toFixed(2);

    }

    while (div_time_average.hasChildNodes()) {
        div_time_average.removeChild(div_time_average.lastChild);
    }

    let span_time = document.createElement("span");
    span_time.textContent = moyenne + " minutes";
    div_time_average.appendChild(span_time);

}


//****************************** SECTION 15 DAYS *************************//

/* see graph.js */

