"use strict";

(function() {
    let tooltip = document.getElementsByClassName('tooltip');
    let triggers = document.getElementsByClassName('tooltip-trigger');
    let svg = document.getElementById('plan');
    function showTooltip(evt) {
        let CTM = svg.getScreenCTM();
        let mouseX = (evt.clientX - CTM.e) / CTM.a;
        let mouseY = (evt.clientY - CTM.f) / CTM.d;
        tooltip.setAttributeNS(null, "x", mouseX + 0 / CTM.a);
        tooltip.setAttributeNS(null, "y", mouseY - 40 / CTM.d);
        tooltip.firstChild.data = evt.target.getAttributeNS(null, "data-tooltip-text");// recuperation
        tooltip.setAttributeNS(null, "visibility", "visible");

    }
    function hideTooltip() {
        tooltip.setAttributeNS(null, "visibility", "hidden");
    }
    for (let i = 0; i < triggers.length; i++) {
        triggers[i].addEventListener('mousemove',showTooltip);
        triggers[i].addEventListener('mouseout', hideTooltip);
    }
})();
