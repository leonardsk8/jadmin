
 function youtubeSearch(){
      var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: 15,
            order: "viewCount"
       }); 
       // execute the request
       request.execute(function(response) {
         //var str = JSON.stringify(response.result);
           //console.log(str);
          var results = response.result;
          $("#results").html("");
          $.each(results.items, function(index, item) {
            $.get("/JukeboxAdministrator/assets/tpl/item.jsp", function(data) {
              
                $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
            });
          });
          resetVideoHeight();
       });
 }
    $("form").on("submit", function(e) {
       e.preventDefault();
      youtubeSearch();
    });
    
    $(window).on("resize", resetVideoHeight);

function tplawesome(e,t){    
    
        t[0].title = t[0].title.replace(/'/g,"");    
        
    res=e;for(var n=0;n<t.length;n++){
        res=res.replace(/\-\-(.*?)\-\-/g,function(e,r){return t[n][r]})
        
    }
    
    return res
}
function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}


function init() {
    
    gapi.client.setApiKey("AIzaSyCn6WrKAmReUVeMjbQoOE-iAi4uFKH9jxg");
    gapi.client.load("youtube", "v3", function() {
//    alert("App init Ready")
    });
}
