"use strict";

function start() {
    console.log("DOM construit:", document.body);

    let plan = d.getElementById("plan");
    // $("#plan").find("use").addClass("draggable");
    <!--*************Les listenner pour le drag and drop************* -->
    plan.addEventListener("load", makeDraggable);
    plan.addEventListener("dragover", allowDrop);
    plan.addEventListener("drop", drop);

    plan.addEventListener("load", load_mes_plans);
    setInterval(sauvegarde, 2000);

    let menu_items = document.querySelectorAll("#menu > img");
    for (let i of menu_items){
        i.addEventListener("dragstart", drag);
    }



}

// execution
console.log("JS started");

document.addEventListener("DOMContentLoaded", start ) ;

window.addEventListener("load", function () {
    console.log("Tout est loader");
});


