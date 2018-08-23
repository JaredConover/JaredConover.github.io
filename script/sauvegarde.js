"use strict";
let plan_stockee = {};
const RED_STYLE = {color: "red"};
// function sauvgarde(){
//     let plan = document.getElementById("plan");
//     let forms = plan.getElementsByTagName("use");
//     plan_stockee.saved = plan;
//
//     // console.log(forms);
//     console.log("saved");
// }
function clear_plan(){
    let plan = document.getElementById("plan");
    plan.remove();
    cl("removed")
}

function restore_plan(){

    let plan = document.getElementById("plan");
    // console.log(plan);
    // let page = document.getElementById("page");
    // let svg = document.createElement("svg");
    // page.append(svg);
    // svg.outerHTML = plan_stockee.load;
    plan.innerHTML = plan_stockee.load;
    // console.log(plan);
    // makeDraggable_2(svg);
   // svg.addEventListener("load", makeDraggable);
    cl("plan loaded");
}
<!--*************Chargement du plan************** -->
function load_plan() {

    if (localStorage.getItem("planStockee") != null) {

        // let get_MyActivities_json = localStorage.getItem("MyActivities");
        // let temp = JSON.parse(get_MyActivities_json);
        plan_stockee.load = JSON.parse(localStorage.planStockee);

        // console.log("# activities ", temp.size);
        // console.log("planStockee: ", plan_stockee.load);
        // clear_plan();
        restore_plan();
    }
}
<!--*************Sauvegarde du plan************** -->
function sauvegarde() {

    let plan = document.getElementById("plan");
    plan_stockee.saved = plan.innerHTML;
    // console.log("%cAvant JSON :\n"+ plan.innerHTML, RED_STYLE);
    let plan_stockee_json = JSON.stringify(plan_stockee.saved);
    localStorage.setItem("planStockee", plan_stockee_json);
    // console.log("Apres JSON: \n", localStorage.getItem("planStockee"));
    cl("saved");

}


