//Create Data Table
$('#recentTable').DataTable( {
  "info": false,
  "language": {
    "processing": "<div class=\"progress-bar bg-warning progress-bar-indeterminate\" role=\"progressbar\"></div>"
  },
  "filter": false,
  "paging": false,
  "processing": true,
  "ajax" : {
    "url" : 'app/pizza_api.php?recent',
    dataSrc : ''
  },
  "columns" : [{
    "data" : "title",
    "render": function ( data, type, row, meta ) {
    return type === 'display' && data.length > 14 ?
      '<span title="'+data+'">'+data.substr( 0, 11 )+'...</span>' :
      data;
    }
  }, {
    "data" : "question",
    className: "d-none d-sm-table-cell",
    "render": function ( data, type, row, meta ) {
    return type === 'display' && data.length > 18 ?
      '<span title="'+data+'">'+data.substr( 0, 15 )+'...</span>' :
      data;
    }
  }, {
    "data" : "url",
    "render": function ( data, type, row, meta ) {
      return '<a target="_self" href="vote.html?poll='+data+'">'+data+'</a>';
    }
  }, {
    "data" : "creator",
    "render": function ( data, type, row, meta ) {
    return type === 'display' && data.length > 14 ?
      '<span title="'+data+'">'+data.substr( 0, 11 )+'...</span>' :
      data;
    }
  }, {
    "data" : "poll_timestamp",
    className: "d-none d-md-table-cell"
  }]
});

//Safari Mobile Web Standalone Link Redirect
if(("standalone" in window.navigator) && window.navigator.standalone){
  var noddy, remotes = false;
  document.addEventListener('click', function(event) {
  noddy = event.target;
  while(noddy.nodeName !== "A" && noddy.nodeName !== "HTML") {
  noddy = noddy.parentNode;
  }
  if('href' in noddy && noddy.href.indexOf('http') !== -1 && (noddy.href.indexOf(document.location.host) !== -1 || remotes))
  {
  event.preventDefault();
  document.location.href = noddy.href;
  }
  },false);
}