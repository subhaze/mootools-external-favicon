Element.getFavicons
===========

Goes out and grabs a site's favicon and adds it to the left of the external link.
As of now this plugin will only get the favicon IF it is located at the root folder of the site and does not take into consideration favicons for subdomains.
I plan on updating this in the near future so that it will also check for subdomains as well.

![Screenshot](http://github.com/subhaze/mootools-external-favicon/raw/master/logo.png)

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