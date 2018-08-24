"use strict";
let cpt = 1;
let data = null;
let scale_factor = 1.75;

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    let path = ev.target.getAttribute("data-path");
    let value = ev.dataTransfer.setData("text/plain", path);
    console.log(value);
}

function drop(ev) {
    let svgElem = document.getElementsByTagName("svg")[0];
    let pos = event_to_xy(svgElem, ev);
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text/plain");
    if(data.includes("images")){
        console.log("data : ", data);
        let gElem = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        gElem.setAttribute("id", "grp_" + makeid());

        let crossElem = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        crossElem.setAttributeNS('http://www.w3.org/1999/xlink', 'href', "images/forms.svg#delete");
        crossElem.classList.add("croix");
        //crossElem.setAttribute("class", "draggable");
        crossElem.setAttribute("x", (pos.x - 40 - 20) *scale_factor + "");
        crossElem.setAttribute("y", (pos.y - 43 - 30) *scale_factor + "");
        crossElem.setAttribute("visibility", "hidden");

        let useElem = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        useElem.setAttributeNS('http://www.w3.org/1999/xlink', 'href', data);
        useElem.classList.add("forme");
        useElem.setAttribute("class", "draggable");
        let indexHashtag = data.indexOf("#");
        let valueTool = data.substr(indexHashtag).substr(1);
        useElem.setAttribute("data-tooltip-text",valueTool);
        useElem.setAttribute("x", (pos.x - 37) *scale_factor + "");
        useElem.setAttribute("y", (pos.y - 43) *scale_factor + "");

        let libelle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        libelle.setAttributeNS(null, "x", (pos.x  -10)* scale_factor+ "");
        libelle.setAttributeNS(null, "y", (pos.y - 43 - 20) *scale_factor + "");

        let textNode = document.createTextNode(valueTool);
        libelle.appendChild(textNode);
       libelle.setAttribute("style", "font-size:30px");
        libelle.classList.add("libelle");
        //useElem.setAttribute("class", "draggable");


        console.log(gElem);
        gElem.appendChild(libelle);
        gElem.appendChild(crossElem);
        gElem.appendChild(useElem);
        svgElem.appendChild(gElem);


        brancher_listeners();

        data = null;
    }
}

function brancher_listeners() {
    let gs = document.querySelectorAll("#plan>g");
    console.log(gs);

    for (let g of gs) {
        g.addEventListener("dblclick", select_form);
        get_by_class(g.id, "croix").addEventListener("click", delete_form);
    }
}

function select_form(evt) {
    let svgElem = document.getElementsByTagName("svg")[0];
    let pos = event_to_xy(svgElem, evt);
    evt.preventDefault();

    console.log("je double clique");
    let grp_id = evt.target.parentNode.id;
    let gElem = evt.target.parentNode;
    console.log("le evt : ", evt.target.parentNode);
    let crossElem = get_by_class(grp_id, "croix");
    let libelle = get_by_class(grp_id, "libelle");
    let fo = get_by_class(grp_id, "foreignObj");

    console.log(crossElem);
    let foreign = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    foreign.setAttribute("width", 500);
    foreign.setAttribute("height", 300);
    foreign.setAttribute("style", "font-size:20px");

    let editLibelle = document.createElement("input");
    let btn = document.createElement("input");

    if (crossElem.getAttribute("visibility") === "hidden"){
        crossElem.setAttribute("visibility", "visible");
        let positionCroix = crossElem.getBoundingClientRect();
        foreign.setAttribute("x", (positionCroix.right - 37 - 210) *scale_factor + "");
        foreign.setAttribute("y",  (positionCroix.bottom - 43 - 110) *scale_factor + "");
        foreign.classList.add("foreignObj");


        editLibelle.setAttribute("type", "text");
        editLibelle.setAttribute("class", "draggable editLibelle");
        editLibelle.setAttribute("font-size", 50);
        editLibelle.setAttribute("placeholder", "tapez ici");

        btn.setAttribute("value", "OK");
        btn.setAttribute("class", "draggable btn");
        btn.setAttribute("type", "submit");

        btn.addEventListener("click", function(){
            let val = editLibelle.value;
            libelle.textContent = val;
        });
        foreign.appendChild(editLibelle);
        foreign.appendChild(btn);
        gElem.insertBefore(foreign, gElem.firstChild);
    }
    else{
        crossElem.setAttribute("visibility", "hidden");
        fo.remove();
    }
}

function delete_form(evt) {
    let grp = evt.target.parentNode;
    grp.remove();
}



function get_by_class(grp_id, class_nm) {
    let query = "#" + grp_id + ">." + class_nm;
    return document.querySelector(query);
}