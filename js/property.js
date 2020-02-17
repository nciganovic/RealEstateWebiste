$(document).ready(function(){
    console.log("property.js");
    $.ajax({
        url : "data/properties.json",
        method: 'GET', 
        type: 'json',
        success: function(data) { 
            updateFilters(data);
            showProperties(data);
        },
        error: function(xhr, error, status) {
            console.log(xhr);
        }
    });

    $("#min-price").change(checkValue);
    $("#max-price").change(checkValue);
    $("#min-rooms").change(checkValue);
    $("#max-rooms").change(checkValue);
})

function updateFilters(data){
    var allStatuses = [];
    var allTypes = [];
    var allLocations = [];
    var allPrices = [];
    var allRooms = [];

    for(d of data){
        if(!allStatuses.includes(d.status)){
            allStatuses.push(d.status);
        }
        if(!allTypes.includes(d.type)){
            allTypes.push(d.type);
        }
        if(!allLocations.includes(d.location)){
            allLocations.push(d.location);
        }
        if(!allPrices.includes(d.price)){
            var str = d.price;
            var removeDot = str.replace(".", "");
            var number = Number(removeDot);
            allPrices.push(number);
        }
        if(!allRooms.includes(d.rooms)){
            var num = Number(d.rooms);
            allRooms.push(num);
        }
    }

    var maxPrice = Math.max.apply(Math, allPrices); 
    var maxRooms = Math.max.apply(Math, allRooms); 
    $("#max-price").attr("max", maxPrice);
    $("#max-price").attr("value", maxPrice);
    $("#max-rooms").attr("max", maxRooms);
    $("#max-rooms").attr("value", maxRooms);
    
    makeSelectTag(allStatuses, "Status");
    makeSelectTag(allTypes, "Type");
    makeSelectTag(allLocations, "Location");

}

function showProperties(data){
    console.log(data);
    html = "";
    for(d of data){
        html += `
        <div class="col-xl-4 col-lg-6 mt-3">
                <span class="image-block img-hover">
                    <a class="image-zoom" href="images/g1.jpg" data-gal="prettyPhoto[gallery]">
                        <img src="images/${d.img}" class="img-fluid " alt="${d.title}">
                    </a>
                </span>
                <div class="property-info-list">
                    <div class="detail">
                        <h4 class="title">
                            <a href="single.html">${d.title}</a>
                        </h4>
                        <div class="location mt-2 mb-2">
                            <a href="single.html">
                               <i class="fas fa-map-marker-alt"></i> ${d.location},
                            </a>
                        </div>
                        <ul class="facilities-list clearfix">
                            <li class="mt-2 mb-2">
                                <i class="fas fa-bed"></i> ${d.rooms} Bedrooms
                            </li>
                            <li class="mt-2 mb-2">
                                <i class="fas fa-bath"></i> ${d.status}
                            </li>
                            <li class="mt-2 mb-2">
                                <i class="far fa-building"></i> ${d.type}
                            </li>
                            <li class="mt-2 mb-2">
                                <i class="far fa-building"></i> ${d.price}
                            </li>
                        </ul>
                    </div>
                    <div class="footer-properties">
                        <a class="admin" href="#">
                            <i class="fa fa-user"></i> ${d.owner}
                        </a>
                        <span>
                            <i class="fa fa-calendar-o"></i> ${d.date}
                        </span>
                    </div>
                </div>
            </div>
        `
    }
    $("#property-card-holder").html(html);
}

function makeSelectTag(data, name){
    html = `<option value='0'>${name}</option>`;
    for(d of data){
        html += `<option value="${d}">${d}</option>`
    }
    var nameToLow = name.toLowerCase();
    $(`[name='${nameToLow}']`).html(html);
}

function checkValue(){
    console.log(this);
    var id = $(this).attr("id");
    var getNames = id.split("-");
    var maxMin = getNames[0];
    var priceRoom = getNames[1];

    var maxValue = $(this).attr("max");
 

    if(maxMin == "max" && priceRoom == "price"){
        var a = document.getElementById("min-price").value;
        var b = document.getElementById("max-price").value;
        if(b < a){
            document.getElementById("max-price").value = a;
        }
        if(b > maxValue){
            document.getElementById("max-price").value = maxValue;
        }
    }
    else if(maxMin == "min" && priceRoom == "price"){
        var a = document.getElementById("min-price").value;
        var b = document.getElementById("max-price").value;
        console.log("--MIN-PRICE--");
        console.log(a,b);
        if(a > b){
            console.log(a, "is bigger then", b);
            document.getElementById("min-price").value = b;
        }
        if(a < 0){
            document.getElementById("min-price").value = 0;
        }
    }
    else if(maxMin == "max" && priceRoom == "rooms"){
        var c = document.getElementById("min-rooms").value;
        var d = document.getElementById("max-rooms").value;
        if(d < c){
            document.getElementById("max-rooms").value = c;
        }
        if(d > maxValue){
            document.getElementById("max-rooms").value = maxValue;
        }
    }
    else if(maxMin == "min" && priceRoom == "rooms"){
        var c = document.getElementById("min-rooms").value;
        var d = document.getElementById("max-rooms").value;
        if(c > d){
            var getBig = document.getElementById("max-rooms").value;
            document.getElementById("min-rooms").value = getBig;
        }
        if(c < 0){
            document.getElementById("min-rooms").value = 0;
        }
    }
     
}