"use strict";
function makeDraggable(evt) {
    let svg = evt.target;
    svg.addEventListener('mousedown', startDrag);
    svg.addEventListener('mousemove', drag);
    svg.addEventListener('mouseup', endDrag);
    let selectedElement= false, selectedElement2 = false,selectedElement3 = false, offset, transform2, transform, transform3;

    function startDrag(evt) {
        if (evt.target.classList.contains('draggable')) {
            selectedElement = evt.target;
            selectedElement2 = evt.target.previousSibling;
            selectedElement3 = selectedElement2.previousSibling;

            offset = getMousePosition(evt);
            let transforms = selectedElement.transform.baseVal;
            let transforms2 = selectedElement2.transform.baseVal;
            let transforms3 = selectedElement3.transform.baseVal;

            if (transforms.length === 0 || transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
                let translate = svg.createSVGTransform();
                translate.setTranslate(0, 0);
                selectedElement.transform.baseVal.insertItemBefore(translate, 0);
                selectedElement2.transform.baseVal.insertItemBefore(translate, 0);
                selectedElement3.transform.baseVal.insertItemBefore(translate, 0);
            }
            transform = transforms.getItem(0);
            transform2 = transforms2.getItem(0);
            transform3 = transforms3.getItem(0);
            offset.x -= transform.matrix.e;
            offset.y -= transform.matrix.f;
        }
    }

    function drag(evt) {
        if (selectedElement) {
            evt.preventDefault();
            let coord = getMousePosition(evt);
            transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
            transform2.setTranslate(coord.x - offset.x, coord.y - offset.y);
            transform3.setTranslate(coord.x - offset.x, coord.y - offset.y);
        }
    }
    function endDrag(evt) {
        selectedElement = null;
        selectedElement2 = null;
        selectedElement3 = null;
    }
    function getMousePosition(evt) {
        let CTM = svg.getScreenCTM();
        return {
            x: (evt.clientX - CTM.e) / CTM.a,
            y: (evt.clientY - CTM.f) / CTM.d
        };
    }
}