"use strict";



class Activity  {
    constructor(){
        this.title = "";
        this.description = "";
        this.current_goal = "";
        this.image = "";
        this.color = "";
        this.timed_sessions = [];
    }

}

class TimedSession  {
    constructor(){
        this.focus = "";
        this.notes = "";
        this.length = 0;
        this.lengthgraph = 0;
        this.start_time = "";
        this.finish_time = "";
        this.date = "";
    };

    // constructor(focus, notes, length, start, finish, date){
    //     this.focus = focus;
    //     this.notes = notes;
    //     this.length = length;
    //     this.start_time = start;
    //     this.finish_time = finish;
    //     this.date = date;
    // };

}



function init_MyActivities() {

    if (MyActivities == null) {
        MyActivities = new Map();

        let new_activity = new Activity();


        new_activity.title = "Soccer";
        new_activity.description = "Devenir meilleur que Ronaldo!";
        new_activity.current_goal = "Pratiquer mes corners!"

        let soccer_1 = new TimedSession();
        soccer_1.focus = "Tir corner";
        soccer_1.notes = "Viser le coin exterieur";
        soccer_1.date = "2/2/2018";
        soccer_1.length = "Hours : 1 Minutes : 30 Seconds : 0";
        soccer_1.lengthgraph = 90;
        new_activity.timed_sessions.push(soccer_1);

        let soccer_2 = new TimedSession();
        soccer_2.focus = "Tir corner";
        soccer_2.date = "3/2/2018";
        soccer_2.length = "Hours : 0 Minutes : 30 Seconds : 0"
        soccer_2.lengthgraph = 30;

        MyActivities.set(new_activity.title, new_activity);

        let activity = MyActivities.get("Soccer");
        activity.timed_sessions.push(soccer_2);

        sauvegarde();
    }
    //
    // return MyActivities;
}



