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

  getFavicons: function( imgLayout, className, imgExtensions ) {
    var baseHost = URI.base.get('host'),
        externalLinks = this.getElements( 'a[href^="http://"], a[href^="https://"]' ),
        imgTypes = imgExtensions || ['ico', 'png', 'gif', 'bmp'],
        imgSize = imgLayout || {'width':16,'height':16,'top':'4px','margin-right':'4px'};
    externalLinks.each( function( a ) {
      var alternateLink = $(a).get('class').match(/favicon\[(.+)\]/),
          uri = new URI( a ),
          domain, wrapper;

      if( baseHost != uri.get( 'host' ) ) {
        domain = uri.get('scheme')+'://' + uri.get('host');
        if( className ) a.addClass( className );
      }
      wrapper = (a.style.display == 'block') ? new Element('div') : new Element('span');
      wrapper.wraps( a );
      if( alternateLink ){
        new Element( 'img', {
            'width': imgSize.width,
            'height': imgSize.height,
            'src': alternateLink[1],
            'styles':{'margin-right':'4px', position:'relative', bottom:'-2px'}
        }).inject( wrapper, 'top' );
        return;
      }

      (function( i ){
          var args = arguments,
              favLink;
          if( i >= imgTypes.length ) return;
          favLink = domain +'/favicon.'+ imgTypes[i];
          Asset.image( favLink, {
            onload:   function() {
                new Element('img', {
                    'width':imgSize.width,
                    'height':imgSize.height,
                    'src':favLink,
                    'styles':{
                        'margin-right':'4px',
                        'position':'relative',
                        'top': '3px'
                    }
                }).inject(wrapper,'top');
            },
            onerror:  function() { args.callee( ++i ) }
          });
        }
      )(0)
    });
  }
});
