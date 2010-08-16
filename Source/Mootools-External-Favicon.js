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
    
    var baseHost = URI.base.get('host');
    var externalLinks = this.getElements( 'a[href^="http://"]' );
    var imgTypes = imgExtensions || ['ico', 'png', 'gif', 'bmp'];
    
    
    externalLinks.each( function( a ) {
      
      var alternateLink = $(a).get('class').match(/favicon\[(.+)\]/);
      
      var uri = new URI( a );
      
      if( baseHost != uri.get( 'host' ) ) {
        
        var domain = 'http://' + uri.get('host');
        var favicon = new URI( '/favicon.ico', {base: domain});
       
        if( className ) {
          
          a.addClass( className );
        }else {
          
          a.setStyles({
            
            'background-repeat':    'no-repeat',
            'background-position':  '3px 50%',
            'padding':              '5px 0 6px 25px'
          });
        }
      }
      
      if( alternateLink ) {
        
        $(a).setStyle( 'background-image', 'url(' + alternateLink[1] +')' );
        return;
      }
      (
        function( i ){
          
          var args = arguments;
          
          if( i >= imgTypes.length ) return;
          
          favicon = new URI( '/favicon.'+imgTypes[i], {base: domain} );
          
          Asset.image( favicon, {
            
            onload: function() {
              
              a.setStyle( 'background-image', 'url(' + favicon + ')');
            },
            onerror: function() {
              
              args.callee( ++i );
            }
          });
        }
      )(0)
    });
  }
});
