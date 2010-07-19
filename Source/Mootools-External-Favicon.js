/*
---
description: Adds a site's favicon to external links on your page
license: MIT-style
authors: [Michael Russell]
provides: [Element.getFavicons]
requires: 
  core/1.2.4: [Element]
  more/1.2.4.4: [URI, Assets]
...
*/

Element.implement({
  
  getFavicons: function( className ) {
    
    var baseHost = URI.base.get('host');
    var externalLinks = this.getElements( 'a[href^="http://"]' );
    
    externalLinks.each( function( a ) {
      
      var uri = new URI( a );
      
      if( baseHost != uri.get( 'host' ) ) {
        
        //next two vars are used to make sure to get the base host domain and no subdomain
        var uriStrippedArray = uri.get('host').split('.');
        var uriStripped = 'http://www.'+uriStrippedArray[uriStrippedArray.length-2]+'.'+uriStrippedArray[uriStrippedArray.length-1]
        var favicon = new URI( '/favicon.ico', {base: uriStripped});
        
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
      
      /*
       * There is probably a better way to do this... but it works for now until I can think of a way to optimize this process
       */
      Asset.image( favicon, {
        
        onload: function() {
          
          a.setStyle('background-image','url(' + favicon + ')');
        },
        onerror: function() {
          
          favicon = new URI('/favicon.png', { base: uriStripped });
          
          Asset.image( favicon, {
            
            onload: function() {
              
              a.setStyle('background-image','url(' + favicon + ')');
            }.bind( this ),
            
            onerror: function() {
              
              favicon = new URI( '/favicon.bmp', {base: uriStripped});
              Asset.image( favicon, {
                
                onload: function() {
                  
                  a.setStyle('background-image','url(' + favicon + ')');
                }.bind( this ),
                onerror: function() {
                  
                  favicon = new URI( '/favicon.gif', {base: uriStripped});
                  Asset.image( favicon, {
                    
                    onload: function() {
                      
                      a.setStyle('background-image','url(' + favicon + ')');
                    }.bind( this )
                  });
                }
              });
            }
          });
        }
      });
    });
  }
});
