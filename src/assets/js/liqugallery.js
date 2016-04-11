/**
 * Created by Jakeroid on 16-Mar-16.
 */

$(document).ready(function() {
    var liquGalleryWidget = $('#liqugallery-widget');

    if (liquGalleryWidget.length > 0) {
        var handlerUrl = JSON.parse(atob(liquGalleryWidget.data('handler-url')));
        var customParams = JSON.parse(atob(liquGalleryWidget.data('custom-params')));

        var galleryUploader = liquGalleryWidget.find('.liqugallery-files-uploader');

        //checking file api availability
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {

            //if api not available
            galleryUploader.find('*').fadeOut(0);
            galleryUploader.find('.liqugallery-api-error').fadeIn(0);

        } else {

            //controls
            var galleryInput = $('.liqugallery-files-input');
            var galleryDropZone = $('.liqugallery-files-drop-zone');
            var galleryClickZone = $('.liqugallery-files-click-zone');
            var galleryList = $('.liqugallery-list');
            var imageTemplate = $('.liqugallery-templates .liqugallery-element');

            //load current images
            loadImages(handlerUrl, customParams);

            //event for emulated gallery input click
            galleryInput.change(function(event) {
                var files = event.target.files;
                uploadImages(handlerUrl, customParams, files);
                return false;
            });

            //events for gallery drop zone
            galleryDropZone.bind({
                click: function(event) {
                    return false;
                },
                dragenter: function() {
                    return false;
                },
                dragover: function() {
                    $(this).addClass('highlighted');
                    return false;
                },
                dragleave: function() {
                    $(this).removeClass('highlighted');
                    return false;
                },
                drop: function(e) {
                    var dt = e.originalEvent.dataTransfer;
                    uploadImages(handlerUrl, customParams, dt.files);
                    $(this).removeClass('highlighted');
                    return false;
                }
            });

            galleryClickZone.click(function () {
                //emulate file input click
                galleryInput.click();
            });

            //function for add images from JSON to list and attach handlers
            function addImages(handlerUrl, params, images) {
                galleryList.html('');

                for (var i = 0; i < images.length; ++i) {
                    var currentImage = images[i];
                    var currentImageHtml = imageTemplate.clone();
                    currentImageHtml.attr('data-id', currentImage.id);
                    currentImageHtml.find('.liqugallery-image').attr('src', currentImage.path);
                    currentImageHtml.find('.liqugallery-item-actions .liqugallery-item-action-delete').click(function () {
                        var id = $(this).parent('.liqugallery-item-actions').parent('.liqugallery-element').data(id);
                        deleteImage(handlerUrl, params, id);
                    });
                    if (currentImage.isMain) {
                        currentImageHtml.find('.liqugallery-item-action-set-main').remove();
                    } else {
                        currentImageHtml.find('.liqugallery-item-action-set-main').click(function () {
                            var id = $(this).parent('.liqugallery-item-actions').parent('.liqugallery-element').data(id);
                            setMainImage(handlerUrl, params, id);
                        });
                    }
                    galleryList.append(currentImageHtml);
                }
            }

            //function for upload images
            function uploadImages(handlerUrl, params, images) {
                //creating new form data
                var formData = new FormData();

                //adding yii2  csrf param
                formData.append('_csrf', yii.getCsrfToken());

                //adding action type
                formData.append('action', 'upload-images');

                //adding images to form
                for (var i = 0, image; image = images[i]; ++i) {
                    formData.append('images[' + i + ']', image);
                }

                //adding custom params
                for (var key in params){
                    if (params.hasOwnProperty(key)) {
                        formData.append(key, params[key]);
                    }
                }

                //setting handlers and send request
                var xhr = new XMLHttpRequest();
                xhr.open('POST', handlerUrl, true);
                xhr.onload = function(event) {
                    var answer = JSON.parse(event.currentTarget.responseText);
                    if (answer.result == 'error') {
                        alert(answer.message);
                    } else {
                        addImages(handlerUrl, params, answer.images);
                    }
                };
                xhr.onerror = function(event) {
                    alert('Connection with server has been lost.');
                };
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                xhr.send(formData);
            }

            //function for loading images
            function loadImages (handlerUrl, params) {
                //adding action
                var requestParams = {
                    action : 'get-images'
                };

                //adding custom params
                for (var key in params){
                    if (params.hasOwnProperty(key)) {
                        requestParams[key] = params[key];
                    }
                }

                $.post(handlerUrl, requestParams)
                    .done(function (data) {
                        var answer = JSON.parse(data);
                        if (answer.result == 'error') {
                            alert(answer.message);
                        } else {
                            addImages(handlerUrl, params, answer.images);
                        }
                    })
                    .fail(function () {
                        alert('Connection with server has been lost.');
                    });
            }

            //function for delete image
            function deleteImage(handlerUrl, params, id) {
                var requestParams = {
                    action : 'delete-image',
                    image_id : id
                };

                //adding custom params
                for (var key in params){
                    if (params.hasOwnProperty(key)) {
                        requestParams[key] = params[key];
                    }
                }

                $.post(handlerUrl, requestParams)
                    .done(function(data) {
                        var answer = JSON.parse(data);
                        if (answer.result == 'error') {
                            alert(answer.message);
                        } else {
                            addImages(handlerUrl, params, answer.images);
                        }
                    })
                    .fail(function () {
                        alert('Connection with server has been lost.');
                    });
            }

            //function for set main image
            function setMainImage(handlerUrl, params, id) {
                var requestParams = {
                    action : 'set-main-image',
                    image_id : id
                };

                //adding custom params
                for (var key in params){
                    if (params.hasOwnProperty(key)) {
                        requestParams[key] = params[key];
                    }
                }

                $.post(handlerUrl, requestParams)
                    .done(function(data) {
                        var answer = JSON.parse(data);
                        if (answer.result == 'error') {
                            alert(answer.message);
                        } else {
                            addImages(handlerUrl, params, answer.images);
                        }
                    })
                    .fail(function () {
                        alert('Connection with server has been lost.');
                    });
            }
        }
    }
});