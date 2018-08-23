"use strict";
let d = document;

let cl = function (x, y, z) {
    console.log(x, y, z);
};

let appendChildInBody = function (tagName, textContent) {
    let elem = d.createElement(tagName);
    elem.appendChild(d.createTextNode(textContent));
    d.body.appendChild(elem);
};

function event_to_xy(elem, ev) {
    let rect = elem.getBoundingClientRect();
    console.log(rect);
    return {
        x : ev.clientX - rect.left,
        y : ev.clientY - rect.top,
    };
}

function remove(array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
        array.splice(index, 1);
    }
}

function rand_min_max(min = 0, max = 1) {
    return min + Math.floor(Math.random() * (max + 1));
}


function makeid() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 6; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}