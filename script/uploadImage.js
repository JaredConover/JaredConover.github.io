"use strict";

document.addEventListener("DOMContentLoaded", function () {
    let plan = document.getElementById("plan");
    plan.addEventListener("dragenter", function () {
        plan.classList.add("entered");
    });
    plan.addEventListener("dragleave", function () {
        plan.classList.remove("entered");
    });
    plan.addEventListener("dragover", function (evt) {
        evt.preventDefault();
    });
    plan.addEventListener("drop", function (evt) {
        plan.classList.remove("entered");
        evt.preventDefault();
        let files = evt.dataTransfer.files;
        for (let file of files) {
            catch_file(file);
        }
    });
});

function catch_file(file) {
    console.log("drop image");
    let url = URL.createObjectURL(file);
    getBase64Image(file);





    plan.style.backgroundImage = 'url('+url+')';
}



function getBase64Image(file) {

    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    let img = new Image;
    let dataURL = "blabla";
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL("image/png");
        dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
        console.log("dataURL: ",dataURL);
        stocker_image(dataURL);
    };
    img.src = URL.createObjectURL(file);
    console.log("dataURL apres: ",dataURL);

}





