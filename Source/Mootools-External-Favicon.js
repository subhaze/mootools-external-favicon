/*
---

name: Element.getFavicons

description: Adds a site's favicon to external links on your page

license: MIT-style

requires: 
  - Core/Element
  - More/URI
  - More/Assets

provides: [Element.getFavicons]

authors: [Michael Russell]

...
*/

Element.implement({
  
  getFavicons: function( className, imgExtensions ) {
    
    var baseHost = URI.base.get('host'),
        externalLinks = this.getElements( 'a[href^="http://"], a[href^="https://"]' ),
        imgTypes = imgExtensions || ['ico', 'png', 'gif', 'bmp'];
    
    externalLinks.each( function( a ) {
      var alternateLink = $(a).get('class').match(/favicon\[(.+)\]/),
          uri = new URI( a );
          
      if( baseHost != uri.get( 'host' ) ) {
        var domain = uri.get('scheme')+'://' + uri.get('host');
            
        if( className ) {
          a.addClass( className )
        } else {
          a.setStyles({
            'background-repeat':    'no-repeat',
            'background-position':  '3px 50%',
            'padding':              '5px 0 6px 25px'
          });
        }
        
      }
      
      if( alternateLink ){
        $(a).setStyle( 'background-image', 'url(' + alternateLink[1] +')' );
        return;
      }
        
      (function( i ){
          var args = arguments,
              favLink;
          
          if( i >= imgTypes.length ) return;
          
          favLink = domain +'/favicon.'+ imgTypes[i];
          
          Asset.image( favLink, {
            onload:   function() { a.setStyle( 'background-image', 'url(' + favLink + ')'); },
            onerror:  function() { args.callee( ++i ) }
          });
        }
      )(0)
    });
  }
});
