/**
 * Created by Jakeroid on 16-Mar-16.
 */

$(document).ready(function () {
    var liquGalleryWidget = $('#liqugallery-widget');

    //if liqugallery available on this page
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
            var galleryInput = $('#liqugallery-files-input');
            var galleryDropZone = $('.liqugallery-files-drop-zone');
            var galleryList = $('.liqugallery-list');
            var imageTemplate = $('.liqugallery-templates .liqugallery-element');

            //function for default post request
            function defaultPostRequest(url, requestParams, customParams, successCallback, errorCallback, isNoNeedRender) {

                var resultParams = {};

                //adding request params
                for (var key in requestParams) {
                    if (requestParams.hasOwnProperty(key)) {
                        resultParams[key] = requestParams[key];
                    }
                }

                //adding custom params
                for (var key in customParams) {
                    if (customParams.hasOwnProperty(key)) {
                        resultParams[key] = customParams[key];
                    }
                }

                //post request
                $.post(url, resultParams)
                    .done(function (data) {
                        var answer = JSON.parse(data);
                        if (answer.result == 'error') {
                            if (errorCallback !== undefined) {
                                errorCallback();
                            } else {
                                alert(answer.message);
                            }
                        } else {
                            if (successCallback !== undefined) {
                                successCallback();
                            }
                            if (isNoNeedRender !== true) {
                                renderImages(answer.images, handlerUrl, customParams);
                            }
                        }
                    })
                    .fail(function () {
                        if (errorCallback !== undefined) {
                            errorCallback();
                        } else {
                            alert('Connection with server has been lost.');
                        }
                    });
            }

            //function for upload images
            function uploadImages(handlerUrl, customParams, images) {
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
                for (var key in customParams) {
                    if (customParams.hasOwnProperty(key)) {
                        formData.append(key, customParams[key]);
                    }
                }

                //setting handlers and send request
                var xhr = new XMLHttpRequest();
                xhr.open('POST', handlerUrl, true);
                xhr.onload = function (event) {
                    var answer = JSON.parse(event.currentTarget.responseText);
                    if (answer.result == 'error') {
                        alert(answer.message);
                    } else {
                        renderImages(answer.images, handlerUrl, customParams);
                    }
                };
                xhr.onerror = function (event) {
                    alert('Connection with server has been lost.');
                };
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                xhr.send(formData);
            }

            //function for loading images
            function loadImages(handlerUrl, customParams) {
                var requestParams = {
                    action: 'get-images'
                };
                defaultPostRequest(handlerUrl, requestParams, customParams);
            }

            //function for delete image
            function deleteImage(handlerUrl, customParams, id) {
                var requestParams = {
                    action: 'delete-image',
                    image_id: id
                };
                defaultPostRequest(handlerUrl, requestParams, customParams);
            }

            //function for set main image
            function setMainImage(handlerUrl, customParams, id) {
                var requestParams = {
                    action: 'set-main-image',
                    image_id: id
                };
                defaultPostRequest(handlerUrl, requestParams, customParams);
            }

            //function for save tags value
            function saveTagValue(handlerUrl, customParams, id, tagName, tagValue, successCallback, errorCallback) {
                var requestParams = {
                    action: 'save-tag',
                    image_id: id,
                    tag_name: tagName,
                    tag_value: tagValue
                };
                defaultPostRequest(handlerUrl, requestParams, customParams, successCallback, errorCallback, true);
            }

            //function for change tag input status by span
            function changeTagSpanStatus(element, status) {
                var statusText = '';
                if (status == 'saving') {
                    statusText = element.data('text-saving');
                } else if (status == 'saved') {
                    statusText = element.data('text-saved');
                } else if (status == 'error') {
                    statusText = element.data('text-error');
                }

                element.text(statusText);
                element.removeClass('saving saved error');
                element.addClass(status);
            }

            function tagInputKeyUpEvent(element, tagName, timeoutsObject) {
                //variables
                var galleryElement = element.parents('.liqugallery-element');
                var spanStatus = element.siblings('.liqugallery-item-tag-status');
                var currId = galleryElement.data('id');
                var taskId = 'save-tag-' + tagName + '-' + currId;
                var value = element.val();

                changeTagSpanStatus(spanStatus, 'saving');

                //if timeout already exists it should be removed
                if (timeoutsObject[taskId] !== undefined) {
                    clearTimeout(timeoutsObject[taskId]);
                }

                //create timeout saving function
                timeoutsObject[taskId] = setTimeout(function () {
                    saveTagValue(handlerUrl, customParams, currId, tagName, value,
                        function () {
                            changeTagSpanStatus(spanStatus, 'saved')
                        },
                        function () {
                            changeTagSpanStatus(spanStatus, 'error')
                        }
                    );
                }, 2000);
            }

            //function for add images from JSON to list and attach handlers
            function renderImages(images, handlerUrl, customParams) {
                //clear gallery list
                galleryList.html('');

                //timeouts objects
                var timeoutsObject = {};

                //for all images
                for (var i = 0; i < images.length; ++i) {
                    var currentImage = images[i];
                    var currentImageHtml = imageTemplate.clone();
                    currentImageHtml.attr('data-id', currentImage.id);
                    currentImageHtml.find('.liqugallery-image').attr('src', currentImage.path);

                    //for alt tag
                    var altTagInput = currentImageHtml.find('input.liqugallery-item-tag-alt-input');
                    altTagInput.val(currentImage.altTag);
                    altTagInput.keyup(function () {
                        tagInputKeyUpEvent($(this), 'alt', timeoutsObject);
                    });

                    //for title tag
                    var titleTagInput = currentImageHtml.find('input.liqugallery-item-tag-title-input');
                    titleTagInput.val(currentImage.titleTag);
                    titleTagInput.keyup(function () {
                        tagInputKeyUpEvent($(this), 'title', timeoutsObject);
                    });

                    //set delete button handler
                    currentImageHtml.find('.liqugallery-item-actions .liqugallery-item-action-delete').click(function () {
                        var id = $(this).parent('.liqugallery-item-actions').parent('.liqugallery-element').data(id);
                        deleteImage(handlerUrl, customParams, id);
                    });

                    //set main button behavior
                    var buttonSetMainImage = currentImageHtml.find('.liqugallery-item-action-set-main');
                    if (currentImage.isMain) {
                        buttonSetMainImage.addClass('disabled');
                        buttonSetMainImage.text(buttonSetMainImage.data('disabled-text'));
                    } else {
                        buttonSetMainImage.click(function () {
                            var id = $(this).parent('.liqugallery-item-actions').parent('.liqugallery-element').data(id);
                            setMainImage(handlerUrl, customParams, id);
                        });
                    }

                    galleryList.append(currentImageHtml);
                }
            }

            //event for emulated gallery input click
            galleryInput.change(function (event) {
                var files = event.target.files;
                uploadImages(handlerUrl, customParams, files);
                return false;
            });

            //events for gallery drop zone
            galleryDropZone.bind({
                click: function (event) {
                    galleryInput.click();
                },
                dragenter: function () {
                    return false;
                },
                dragover: function () {
                    $(this).addClass('highlighted');
                    return false;
                },
                dragleave: function () {
                    $(this).removeClass('highlighted');
                    return false;
                },
                drop: function (e) {
                    var dt = e.originalEvent.dataTransfer;
                    uploadImages(handlerUrl, customParams, dt.files);
                    $(this).removeClass('highlighted');
                    return false;
                }
            });

            //load current images
            loadImages(handlerUrl, customParams);
        }
    }
});