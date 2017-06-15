    alarms = [];
    counter = 0;
function digitalWatch() 
{
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    document.getElementById("digital_watch").innerHTML = hours + ":" + minutes + ":" + seconds;
    setTimeout("digitalWatch()", 1000);
  }





function set_up() {
        note = document.arlm.message.value;
        if (note == '') {note = 'ALARM!!';}

        hrs = document.arlm.hr.value;
        min = document.arlm.mts.value;
        year = document.arlm.year.value;
        mth = document.arlm.month.value;
        day = document.arlm.day.value; 

        var p = new RegExp("^[0-9]+$","m");
        var res = p.test(year);
        if(!res){
            alert('Wrong symbols!');
            return false
        }

     if (year == '') {alert('The Year field is empty'); return false}
     if (mth == '') {alert('The Month field is empty'); return false}
     if (day == '') {alert('The Day field is empty'); return false}
     if (hrs == '') {alert('The Hour field is empty'); return false}
     if (min == '') {alert('The Minute field is empty'); return false}

     if (mth.length == 1) {document.arlm.month.value = '0' + mth}
     if (day.length == 1) {document.arlm.day.value = '0' + day}
     if (hrs.length == 1) {document.arlm.hr.value = '0' + hrs}
     if (min.length == 1) {document.arlm.mts.value = '0' + min}
     if (hrs.length > 2) {alert('The Hour is wrongly typed.'); return false}
     if (min.length > 2) {alert('The Minute is wrongly typed.'); return false}

     alarms.push(new Date(year,mth-1,day,hrs,min));
    var d = document.getElementById('container');
    var div = document.createElement('div');
    var p = document.createElement('p');
    var but = document.createElement('input');
    p.innerHTML=hrs + " : " + min + " - " + day + "." + mth + "." + year;
    but.setAttribute("type","button");
    but.setAttribute("size","2");
    but.setAttribute("value","Delete alarm clock");
    but.setAttribute("onClick", "del(" + counter + ")")
    div.setAttribute("align","center");
    div.setAttribute("id", counter);
    div.appendChild(p);
    div.appendChild(but);
    d.appendChild(div);
    ++counter;
     }

     function alarm(){
    for (var i = 0; i < alarms.length; i++){
        alarmc = alarms[i];
     if ((now.getHours() == alarms[i].getHours()) &&
        (now.getMinutes() == alarms[i].getMinutes()) &&
        (now.getFullYear() == alarms[i].getFullYear()) &&
        (now.getMonth() == alarms[i].getMonth()) &&
        (now.getDate() == alarms[i].getDate())) {
         alert(note);
        del(i)}
        }
     setTimeout("alarm()", 1000);
     }

    function del(i){
        var d = document.getElementById('container');
        var div = document.getElementById(i);
        d.removeChild(div);
        alarms.splice(i,1);
        if (i != counter)
            for (var j = i + 1; j < counter; j++){
                var div = document.getElementById(j);
                div.setAttribute("id", j - 1);
                var but = div.getElementsByTagName("input")[0];
                but.setAttribute("onClick", "del(" + (j - 1) + ")")
            }
        --counter;
    }