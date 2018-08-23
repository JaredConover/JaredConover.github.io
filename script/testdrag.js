"use strict";

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
        useElem.setAttribute("x", (pos.x - 37) *2 + "");
        useElem.setAttribute("y", (pos.y - 43) *2 + "");

        let foreign = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
        foreign.setAttribute("x", (pos.x - 37 - 20) *scale_factor + "");
        foreign.setAttribute("y",  (pos.y - 43 - 30) *scale_factor + "");

        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("value", data.substr(indexHashtag).substr(1));
        input.setAttribute("class", "draggable input");
        input.setAttribute("font-size", "500");
       // input.setAttribute("type", "hidden");

        let btn = document.createElement("input");
        btn.setAttribute("value", "OK");
        btn.setAttribute("class", "draggable btn");
        btn.setAttribute("type", "submit");
        btn.setAttribute("style", "display:inline-block");



        foreign.appendChild(input);
        foreign.appendChild(btn);

        let libelle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        libelle.setAttributeNS(null, "x", (pos.x)+ "");
        libelle.setAttributeNS(null, "y", (pos.y ) + "");
        let textNode = document.createTextNode(valueTool);
        libelle.appendChild(textNode);
        libelle.setAttribute("class", "draggable libelle");
        libelle.setAttribute("visibility", "visible");
        libelle.classList.add("libelle");

        btn.addEventListener("click", function(){
            let val = input.value;
            textNode.nodeValue = val;
        });

        console.log(gElem);
        gElem.appendChild(foreign);
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

    console.log("je double clique");
    let grp_id = evt.target.parentNode.id;
    let crossElem = get_by_class(grp_id, "croix");
    let libelle = get_by_class(grp_id, "libelle");
    let input = get_by_class(grp_id, "input");

    console.log(crossElem);

    if (crossElem.getAttribute("visibility") === "hidden"){
        crossElem.setAttribute("visibility", "visible");
      //  input.setAttribute("type", "visible");
        libelle.setAttribute("visibility", "hidden");
    }
    else{
        crossElem.setAttribute("visibility", "hidden");
      //  input.setAttribute("type", "hidden");
        libelle.setAttribute("visibility", "visible");
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