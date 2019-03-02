
$("head").append("<link rel='stylesheet' href='//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css'>");
$("head").append("<script src='https://code.jquery.com/ui/1.12.1/jquery-ui.js'></script>");
var tableHtml="<table id=myTable><tr><td><p>Days: <input type='text' id='noOfDates'></p><br/><button type='button' onclick='javascript:generateDates();'>Generate</button></td><td><table id='myDatesTable'></table></td></tr></table>"

$("#myTable").remove();

$(".ms-bodyareacell").append(tableHtml);

/*function generateDates(){
    $("#myDatesTable tr").remove();
    
    var today = new Date();
     today.setDate(today.getDate()-30);
     var dateOptionsHtml= "<option value='' selected='selected'></option>";

     for(var i=0; i<60; i++){
        var date = today.format("MM/dd/yyyy");
        dateOptionsHtml += "<option value='"+date+"'>"+date+"</option>";
        today.setDate(today.getDate()+1);
     }
   
    var numberOfDates = Number($("#noOfDates").val());
    var myDatesTable = $("#myDatesTable");
    myDatesTable.append("<tr><td>Date</td><td>Data</td></tr>")
    for(var i=1; i<=numberOfDates; i++){
        var trHtml = "<tr><td><select id='myItem-Date-"+i+"'>"+dateOptionsHtml+"</select></td><td><input type='text' id='myItem-Data-"+i+"'/></td></tr>"
        myDatesTable.append(trHtml);
    }

    myDatesTable.append("<tr><td></td><td><br/><br/><button type='button' onclick='javascript:SaveData();'>Save Data</button></td></tr>");
}*/

function generateDates(){
    $("#myDatesTable tr").remove();
           
    var numberOfDates = Number($("#noOfDates").val());
    var myDatesTable = $("#myDatesTable");
    myDatesTable.append("<tr><td>Date</td><td>Data</td></tr>")
    for(var i=1; i<=numberOfDates; i++){
        var trHtml = "<tr><td><input type='text' id='myItem-Date-"+i+"'></td><td><input type='text' id='myItem-Data-"+i+"'/></td></tr>"
        myDatesTable.append(trHtml);
    }
    $("[id^='myItem-Date-']").datepicker();
    myDatesTable.append("<tr><td></td><td><br/><br/><button type='button' onclick='javascript:SaveData();'>Save Data</button></td></tr>");
}

function SaveData(){
    var numberOfDates = Number($("#noOfDates").val());
    for(var i=1; i<=numberOfDates; i++){
        var date = $("#myItem-Date-"+i).val();
        var data = $("#myItem-Data-"+i).val();
        if(date && data){
            $("#ctl00_PlaceHolderMain_sessionDate_sessionDateDate").val(date);
            $("#ctl00_PlaceHolderMain_textDataField").val(data);
            submitForm();
        }
    }
    alert("Data Saved Successfully");
}

function submitForm(){
     
    var form = $("#aspnetForm");
    $.ajax({
       type: form.attr('method'),
       url: form.attr('action'),
       data: form.serialize() + "&ctl00%24PlaceHolderMain%24recordButton=Record+Data",
       success: function(data)
       {
           console.log("Data Saved for "+ $("#ctl00_PlaceHolderMain_sessionDate_sessionDateDate").val()+" value " + $("#ctl00_PlaceHolderMain_textDataField").val());
       }
    });
}
