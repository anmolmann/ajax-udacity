
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var streetstr= $('#street').val();
    var citystr = $('#city').val();
    var address = streetstr + ', ' + citystr;
    $greeting.text('So you want to live at ' + address + ' ?');

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=1000x800&location=' + address + '';
    $body.append('<img class = "bgimg" src = "'+streetviewUrl+'">');


    var nytimeURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + citystr + "&sort=newest&api-key=812af3a79cb74df29cb923851c63a846";

    $.getJSON(nytimeURL, function(data) {	// this anonymous function gets the response back from nyt
    	$nytHeaderElem.text('New york times article about ' + citystr);

    	articles = data.response.docs;	// iterate through this data object which is the actual response from nyt

    	for(var i = 0; i < articles.length; i++) {
    		var article = articles[i];
    		$nytElem.append(
    			'<li class = "article">' +
    			'<a href = "'+article.web_url+'">' +
    			article.headline.main +
    			'</a>' +
    			'<p>' +
    			article.snippet +
    			'</p>' +
    			'</li>'
    		);
    	}
    }).error(function(e) {		// e is the error itself
    	$nytHeaderElem.text('New York Times articles could not be loaded');
    });


    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+citystr+'&format=json&callback=wikiCallback';
    $.ajax({
    		url:wikiUrl,
    		dataType:"jsonp",
    		//jsonp:"callback", by default, usinh jsonp as datatype will set the callback function name to callback. so, no need to mention it again.
    		success:function(data) {
    			var articeList = data[1];
    			for(var i = 0; i < articeList.length; i++) {
    				articlestr = articeList[i];
    				var url = 'https://en.wikipedia.org/wiki/'+articlestr;
    				$wikiElem.append(
    					'<li><a href="'+url+'">'
    					+ articlestr+
    					'</a></li>'
    					);
    			}
    		}
    });



    return false;
};

$('#form-container').submit(loadData);
