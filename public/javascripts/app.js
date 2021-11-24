/*
  Student ID: 301145757 , 301143620 , 301173877 , 301178658 , 301182897 , 300977318
  Web App Name: Runtime
  Description: An Incident Management Application
*/

var curDayFormat = function(){
    today = incidents.CreatedDate;
    var dd = today.getDate();
    var mm = today.getMonth()+1; //As January is 0.
    var yyyy = today.getFullYear();

    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    switch(mm) {
        case 1:
            mm = 'Jan';
        break;
        case 2:
            mm = 'Feb';
        break;
        case 3:
            mm = 'Mar';
        break;
        case 4:
            mm = 'Apr';
        break;
        case 5:
            mm = 'May';
        break;
        case 6:
            mm = 'Jun';
        break;
        case 7:
            mm = 'Jul';
        break;
        case 8:
            mm = 'Aug';
        break;
        case 9:
            mm = 'Sep';
        break;
        case 10:
            mm = 'Oct';
        break;
        case 11:
            mm = 'Nov';
        break;
        case 12:
            mm = 'Dec';
        break;
        default:
            mm = 'month';
    }

    return (mm+ '' + dd + ', ' + yyyy);
};