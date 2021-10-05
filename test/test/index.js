////////////////////////////////////////
//////// FOR HEADER DROPDOWNS /////////
///////////////////////////////////////
function DropDown(el, defaultText) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.basePlaceholder = defaultText;
    this.opts = this.dd.find('ul.options li');
    this.val = '';
    this.index = -1;
    this.initEvents();
}

DropDown.prototype = {
    initEvents: function () {
        var obj = this;

        obj.dd.on('click', function (event) {
            $(this).toggleClass('active');
            return false;
        });

        obj.opts.on('click', function (e) {

            // console.log(obj.basePlaceholder.text());
            
            var opt = $(this);
            if (opt.text() == 'Select None') {
                this.val = '';
                obj.index = -1;
                obj.placeholder.text(obj.basePlaceholder);
                // console.log(obj.basePlaceholder.text());
                return;
            }
            obj.val = opt.text();
            obj.index = opt.index();
            obj.placeholder.text(obj.val);
            e.stopPropagation();
        });
    },
    getValue: function () {
        return this.val;
    },
    getIndex: function () {
        return this.index;
    },
    reset: function () {
        this.val = '';
        this.index = -1;
        this.placeholder.text(this.basePlaceholder);
        return;
    }
}

var dd1 = new DropDown($('#ebdita-to-dropdown'), "EDIT COLUMNS");
var dd2 = new DropDown($('#sector-filter'), "Select");
var dd3 = new DropDown($('#ebdita-to-filter'), "Select");
var dd4 = new DropDown($('#pat-to-filter'), "Select");
var dd5 = new DropDown($('#industry-filter'), "Select"); 
var dd6 = new DropDown($('#company-checkbox-filter'), "Select"); 


// $(function () {



//     $(document).click(function () {
//         // all dropdowns
//         $('.custom-dropdown').removeClass('active');
//     });
//     $('.custom-dropdown').click(function (e) {
//         // all dropdowns
//         $('.custom-dropdown').removeClass('active');
//         $(e.currentTarget).addClass("active");

//     });



// });






////////////////////////////////////////
/////////// FOR Calendar ///////////
///////////////////////////////////////

var start = moment().subtract(29, 'days');
var end = moment();

function updateDate(start, end) {
    // $('.picker-div').html(start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY'));
    $('.picker-div > span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
}

$('.picker-div').daterangepicker({
    startDate: start,
    endDate: end,
    linkedCalendars: false,
    // alwaysShowCalendars: true,
    // showCustomRangeLabel: true,
    applyButtonClasses: "drp-apply orange-btn",
    cancelButtonClasses: "drp-cancel",
    ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    }
}, updateDate);

updateDate(start, end);




//highlighting custom date
var customdate = document.getElementsByClassName("ranges");
var customdateel=customdate[0];

var lastcus = $(customdateel).children()[0];


lastcus.addEventListener('click',function(e){
    
    if(e.target.innerHTML==="Custom Range")
    {
        e.target.classList.add("active");
        document.querySelector(".daterangepicker").classList.add("openrightcustom");
        $(lastcus).children()[0].classList.remove("active");
        $(lastcus).children()[1].classList.remove("active");
        $(lastcus).children()[2].classList.remove("active");
        $(lastcus).children()[3].classList.remove("active");
        $(lastcus).children()[4].classList.remove("active");
        $(lastcus).children()[5].classList.remove("active");
    }
    else{
        document.querySelector(".daterangepicker").classList.remove("openrightcustom");
    }
    
}
);



//end




////////////////////////////////////////
//////// FOR Checkbox Dropdown ////////
///////////////////////////////////////

function CheckboxDropDown(el, defaultText) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.basePlaceholder = defaultText;
    this.opts = this.dd.find('ul.options li');
    this.checkboxes = this.dd.find('ul.options li > input');
    this.val = [];
    this.index = [-1];
    this.initEvents();
}

CheckboxDropDown.prototype = {
    initEvents: function () {
        var obj = this;

        obj.dd.on('click', function (event) {
            $(this).toggleClass('active');
            return false;
        });

        obj.opts.on('click', function (e) {
            var opt = $(this);
            e.stopPropagation();

            // If it's Clear All, Clear all the values.
            var array = $(obj.checkboxes).toArray();
            if (opt.text().trim() === "Clear All") {
                array.forEach(input => {
                    input.checked = false;
                    obj.val = [];
                    return;
                });
            }

            // or add the checked value to the value array

            var filteredArray = array.filter((el) => {
                return el.checked == true;
            });

            if (filteredArray.length == 1) {
                var element = filteredArray[0];
                obj.placeholder.text(element.name);

            } else if (filteredArray.length == 0) {
                obj.placeholder.text(obj.basePlaceholder);
            } else {
                obj.placeholder.text(filteredArray.length + " Selected");
            }
        });
    },
    getValue: function () {
        return this.val;
    },
    getIndex: function () {
        return this.index;
    }
}

var dd6a = new CheckboxDropDown($('#company-checkbox-filter'), "Select Filters");
// var dd7 = new CheckboxDropDown($('#checkbox-filter-dropdown2'), "Select Filters");

///////////////////////////////////////
////////FOR Checkbox Dropdown2 ///////
/////////////////////////////////////

let filters = new Set();


function CheckboxDropDown2(el, defaultText) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.basePlaceholder = defaultText;
    this.opts = this.dd.find('ul.options li');
    this.checkboxes = this.dd.find('ul.options li > input');
    this.val = [];
    this.index = [-1];
    this.initEvents();
}


function filterColumns(){
    filters.forEach(headers => {
        
        let index = headers.index();
        let colGroup1 = $('table tr td:nth-child('+(index+4)+')');
        colGroup1.toggle();
        headers.toggle();
    });
}

// edit start
CheckboxDropDown2.prototype = {
    initEvents: function () {
        var obj = this;

        obj.dd.on('click', function (e) {
            $(this).toggleClass('active');
            return false;
        });

        obj.opts.on('click', function (e) {
            var opt = $(this);
            e.stopPropagation();
            
            // or if it's Clear All, then Clear all the values.

            var array = $(obj.checkboxes).toArray();
            if (opt.text().trim() === "Clear All") {
                $("table tr td:hidden").show();
                $("table tr th:hidden").show();
                array.forEach(input => {
                    input.checked = false;
                    obj.val = [];
                    return;
                });
            }


            // add the checked value to the value array
            var filteredArray = array.filter((el) => {
                return el.checked == true;
            });
            
            if (filteredArray.length == 1) {
                var element = filteredArray[0];
                obj.placeholder.text(element.name);

            } else if (filteredArray.length == 0) {
                obj.placeholder.text(obj.basePlaceholder);
            } else {
                obj.placeholder.text(filteredArray.length + " Selected");
            }

        
            //to animate the table accordingly

            //to reduce colspan of (Sales || EBDITA) if a column is set to hidden
            $("th:contains('Sales')").attr("colspan", (5-$("input[name$='Sales']:checked").length));
            $("th:contains('EBDITA')").attr("colspan", (5-$("input[name$='EBDITA']:checked").length));
         
            //if all columns of main header 'Sales' are hidden then it itslef should be set to hidden
            if($("input[name$='Sales']:checked").length==5)
            {
                $("th:contains('Sales')").hide();
            } else{
                $("th:contains('Sales')").show();
            }  
            
            //if all columns of main header 'EBDITA' are hidden then it also has to hide
            if($("input[name$='EBDITA']:checked").length==5)
            {
                $("th:contains('EBDITA')").hide();
            } else{
                $("th:contains('EBDITA')").show();
            }
        });

         // code for hiding the selected columns (Qs)
         $('#checkbox-filter-dropdown2 input:checkbox').attr("checked", false).click(function(e){ 
            let headers = $("[id="+$(this).attr("name")+"]");
            if(filters.has(headers)){
                filters.delete(headers)
            }else {
                filters.add(headers)
            }
            let index = headers.index();
            let colGroup1 = $('table tr td:nth-child('+(index+4)+')');
            colGroup1.toggle();
            headers.toggle();
          });
        
    },



    getValue: function () {
        return this.val;
    },
    getIndex: function () {
        return this.index;
    }
}

var dd7 = new CheckboxDropDown2($('#checkbox-filter-dropdown2'), "Select Filters"); 




// edit end



            ////////////////////////////
            ////////////////////////////
            ////////////////////////////
            ///// Sheets Management ////
            ////////////////////////////
            ////////////////////////////
            ////////////////////////////
            ////////////////////////////

            let sheetContainer = document.querySelector(".sheet-buttons > ul");
            // let noButtons = sheetContainer.childElementCount;
            // console.log(sheetContainer);
            sheetContainer.addEventListener("click", function (e) {
                //here to put the code for filter reset
                $('#checkbox-filter-dropdown2').find('ul.options li').click();


                let sheet = e.target;
                let rows = document.querySelector("#seet-table").getElementsByTagName("tr");
                let noButtons = sheet.parentElement.childElementCount;
                // let buttons =noButtons;
                // console.log(noButtons);
                let rowsperpage = Math.ceil(rows.length/noButtons);

                // console.log(rowsperpage);
                //when sheet 1 is clicked
                if(sheet.classList[1] === 'sheet-1')
                {
                    rows[0].innerHTML = '\n              <th rowspan="2" class="disableFilterBy sorterHeader">Company Name</th>\n              <th rowspan="2" class="sorterHeader">Sector</th>\n              <th rowspan="2" class="sortingAsc sorterHeader">Market Cap</th>\n              <th colspan="5" class="disableSort">Sales</th>\n              <th colspan="5" class="disableSort">EBDITA</th>\n            ';
                    // console.log(sheet);
                    let i;
                    for(i=0;i<rowsperpage;i++)
                    {
                        rows[i].style.display = "";
                    }
                    for(let j=rowsperpage;j<rows.length;j++)
                    {
                        if(rows[j].classList[0] === 'sum')
                        {
                            continue;
                        }
                        rows[j].style.display = "none";
                        // console.log(rows[j]);
                    }
                    filterColumns();
                }
                //when sheet 2 is clicked 
                else if(sheet.classList[1] === 'sheet-2')
                {
                    rows[0].innerHTML='\n              <th rowspan="2" class="disableFilterBy sorterHeader">Company Name</th>\n              <th rowspan="2" class="sorterHeader">Sector</th>\n              <th rowspan="2" class="sortingAsc sorterHeader">Market Cap</th>\n              <th rowspan="2" class="sortingAsc sorterHeader">Market Cap</th>\n               <th rowspan="2" class="sortingAsc sorterHeader">Gross Profit</th>\n            <th rowspan="2" class="sortingAsc sorterHeader">Sales</th>\n     <th rowspan="2" class="sortingAsc sorterHeader">Market Cap</th>\n       <th rowspan="2" class="sortingAsc sorterHeader">Gross Profit</th>\n     <th rowspan="2" class="sortingAsc sorterHeader">Sales</th>\n       <th rowspan="2" class="sortingAsc sorterHeader">Market Cap</th>\n       <th rowspan="2" class="sortingAsc sorterHeader">Gross Profit</th>\n     <th rowspan="2" class="sortingAsc sorterHeader">Sales</th>\n <th rowspan="2" class="sortingAsc sorterHeader">Market Cap</th>\n'
                    for(let j=1;j<rowsperpage;j++)
                    {
                        if(rows[j].classList[0] === 'sum')
                        {
                            continue;
                        }
                        rows[j].style.display = "none";
                        // console.log(rows[j]);
                    }

                    // console.log(sheet);
                    for(let i=rowsperpage;i<(rowsperpage+rowsperpage);i++)
                    {
                        rows[i].style.display = "";
                    }
                    for(let j=rowsperpage+rowsperpage;j<rows.length;j++)
                    {
                        if(rows[j].classList[0] === 'sum')
                        {
                            continue;
                        }
                        rows[j].style.display = "none";
                        // console.log(rows[j]);
                    }
                    
                }

                //when sheet 3 is clicked
                else if(sheet.classList[1] === 'sheet-3')
                {
                    rows[0].innerHTML='\n              <th rowspan="2" class="disableFilterBy sorterHeader">Company Name</th>\n              <th rowspan="2" class="sorterHeader">Sector</th>\n              <th rowspan="2" class="sortingAsc sorterHeader">Market Cap</th>\n              <th rowspan="2" class="sortingAsc sorterHeader">Market Cap</th>\n               <th rowspan="2" class="sortingAsc sorterHeader">Gross Profit</th>\n            <th rowspan="2" class="sortingAsc sorterHeader">Sales</th>\n     <th rowspan="2" class="sortingAsc sorterHeader">Market Cap</th>\n       <th rowspan="2" class="sortingAsc sorterHeader">Gross Profit</th>\n     <th rowspan="2" class="sortingAsc sorterHeader">Sales</th>\n       <th rowspan="2" class="sortingAsc sorterHeader">Market Cap</th>\n       <th rowspan="2" class="sortingAsc sorterHeader">Gross Profit</th>\n     <th rowspan="2" class="sortingAsc sorterHeader">Sales</th>\n <th rowspan="2" class="sortingAsc sorterHeader">Market Cap</th>\n'
                    // console.log(sheet);
                    for(let i=(rowsperpage+rowsperpage);i<rows.length;i++)
                    {
                        rows[i].style.display = "";
                    }
                    for(let j=1;j<rowsperpage+rowsperpage;j++)
                    {
                        if(rows[j].classList[0] === 'sum')
                        {
                            continue;
                        }
                        rows[j].style.display = "none";
                        // console.log(rows[j]);
                    }
                }
            });









var currentActiveSheet = "sheet-1";
var currentActiveTable = "table-1";

function hideTables() {
    $(".table-2").addClass("hidden");
    $(".table-3").addClass("hidden");
}

hideTables();
$('.sheet-btn').click(function (e) {
    swichSheet(e.target.textContent);
});

function swichSheet(sheetName) {
    $("." + currentActiveSheet).removeClass("active");
    $("." + currentActiveTable).removeClass("display-block");
    $("." + currentActiveTable).addClass("hidden");
    
    if (sheetName == "Sheet1") {
        currentActiveSheet = "sheet-1";
        currentActiveTable = "table-1";
        $(".sheet-1").addClass("active");
        $(".table-1").removeClass("hidden");
        $(".table-1").addClass("display-block");
        // $(".table-1").show();
        // document.querySelector('.table-1').setAttribute("style", "display: block;");

    } else if (sheetName == "Sheet2") {
        currentActiveSheet = "sheet-2";
        currentActiveTable = "table-2";
        $(".sheet-2").addClass("active");
        $(".table-2").removeClass("hidden");
        $(".table-2").addClass("display-block");
        // document.querySelector('.table-2').setAttribute("style", "display: block;");
    } else if (sheetName == "Sheet3") {
        currentActiveSheet = "sheet-3";
        currentActiveTable = "table-3";
        $(".sheet-3").addClass("active");
        $(".table-3").removeClass("hidden");
        $(".table-3").addClass("display-block");
        // document.querySelector('.table-3').setAttribute("style", "display: block;");
    }
    showOverflowCursor();

}

///////// My js /////////
let filter_open = document.querySelector('#fil-open');
let filter_open_icon = document.querySelector('#fil-i');
let filter_close = document.querySelector('#fil-close');
let table = document.querySelector('.Seet');
let filter = document.querySelector('.fil-cat');
let n_ul = document.querySelector('.navbar-nav');
let n_li = document.querySelectorAll('.nav-item');
let ul = document.querySelector('.cat-ul');
let li = document.querySelectorAll('.cat-ul>li');
let q5 = document.querySelector(".m-head th:nth-last-child(1)");




// edit 
let check = false; 
let filter_close_again = document.querySelector('#apply-btn'); 
var filterElements = document.getElementsByClassName("filter-text");

for (var i = 0; i < filterElements.length; i++) {
    filterElements[i].addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            filter_close_again.click();
        }
    });
}

q5.classList.remove('disableSort');
q5.classList.add('sorterHeader');

n_li.forEach(el => {
  el.addEventListener('click', function () {
    n_ul.querySelector('.active').classList.remove('active');
    el.classList.add('active');
  })
});

filter_open.addEventListener("click", () => {

    if(check === false)
    {
        filter_close.classList.remove("d-none");
        filter_open.classList.add("d-none");
        table.classList.add("d-none");
        filter.classList.remove("d-none");
        filter_open_icon.classList.add("d-none");
        check = true;
    }
    else
    {
        filter_close.classList.add("d-none");
        filter_open.classList.remove("d-none");
        table.classList.remove("d-none");
        filter.classList.add("d-none");
        filter_open_icon.classList.remove("d-none");
        check = false;
    }
});

filter_close.addEventListener("click", () => {
    if(check === true){
        filter_close.classList.add("d-none");
        filter_open.classList.remove("d-none");
        table.classList.remove("d-none");
        filter.classList.add("d-none");
        filter_open_icon.classList.remove("d-none");
        check = false;
    }
});

// ****
// On Closing Alert Remove Filter
function closeAlert(value,column,f_id,f_type,alert_el) {
    // Alert
    const alert = document.querySelector("#"+alert_el);
    // Create Bootstrap alert instance
    const bsAlert = new bootstrap.Alert(alert);
    bsAlert.close();

    var filter_tags = document.getElementById("filter-tags");

    var numberOfChildren = filter_tags.children.length;

    var element = findElement(f_id);

    if(f_type == "checkbox") {
        $('#'+f_id).click();
    }

    if (numberOfChildren > 0){
    // Remove those rows
        removeTableRows(value,column,"seet-table");
        if (f_type == "dropdown") {

            $('#'+f_id).find('span').text("Select");
            } else {
        
                element.value = "";
            }
        // element.value="";

    } else {
        resetTable("seet-table");
        if (f_type == "dropdown") {

            $('#'+f_id).find('span').text("Select");
            } else {
        
                element.value = "";
            }
        // element.value="";
    }
};

// ****
// Reset Filters to Default
function resetFilters(id){
    filter_close.classList.add("d-none");
    filter_open.classList.remove("d-none");
    table.classList.remove("d-none");
    filter.classList.add("d-none");
    filter_open_icon.classList.remove("d-none");
    resetTable(id);

}

var clearedRows = false;

// ****
// Add tag upon click
filter_close_again.addEventListener("click", () => {
    if(check === true){

        // Clear Rows
        hideRows("seet-table");
        clearedRows = true;

        // Get IDs having Filter Text

        buildTags("market-cap",2,"input");
        
        buildTags("sector-filter",1,"dropdown");

        //building multiple tags for checkbox filter
        var checkedItems = document.getElementById("company-checkbox-filter")
        .querySelectorAll('input[type="checkbox"]:checked');
        if(checkedItems.length!==0)
        {
            for(var i of checkedItems) {
                buildTags($(i).attr('id'),0,"checkbox");
            }
        }
        
        
        buildTags("sales-yoy-filter",3,"input");

        buildTags("ebdita-yoy-filter",8,"input");

        // Pass in null for Column if it is not present in table See Description of `buildTags` Function
        buildTags("ltp-filter",null,"input");
        buildTags("market-cap-2",null,"input");
        buildTags("market-pb-filter",null,"input");
        buildTags("market-ttm-filter",null,"input");
        buildTags("roce-filter",null,"input");
        buildTags("ttm-sales-filter",null,"input");
        buildTags("ttm-pat-abs-filter",null,"input");
        buildTags("sales-qqq-filter",null,"input");
        buildTags("ebdita-qqq-filter",null,"input");
        buildTags("ebdita-yoy-filter-2",null,"input");
        buildTags("pat-qqq-filter",null,"input");
        buildTags("pat-yoy-filter",null,"input");
        buildTags("ebdita-to-filter",null,"dropdown");
        buildTags("pat-to-filter",null,"dropdown");
        buildTags("gross-margin-filter",null,"input");
        buildTags("gross-profit-filter",null,"input");
        buildTags("industry-filter",null,"dropdown");


        filter_close.classList.add("d-none");
        filter_open.classList.remove("d-none");
        table.classList.remove("d-none");
        filter.classList.add("d-none");
        filter_open_icon.classList.remove("d-none");
        check = false;    
    }
});

// edit end    
li.forEach(el => {
  el.addEventListener('click', function () {
    ul.querySelector('.active').classList.remove('active');
    el.classList.add('active');
  })
});


// ****
////////////// Check if Element Exists ////////////
function elementExists(id) {

var elm = document.getElementById(id);

if (elm) {
    return true;
} 

return false;
}


// ****
// Find by ID
function findElement(id) {
    return document.getElementById(id);
}

// ****
///////////// Build Tags and Filter /////////////
//**** Description ****//
//**
 /* 
 * @param {*} id : ID of the element
 * @param {*} column : Column number Starting from 0, For Columns which are not not present in table set them to null
 * @param {*} type : Type of the element {checkbox,input}
 */
//
function buildTags(id,column,type) {

    var element = findElement(id);

    var value = "";
    if (type == "dropdown") {

        value = $('#'+id).find('span').text();
    } else if(type == "checkbox") {
        value = $('label[for="'+ $(element).attr('id') +'"]').text();
     
    }else {

        value = element.value;
    }

    // Tags Container
    var filter_tags = document.getElementById("filter-tags");

    if (value === "" || value === "Select") return;

    var text = $('#'+id).parent().find('.filter-label').text();   
    if(type == "checkbox")
    {
        var text = $('#'+id).parent().parent().parent().parent().parent().find('.filter-label').text();
    }
    var html = `<div id='${id}-filter'><div class="alert alert-dismissible fade show filter-alart" role="alert">${text}: ${value}
                <button id="${id}-alert" class="btn-close" data-value="${value}" data-column="${column}" onclick="closeAlert('${value}','${column}','${id}','${type}','${id}-filter')">X</button>
            </div></div>`;

    if ( value ) {

        // Check if Tag Already Exists 
        if ( elementExists(id+"-filter") ){

            html = `<div class="alert alert-dismissible fade show filter-alart" role="alert">${text}: ${value}
                <button id="${id}-alert" class="btn-close" data-value="${value}" data-column="${column}" onclick="closeAlert('${value}','${column}','${id}','${type}','${id}-filter')">X</button>
            </div>`;

            
            // Replace Tag
            document.getElementById(id+"-filter").innerHTML = html;

        } else {
            var inner_html = filter_tags.innerHTML;

            filter_tags.innerHTML = inner_html + html;
        }

        filterTable(value,"seet-table",column);
    }
}

// **** 
// Filter Table w.r.t Filter Text, Table Id & Column ID
function filterTable(filter_text, table_id, column_id) {
    var filter, table, tr, td, cell, i, j;
    filter = filter_text.toUpperCase();
    table = document.getElementById(table_id);
    tr = table.getElementsByTagName("tr");
    for (i = 2; i < tr.length; i++) {
        cell = tr[i].getElementsByTagName("td")[column_id];
        if (cell) {
            if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } 
        }
    }
}

// **** 
// Remove Row from Table w.r.t Filter Text & Column ID
function removeTableRows(filter_text, column_id, table_id) {
var filter, table, tr, td, cell, i, j;
filter = filter_text.toUpperCase();
table = document.getElementById(table_id);
tr = table.getElementsByTagName("tr");
for (i = 2; i < tr.length; i++) {
    cell = tr[i].getElementsByTagName("td")[column_id];
    if (cell) {
        if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "none";
        } 
    }
}
}

// ****
// Reset Table
function resetTable(table_id) {
    var table, tr,i
    table = document.getElementById(table_id);
    tr = table.getElementsByTagName("tr");
    for (i = 2; i < tr.length; i++) {
        tr[i].style.display = "";
    }
}

// ****
// Hide Table rows
function hideRows(table_id) {
if (clearedRows) return;
var filter, table, tr, td, cell, i, j;
table = document.getElementById(table_id);
tr = table.getElementsByTagName("tr");
for (i = 2; i < tr.length; i++) {
    tr[i].style.display = "none";
}
}





////////////////////////////////////////
/////////// FOR table alignment ///////////
///////////////////////////////////////


function tableAlignmentDiv(){
var Table = document.querySelector("#seet-table");
let trEl = $(Table).find("tbody tr").toArray();
// console.log(trEl);
var r=0; //start counting rows in table
while(row=trEl[r++])
{
  var c=0; //start counting columns in row
//   console.log(row);
  while(cell=row.cells[c++])
  {
    let data = cell.innerHTML;
    cell.innerHTML = "";
    let div = document.createElement("div");
    div.innerHTML = data;
    div.classList.add("tddiv");
    cell.appendChild(div);
    if(isNaN(data))
    {
        cell.classList.add("text-start");
    }
    else
    {
        cell.classList.add("text-end");
    }
    
  }
}
}
// tableAlignmentDiv();

//end of table alignment


///////////// CHeck Text overflow in table data///////// 


function showOverflowCursor(){
    var tdArray = $('table td div').toArray();
    // console.log(tdArray);
    tdArray.forEach((el) => {
        let isOverflowing = el.clientWidth < el.scrollWidth ||  el.clientHeight < el.scrollHeight;
        // console.log(el.clientWidth)
            // || el.clientHeight < el.scrollHeight;
        // console.log(isOverflowing);
        // console.log(el.scrollWidth);
        if (isOverflowing) {
            el.style.cursor = "w-resize";
        }
    });
}
// showOverflowCursor();


// this function will close filter tag upon emptying corresponding text box
$('.filt input[type="text"]').on('keyup', (e)=>{
    var filter_tags = document.getElementById("filter-tags");
    var numberOfChildren = filter_tags.children.length;
    if(numberOfChildren>0)
    {
        if(e.target.value == "")
        {
            var elId = $(e.target).attr('id');
            $('#'+elId+'-alert').click();
        }
    }
});

