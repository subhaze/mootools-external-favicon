Element.getFavicons
===========

Update 3:
Now checks for https external links as well.

Update 2:
You can now specify a specific location to look for a favicon per link, via a class naming convention: favicon[http://full.path.to/the/image.png].

Update 1:
This plugin is now Packager compatible and will now look in the subdomain root dir if the external link points to a link with a subdomain.

Goes out and grabs a site's favicon and adds it to the left of the external link.
As of now this plugin will only get the favicon IF it is located at the root folder AND is using the standard naming convention "favicon"

![Screenshot](http://github.com/subhaze/mootools-external-favicon/raw/master/logo.png)

How to use
----------

JavaScript

	// You can execute from the body to get all external favicons on the page.
	$(document.body).getFavicons();
	
	// You can add your own custom class to override the positioning of the favicon.
	$(document.body).getFavicons( 'className' );
	
	//You can add an array of image extension that you wish to check for from external sites
	//As of now it will try to find ico, bmp, gif, png files.
	$(document.body).getFavicons( null, ['png','ico'] );
	
HTML

	<a href="http://www.google.com"></a><br />
	<a href="http://www.flickr.com"></a><br />
	<a href="http://www.twitter.com"></a><br />
	
	<!-- overriding the default favicon location and naming conventions -->
	
	<a class="favicon[http://github.com/subhaze/mootools-external-favicon/raw/master/me.png]" href="http://github.com/subhaze">github.com/subhaze</a>