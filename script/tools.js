"use strict";
let d = document;
let cl = function (x) {
    console.log(x);
};
let appendChildInBody = function (tagName, textContent) {
    let elem = d.createElement(tagName);
    elem.appendChild(d.createTextNode(textContent));
    d.body.appendChild(elem);
};