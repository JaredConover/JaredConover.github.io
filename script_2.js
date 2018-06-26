console.log("Welcome to Battleship V_2");
console.log("enter coordinates: x, y");

let response;

class bateau {
    constructor(indices) {
        // this.longeur = longeur;
        this.indices = indices;
    }
}

let grid_alt = new Array();
for (let i = 0; i < 25; i++) {
    grid_alt.push(i);
}

let grid = {
    cases: [],
    tirs : [],
    remplir: function (longeur) {
        for (let i = 0; i < longeur; i++) {
            this.cases.push(0);
            this.tirs.push("^");

        }
    },

    fire : function (){
        let x = Number(document.getElementById("coordX").value);
        let y = Number(document.getElementById("coordY").value);
        let indice = (5 * y) + x;
        console.log(x + " " + y);
        let result;
        if (grid.cases[indice] === 1) {
            result = "X";
        } else {
            result = "O";
        }
        this.tirs[indice] = result;
        this.showShots();
        document.getElementById("coordX").value = "";
        document.getElementById("coordY").value = "";
    },
    showShots : function(){
        let ligne = "|";
        for(let i=0 ; i<this.tirs.length; i++) {

            ligne += this.tirs[i]  + "|";

            if (( i + 1) % 5 === 0 && i < this.tirs.length - 1) {
                ligne += " <br/> |";
            }

        }
        document.getElementById("grid").innerHTML= ligne;
        return ligne;
    },
    placerBateau: function (unBateau) {

        for(let b of unBateau.indices){
            this.cases[b] = 1;
        }
        
        // for (let i = 0; i < unBateau.indices.length; i++) {
        //     this.cases[unBateau.indices[i]] = 1;
        // }
    },
    show: function () {

        let i = 0;
        let ligne = "|";
        while (i < this.cases.length) {

            ligne += (this.cases[i] === 1 ? 'X' : 'O') + "|";

            if ((i + 1) % 5 === 0 && i < this.cases.length - 1) {
                ligne += " \n|";
            }
            i++;
        }
        console.log(ligne);
    }
};

function fireOn(x, y) {
    let indice = (5 * y) + x;
    if (grid.cases[indice] === 1) {
        response = "HIT!!";
    } else {
        response = "miss...";
    }
    return "case " + indice + ": " + response;
}

grid.remplir(25);

let patrol_1 = new bateau([10, 15]);
let patrol_2 = new bateau([8, 9]);
let sub = new bateau([12, 17, 22]);
let battleship = new bateau([0, 1, 2, 3]);

let flotte = [patrol_1, patrol_2, sub, battleship];

for (let i = 0; i < flotte.length; i++) {
    grid.placerBateau(flotte[i]);
}


// document.getElementById("grid").innerHTML=grid.show();
// document.getElementById("grid").innerHTML= "hi";


