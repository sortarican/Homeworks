//provided code
// from data.js
var tableData = data;

// YOUR CODE HERE!

//table
var tbody = d3.select("tbody");

//table
//load data.js 
console.log(data);

//append data from log to table
data.forEach(UFOreport => {
    console.log(UFOreport); 
    row=tbody.append("tr"); 
    Object.values(UFOreport).forEach(sighting => 
        row.append("td").text(sighting));})
                                  
//button/input
//sel/ref button/form
var button = d3.select("#filter-btn"); 
var usr_date = d3.select("#form"); 

//event handlers
button.on("click", runSearch); 
usr_date.on("submit", runSearch); 

//build runSearch to complete event handler
function runSearch() {
    
    //prevent refresh
    d3.event.preventDefault(); 

    //clear prev entries
    tbody.selectAll("tr").remove(); 

    //sel/ref input
    var inpElement = d3.select("#datetime"); 
    var inpValue = inpElement.property("value"); 

    //table
    //load data.js and input
    console.log(inpValue); 
    console.log(data);
    
    var fltrSightings = data.filter(data => data.datetime === inpValue);

    //append filtered data from log to table
    fltrSightings.forEach(fltReport => {
        console.log(fltReport); 
        row=tbody.append("tr"); 
        Object.values(fltReport).forEach(fltSighting => 
            row.append("td").text(fltSighting));})
}