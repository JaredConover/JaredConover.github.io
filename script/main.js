"use strict";

// execution
console.log("JS started");

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM construit:", document.body);
    let photos = d.getElementsByClassName("photo");
    let cadres = d.getElementsByClassName("cadre");

    for (let c of cadres){
        c.classList.add("invisible");
    }
    // cl(photo);
    let encadrer = function (evt) {

        evt.target.style.width = Math.floor((Math.random() * 500) + 200) + "px";
        cl(evt.target);
        cl(evt.target.height);

        let cadre = evt.target.nextElementSibling;
        cl(cadre);
        cadre.style.width = (evt.target.width + 50) + "px";
        cadre.style.height = (evt.target.height + 50) + "px";

        // cadre.style.width = evt.target.width + "px";
        // cadre.style.height = evt.target.height+ "px";
        cadre.classList.remove("invisible");

    };

    for (let p of photos) {
        p.addEventListener("load", encadrer);
    }

});

window.addEventListener("load", function () {
    console.log("Tout est loader");
});