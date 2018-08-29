function readJson() {   //Using JavaScript to send an AJAX GET request
    "use strict";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) { //In this if statement is the actual code
            var json = JSON.parse(this.response);           //Parses the response, the data on the server, into a variable called "json" so it can be read

            for (var i = 0; i < json.length; i++) {     //For loop, once for every object in the "json" object array
                var tbody = document.getElementsByTagName("tbody")[0];
                var trow = document.createElement("tr"); 
                tbody.appendChild(trow);        //Inserts a new row for a new object into the table
                
                var tname = document.createElement("td");   //Creates a new tabledata
                var name_data = document.createTextNode(json[i].name);  //Creates a variable from the name-data in the object array we've called "json"
                tname.appendChild(name_data);   //Inserts said variable into newly created tabledata
                trow.appendChild(tname);        //Inserts tabledata into the new row, left to right, so the "name" column first, "category" second etc.
                
                var tcategory = document.createElement("td");
                var category_data = document.createTextNode(json[i].category);
                tcategory.appendChild(category_data);
                trow.appendChild(tcategory);    //Inserts new data into the "category" column
                
                var tamount = document.createElement("td");
                var amount_data = document.createTextNode(json[i].amount);
                tamount.appendChild(amount_data);
                trow.appendChild(tamount);      //Inserts new data into the "amount" column
                
                var tlocation = document.createElement("td");
                var location_data = document.createTextNode(json[i].location);
                tlocation.appendChild(location_data);
                trow.appendChild(tlocation);    //Inserts new data into the "location" column
                
                var tdate = document.createElement("td");
                var date_date = document.createTextNode(json[i].date);
                tdate.appendChild(date_date);
                trow.appendChild(tdate);        //Inserts new data into the "date" column
                
                var newTableObject = document.getElementById("dynamic");
                sorttable.makeSortable(newTableObject);     //These two lines makes the newly created row sortable again
            }
       }
    };
    
    xhttp.open("GET", "http://wt.ops.few.vu.nl/api/fcb52a67", true);
    xhttp.send(); 
}

$(document).ready(function(){
    $('#formSubmit').click(loadJson);   //When the document is ready loading, on click on the "Submit" button do the loadJson function
    $('#Reset').click(resetData);
});

function loadJson(event) {
    event.preventDefault();
    $.post("http://wt.ops.few.vu.nl/api/fcb52a67",  //Using JQuery to send an AJAX POST request
          $("#submitform").serialize(),             //Data were sending, which is the data from the form with id="#submitform"
          function(){emptyTable();                  //Functions we're doing: first we empty the table so we can 
                     readJson();                    //reload the whole thing from the refreshed database with the new data from the form
                    });
}

function emptyTable() {
    var table = document.getElementById("dynamic");
    var body = document.getElementsByTagName("tbody")[0];
    var newbody = document.createElement("tbody");
    table.replaceChild(newbody, body);              //Replaces the current table body with a fresh empty one
    var newTableObject = document.getElementById("dynamic");
    sorttable.makeSortable(newTableObject);         //Makes new table body sortable again 
}

function resetData() {
    $.get("http://wt.ops.few.vu.nl/api/fcb52a67/reset",
          function(){emptyTable();
                     readJson();
                    });
}