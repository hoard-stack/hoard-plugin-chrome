var linksCollection = localStorage.getItem('hoard-links');
var links = JSON.parse(linksCollection);
console.log("LS", links);

var $links = $("#links");
links.forEach(function(link){
   var item = "<li>" + link + "</li>";
  $links.append(item);
});

