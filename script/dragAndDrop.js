"use strict";
function makeDraggable(evt) {
    let svg = evt.target;
    svg.addEventListener('mousedown', startDrag);
    svg.addEventListener('mousemove', drag);
    svg.addEventListener('mouseup', endDrag);
    let selectedElement= false,  transform,
        selectedElementCroix = false, transformCroix,
        selectedElementLibelle = false, transformLibelle,
        selectedElementEditable = false, transformEditable,
        offset ;

    function startDrag(evt) {
        if (evt.target.classList.contains('draggable')) {
            selectedElement = evt.target;
            selectedElementCroix = evt.target.previousSibling;
            selectedElementLibelle = selectedElementCroix.previousSibling;
            //selectedElementEditable = selectedElementLibelle.previousSibling;

            offset = getMousePosition(evt);

            let transforms = selectedElement.transform.baseVal;
            let transforms2 = selectedElementCroix.transform.baseVal;
            let transforms3 = selectedElementLibelle.transform.baseVal;
            //let transforms4 = selectedElementEditable.transform.baseVal;

            if (transforms.length === 0 || transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
                let translate = svg.createSVGTransform();
                translate.setTranslate(0, 0);
                selectedElement.transform.baseVal.insertItemBefore(translate, 0);
                selectedElementCroix.transform.baseVal.insertItemBefore(translate, 0);
                selectedElementLibelle.transform.baseVal.insertItemBefore(translate, 0);
                    //selectedElementEditable.transform.baseVal.insertItemBefore(translate, 0);
            }
            transform = transforms.getItem(0);
            transformCroix = transforms2.getItem(0);
            transformLibelle = transforms3.getItem(0);
            //transformEditable = transforms4.getItem(0);
            offset.x -= transform.matrix.e;
            offset.y -= transform.matrix.f;
        }
    }

    function drag(evt) {
        if (selectedElement) {
            evt.preventDefault();
            let coord = getMousePosition(evt);
            transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
            transformCroix.setTranslate(coord.x - offset.x, coord.y - offset.y);
            transformLibelle.setTranslate(coord.x - offset.x, coord.y - offset.y);
           // transformEditable.setTranslate(coord.x - offset.x, coord.y - offset.y);
        }
    }
    function endDrag(evt) {
        selectedElement = null;
        selectedElementCroix = null;
        selectedElementLibelle = null;
       // selectedElementEditable = null;
    }
    function getMousePosition(evt) {
        let CTM = svg.getScreenCTM();
        return {
            x: (evt.clientX - CTM.e) / CTM.a,
            y: (evt.clientY - CTM.f) / CTM.d
        };
    }
}