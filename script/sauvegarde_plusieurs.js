"use strict";

// ### Declaration des Objets ES6 ###
class MesPlans {
    constructor(courant = "default", plans = []) {
        this.courant = courant;
        this.plans = plans;
    }
}

class PlanStockee {
    constructor(titre = "Nouveau Plan", xml = "no xml", fond) {
        this.titre = titre;
        this.xml = xml;
        this.fond = fond;
    }
}
// ### Declaration des Varibles ###
let p;
let mesPlans;
let plan_default = new PlanStockee("default");
let plan_svg;
let select;
let btn_new;
let btn_del;

// ### Synchronisation ###
document.addEventListener("DOMContentLoaded", function () {

    plan_svg = document.getElementById("plan");
    select = document.getElementById("sel_mes_plans");
    select.addEventListener("change", function () {
        changer_plan(select.value);
    });
    btn_new = document.getElementById("btn_new");
    btn_new.addEventListener("click", click_new);
    btn_del = document.getElementById("btn_del");
    btn_del.addEventListener("click", click_del);


});
// ### Fonctions pour gerer le memoire ###
function get_plan(titre) {

    let plan;
    if (titre === undefined) {
        for (let p of mesPlans.plans) {
            if (p.titre === mesPlans.courant)
                plan = p;
        }
    } else {
        for (let p of mesPlans.plans) {
            if (p.titre === titre)
                plan = p;
        }
    }
    return plan;
}

function sauvegarde() {

    p = get_plan();
    p.xml = plan_svg.innerHTML;
    // console.log("Avant JSON :\n", plan_svg.innerHTML); //si vous voulez voir la difference
    let mes_plans_json = JSON.stringify(mesPlans);
    localStorage.setItem("MesPlansStockee", mes_plans_json);
    // console.log("Apres JSON: \n", localStorage.getItem("MesPlansStockee"));
    console.log("saved");
}

function load_mes_plans() {

    if (localStorage.getItem("MesPlansStockee") !== null && localStorage.getItem("MesPlansStockee") !== undefined) {

        mesPlans = JSON.parse(localStorage.MesPlansStockee);
        p = get_plan();
        plan_svg.innerHTML = p.xml;
        plan_svg.style.backgroundImage = 'url('+p.fond+')';
        brancher_listeners();
        console.log(p.titre + " chargee");
    } else {
        console.log("no plans");
        mesPlans = new MesPlans();
        mesPlans.plans.push(plan_default);
        sauvegarde();
        console.log("objet 'MesPlansStockee' initialiser dans LocalStorage");
        load_mes_plans();
    }
    fill_select();
    changer_selected(get_plan().titre);
}

function changer_plan(titre) {

    p = get_plan(titre);
    if (titre === undefined) {
        mesPlans.courant = mesPlans.plans[mesPlans.plans.length - 1].titre;
        p = get_plan();
        titre = p.titre;
    }
    plan_svg.innerHTML = p.xml;
    plan_svg.style.backgroundImage = 'url('+p.fond+')';
    mesPlans.courant = titre;
    fill_select();
    changer_selected(titre);
    brancher_listeners();
    sauvegarde();
    console.log("plan " + titre + " chargee");
}
function nouveau_plan(titre) {

    mesPlans.plans.push(new PlanStockee(titre, ""));
    changer_plan(titre);
}
function supprimer_plan(titre) {

    p = get_plan(titre);
    remove(mesPlans.plans, p);
    changer_plan();
}

function stocker_image(imgBase64) {
    p = get_plan();
    p.fond = imgBase64;
    console.log("img stocker: ", imgBase64);
    sauvegarde();
}
//### Fonctions pour integration UI ###
function fill_select() {

    while (select.hasChildNodes()) {
        select.removeChild(select.lastChild);
    }
    for (let p of mesPlans.plans) {
        let option = document.createElement("option");
        option.value = p.titre;
        option.text = p.titre;
        select.appendChild(option);
    }
}
function changer_selected(titre) {

    for (let o of select.children){
        o.removeAttribute("selected");
        if (o.value === titre)
            o.setAttribute("selected", "true");
    }
}

function click_new() {
    let new_titre = prompt("Titre du  plan", "Nouveau plan");
    if (new_titre !== null)
        nouveau_plan(new_titre);
    //ajouter validation pour nom unique
}

function click_del() {
    if (confirm("Vous voulez supprimer le plan : "+ mesPlans.courant + " ?"))
        supprimer_plan(mesPlans.courant);
}



