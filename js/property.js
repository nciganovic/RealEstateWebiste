$(document).ready(function(){
    console.log("property.js");
    $.ajax({
        url : "data/properties.json",
        method: 'GET', 
        type: 'json',
        success: function(data) { 
            showProperties(data);
        },
        error: function(xhr, error, status) {
            console.log(xhr);
        }
    });
})

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