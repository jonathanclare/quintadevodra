window.onload = function () 
{ 
    onScroll();
    on(window, 'scroll resize', debounce(onScroll));
} 

function onScroll()
{
    lazyLoadBackgrounds();
}

// Lazy Load.
function lazyLoadSlides () 
{
    [].forEach.call(document.querySelectorAll('.modal img[data-src]'), function(img) 
    {
        img.setAttribute('src', img.getAttribute('data-src'));
        img.onload = function() 
        {
            img.removeAttribute('data-src');
        }
    });
}

function lazyLoadBackgrounds () 
{
    var buffer = viewportHeight(); // The height above the image at which it starts to load - so images start to load just before scrolled into view.

    [].forEach.call(document.querySelectorAll('.img-lazy-load[data-src]'), function(elt) 
    {
        if((offset(elt) - buffer) <= pageBottomOffset())
        {
            var src = elt.getAttribute('data-src');
            if (elt.nodeName == 'IMG')
            {
                elt.setAttribute('src', src);
                elt.onload = function() 
                {
                    elt.removeAttribute('data-src');
                    addClass(elt, 'img-lazy-load-complete');
                }
            }
            else
            {
                var img = document.createElement('img'); 
                img.setAttribute('src', src);
                img.onload = function() 
                {
                    elt.style.backgroundImage = 'url(' + src + ')';
                    elt.removeAttribute('data-src');
                    addClass(elt, 'img-lazy-load-complete');
                }
            }

            // Add click to open slideshow.
            (function (_src) {
                on(elt, 'click', function(e)
                {
                    openSlideShow(_src);
                });
            })(src);
        }
    });
}

// Slideshow.
function openSlideShow(src)
{
    addClass(document.body, 'hide-scrollbars');
    lazyLoadSlides();
    var slideshow = document.querySelector('#slideshow');

    if (src !== undefined)
    {
        var activeSlide = slideshow.querySelector('.modal-slide-active');
        var nextSlide = slideshow.querySelector('img[src="'+src+'"], img[data-src="'+src+'"]').parentElement.parentElement;
        addClass(nextSlide, 'modal-slide-active');
        removeClass(activeSlide, 'modal-slide-active');
    }

    addClass(slideshow, 'modal-active');
}
function closeSlideShow()
{
    removeClass(document.body, 'hide-scrollbars');
    var slideshow = document.querySelector('#slideshow');
    removeClass(slideshow, 'modal-active');
}
function nextSlide()
{
    var slideshow = document.querySelector('#slideshow');
    var activeSlide = slideshow.querySelector('.modal-slide-active');
    var nextSlide = (activeSlide.nextElementSibling != null ? activeSlide.nextElementSibling : activeSlide.parentNode.firstElementChild);
    addClass(nextSlide, 'modal-slide-active');
    removeClass(activeSlide, 'modal-slide-active');
}
function prevSlide()
{
    var slideshow = document.querySelector('#slideshow');
    var activeSlide = slideshow.querySelector('.modal-slide-active');
    var prevSlide = (activeSlide.previousElementSibling != null ? activeSlide.previousElementSibling : activeSlide.parentNode.lastElementChild);
    addClass(prevSlide, 'modal-slide-active');
    removeClass(activeSlide, 'modal-slide-active');
}

// Util functions.
function addClass (element, className)
{
    element.className += ' ' + className;
}

function removeClass (element, className)
{
    element.className = element.className.replace(new RegExp('(?:^|\\s)'+ className + '(?:\\s|$)'), ' ');
}

function hasClass (element, className)
{
    return element.className.match(/(?:^|\s)className(?!\S)/);
}

function on(element, types, listener)
{
    var arrTypes = types.split(' ');
    for (var i = 0; i < arrTypes.length; i++)  
    {
        var type = arrTypes[i].trim();
        element.addEventListener(type, listener);
    }
}

function bounds(element) 
{
    return element.getBoundingClientRect();
}

function viewportHeight() 
{
    return document.documentElement.clientHeight;
}

function pageTopOffset() 
{
    var doc = document.documentElement;
    return {
        x : (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
        y : (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)
    };
}

function pageBottomOffset() 
{
    return pageTopOffset().y + viewportHeight();
}

function offset(element) 
{
    return pageTopOffset().y + bounds(element).top;
}

function debounce(func, wait, immediate) 
{
    var timeout;
    return function() 
    {
        var me = this, args = arguments;
        var later = function() 
        {
            timeout = null;
            if (!immediate) func.apply(me, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait || 250);
        if (callNow) func.apply(me, args);
    };
};