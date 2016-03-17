/**
 * Created by Jakeroid on 16-Mar-16.
 */

$(document).ready(function() {
    var liquGalleryWidget = $('.liqugallery-widget');
    if (liquGalleryWidget.length > 0) {
        var handlerUrl = $.parseJSON(liquGalleryWidget.data('handler-url'));
        var customParams = $.parseJSON(liquGalleryWidget.data('custom-params'));
        var initialImages = $.parseJSON(liquGalleryWidget.data('initial-images'));

        console.log(handlerUrl);
        console.log(customParams);
        console.log(initialImages);
    }
});