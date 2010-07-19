Element.getFavicons
===========

Goes out and grabs a site's favicon and adds it to the left of the external link.

![Screenshot](http://github.com/subhaze/mootools-element-highlight/raw/master/logo.png)

How to use
----------

JavaScript

	// You can specify a specific element or point to the body to get all external favicons on page
	$(document.body).getFavicons();
	
	// You may add your own custom class to override the default style settings
	$(document.body).getFavicons( 'className' );
	
HTML

	<a class="link" href="http://www.google.com"></a><br />
	<a class="link" href="http://www.flickr.com"></a><br />
	<a class="link" href="http://www.twitter.com"></a>