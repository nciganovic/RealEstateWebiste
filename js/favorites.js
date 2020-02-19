$(document).ready(function(){
    var favorites = localStorage.getItem("fav");
    var favParse = JSON.parse(favorites);
    console.log(favParse);
    showProperties(favParse);

    $(".close-modal").click(function(event){
        event.preventDefault();
        $("#modal").addClass("d-none");
        $("#modal").removeClass("d-flex");
    })

    //Favorites
    $(".add-fav").click(function(e){
        e.preventDefault();
        var id = $(this).attr("item");
        var allData;

        $.ajax({
            url : "data/properties.json",
            method: 'GET', 
            type: 'json',
            success: function(data) { 
                for(d of data){
                    if(d.id == id){
                        var thisItem = d;
                    }
                }
                var favorites = localStorage.getItem("fav");
                console.log(favorites);
                var favParsed = JSON.parse(favorites);
                console.log(favParsed);
                addOrRemoveFavorites(favParsed, thisItem);
            },
            error: function(xhr, error, status) {
                console.log(xhr);
            }
        });

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
                               <i class="fas fa-map-marker-alt"></i> ${d.location},  ${d.date}
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
                            <a class="open-modal" item="${d.id}" href="">Read more <i class="fas fa-arrow-right"></i></a>
                        </span>
                    </div>
                </div>
            </div>
        `
    }

    $("#property-card-holder").html(html);

    $(".open-modal").click(function(event){
        event.preventDefault();
        $("#modal").removeClass("d-none");
        $("#modal").addClass("d-flex");
        showSpecificModal(this, data);

        var id = $(this).attr("item");
        var favorites = localStorage.getItem("fav");
        
        if(favorites){
            var favParsed = JSON.parse(favorites);
            for(obj of favParsed){
                console.log(obj.id, id);
                if(obj.id == id){
                    $(".add-fav").text("Remove from favorites");
                    break;
                }
                else{
                    $(".add-fav").text("Add to favorites");
                }
            }
        }
        else{
            $(".add-fav").text("Add to favorites");
        }
        
    })
}

function showSpecificModal(item, data){
    console.log(item);
    var id = $(item).attr("item");
    var specItem;
    $(".modal-info").html("");
    for(d of data){
        if(d.id == id){
            specItem = `
                    <li>${d.title}</li>
                    <li>${d.location}</li>
                    <li>${d.status}</li>
                    <li>${d.type}</li>
                    <li>${d.price}</li>
                    <li>${d.rooms}</li>
                `
            $(".modal-info").html(specItem);

            $(".add-fav").attr("item", id);
        }
    }
}

function addOrRemoveFavorites(storage, thisItem){
    if(storage){
        console.log("There is something in storage.");
        var isThisItemInStorage = false;
        for(obj of storage){
            console.log(obj.id, thisItem.id)
            if(obj.id == thisItem.id){
                console.log("This object is in storage");
                isThisItemInStorage = true;
                //DELETE THIS ITEM FROM STORAGE
                // 1. get storage, 2. delete this item from storage 3. set this as new storage
                var favorites = localStorage.getItem("fav");
                var favParsed = JSON.parse(favorites);
                
                for(idx in favParsed){
                    if(favParsed[idx].id == thisItem.id){
                        delete favParsed[idx];
                        break;
                    }
                }

                var noNullFav = favParsed.filter(function (el) {
                    return el != null;
                });

                if(noNullFav.length == 0){
                    console.log("No items left in localstorage.");
                    localStorage.removeItem("fav");
                }
                else{
                    console.log("There are still items left in storage.");
                    var stringFav = JSON.stringify(noNullFav);
                    localStorage.setItem("fav", stringFav);
                    console.log(localStorage.getItem("fav"));
                }
            
                $(".add-fav").text("Add to favorites");
                //if you delete remove object from favorites refresh page and close modal
                showProperties(JSON.parse(localStorage.getItem("fav")));
                $("#modal").addClass("d-none");
                $("#modal").removeClass("d-flex");
                break;
            }
        }
        if(!isThisItemInStorage){
            //If there are some items in storage but not this one
            var favorites = localStorage.getItem("fav");
            var favParsed = JSON.parse(favorites);    
            favParsed.push(thisItem);
            var stringFav = JSON.stringify(favParsed);
            localStorage.setItem("fav", stringFav);
            console.log(localStorage.getItem("fav")); 

            $(".add-fav").text("Remove from favorites");
        }
    }
    else{
        //SET ITEM IN STORAGE
        console.log("There is nothing in storage.");
        var newFavList = [];
        newFavList.push(thisItem);
        var stringFav = JSON.stringify(newFavList);
        localStorage.setItem("fav", stringFav);
        console.log(localStorage.getItem("fav"));

        $(".add-fav").text("Remove from favorites");
    }
}