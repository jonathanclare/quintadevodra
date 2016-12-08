window.onload = function () 
{ 
    onScroll();
    on(window, 'scroll resize', debounce(onScroll));
} 

function onScroll()
{
    lazyLoadBackgrounds();
    //highlightActiveSection();
}

function lazyLoadImages () 
{
    // Images.
    var offset = pageOffset().y
    var pageBottom = offset + viewportHeight();
    [].forEach.call(getElements('img[data-src]'), function(img) 
    {
        var imgTop = offset + bounds(img).top;
        if(imgTop <= pageBottom)
        {
            img.setAttribute('src', img.getAttribute('data-src'));
            img.onload = function() 
            {
                img.removeAttribute('data-src');
                img.className += 'loaded';
            }
        }
    });
}

function highlightActiveSection ()
{
    // Images.
    var offset = pageOffset().y
    var pageBottom = offset + viewportHeight();
    [].forEach.call(getElements('div[data-src]'), function(ele) 
    {
        var imgTop = offset + bounds(ele).top;
        if(imgTop <= pageBottom)
        {
            ele.style.backgroundImage = 'url(' + ele.getAttribute('data-src') + ')';
            ele.className += ' loaded';
            ele.removeAttribute('data-src');
        }
    });

}

function lazyLoadBackgrounds () 
{
    // Images.
    var offset = pageOffset().y
    var pageBottom = offset + viewportHeight();
    [].forEach.call(getElements('div[data-src]'), function(ele) 
    {
        var imgTop = offset + bounds(ele).top;
        if(imgTop <= pageBottom)
        {
            ele.style.backgroundImage = 'url(' + ele.getAttribute('data-src') + ')';
            ele.className += ' loaded';
            ele.removeAttribute('data-src');
        }
    });
}

function getElement (selector)
{
    return document.querySelector(selector);
};

function getElements (selector)
{
    return document.querySelectorAll(selector);
};

function addClass (element, className)
{
    ele.className += ' loaded';
}

function removeClass (element, className)
{
    element.className =  element.className.replace(/(?:^|\s)className(?!\S)/g , '');
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

function pageOffset() 
{
    var doc = document.documentElement;
    return {
        x : (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
        y : (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)
    };
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