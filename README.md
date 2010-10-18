Element.getFavicons
===========

Update 4:
Ability to specify the favicon image size. I've changed the way the favicon is displayed, it used to be set as the <a> background image
but now that I'm seeing sites (ex. twitter) using larger favicons I felt that using an actual image tag would be best in order to keep all
favicon images the same size. So now instead of applying the favicon to the <a> background the <a> is wrapped in a span tag and the image
is injected into this span with the <a> allowing you to set a specific size of the image via CSS.

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

	#JS
	// You can execute from the body to get all external favicons on the page.
	$(document.body).getFavicons();

	// You can add a prefix to the internal class names applied to the span wrapper
	// and image to prevent class name conflicts
	$(document.body).getFavicons('myPrefix-');
	// result would be: <span class="myPrefix-favicon-wrapper"/>, <img class="myPrefix-favicon-img"/>

	// *Note* If you add a space at the end of the class name you can apply it as another class instead
	// of a prefix to the internal class name
	$(document.body).getFavicons('newClass');
	// result would be: <span class="newClass favicon-wrapper"/>, <img class="newClass favicon-img"/>

	//You can add an array of image extensions that you wish to check for from external sites
	//By default it will try to find a ico, bmp, gif, or png file.
	$(document.body).getFavicons( null, ['png','ico'] );

HTML - Before favicon function is applied

	#HTML
	<a href="http://www.google.com"></a><br />
	<a href="http://www.flickr.com"></a><br />
	<a href="http://www.twitter.com"></a><br />

	<!-- overriding the default behavior by applying a specific location to get the favicon from -->
	<a class="favicon[http://github.com/subhaze/mootools-external-favicon/raw/master/me.png]" href="http://github.com/subhaze">github.com/subhaze</a>

HTML - After favicon function is applied

    #HTML
    <span class="favicon-wrapper">
        <img src="http://www.google.com/favicon.ico" class="favicon-img">
        <a href="http://www.google.com">google.com</a>
    </span><br>
    <span class="favicon-wrapper">
        <img src="http://www.flickr.com/favicon.ico" class="favicon-img">
        <a href="http://www.flickr.com">flickr.com</a>
    </span><br>
    <span class="favicon-wrapper">
        <img src="http://www.twitter.com/favicon.ico" class="favicon-img">
        <a href="http://www.twitter.com">twitter.com</a>
    </span><br>

    <!-- overriding the default behavior by applying a specific location to get the favicon from -->
    <span class="favicon-wrapper">
        <img src="http://github.com/subhaze/mootools-external-favicon/raw/master/me.png" class="favicon-img">
        <a class="favicon[http://github.com/subhaze/mootools-external-favicon/raw/master/me.png]" href="http://github.com/subhaze">github.com/subhaze</a>
    </span>

CSS

	#CSS
	/* adjust styling of favicon image */
	.favicon-img {
        height:16px;
        margin-right:4px;
        position:relative;
        top:4px;
        width:16px;
    }
    /* adjust styling of span wrapper if needed */
    .favicon-wrapper {}