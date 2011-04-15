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
    getFavicons: function(classNamePrefix, imgExtensions){
        var baseHost = URI.base.get('host'),
            externalLinks = this.getElements('a[href^="http://"], a[href^="https://"]'),
            imgTypes = imgExtensions || ['ico', 'png', 'gif', 'bmp'],
            classPrefix = classNamePrefix || '';

        externalLinks.each(function(a){
            var alternateLink = $(a).get('data-linkUrl'),
                uri = new URI(a),
                domain, wrapper;

            if(baseHost != uri.get('host')) domain = uri.get('scheme')+'://' + uri.get('host');

            wrapper = new Element('span', {'class':classPrefix + 'favicon-wrapper'}).wraps(a);
            if(alternateLink){
                new Element('img',{
                    'class':    classPrefix + 'favicon-img',
                    'src':      alternateLink
                }).inject(wrapper, 'top');
                return;
            }

            (function recurse(i){
                var args = arguments,
                    favLink = domain +'/favicon.'+ imgTypes[i];
                if(i >= imgTypes.length) return;
                Asset.image(favLink, {
                    onload:   function(){
                        new Element('img', {
                            'class':    classPrefix + 'favicon-img',
                            'src':      favLink
                        }).inject(wrapper,'top');
                    },
                    onerror:  function(){ recurse( ++i ) }
                });
            })(0)
        });
    }
});
