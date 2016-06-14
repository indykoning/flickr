$(document).ready(function(){
    var search;
    $('#get').click(function(){
        search = $('#search').val();

        getImages();
    });
    $('#search').keydown(function(e){
        if(e.keyCode == 13){
            search = $(this).val();

            getImages()
        }
    });

    function getImages(){

        var flickrURL =  "http://api.flickr.com/services/feeds/photos_public.gne?format=json&tags="+
        search +"&jsoncallback=?"
        $.ajax (
            {
                dataType: 'json',
                method:'GET',
                url: flickrURL,
                success: laadFotos
            }
        )
    }
    function laadFotos(data){
        $('#pics').html("");
        for(var i = 0; i < data.items.length; i++){
            var pic = data.items[i];
            var htmlCode = "<div class='container'><div class='fotos'> <a href='"+ pic.link +"' target='_blank'><img src='"+ pic.media.m + "' alt='"+ pic.title +"'></a></div class='title' ><h4>"+ pic.title +"</h4></div>";
            $('#pics').append(htmlCode);
        }
        $("#source a").attr("href", data.link).text(data.title + " on Flickr");
    }
})


