Yii2 LiquGallery widget
=====

**The project is abandoned! You can use it at your own risk.**

Simple gallery widget with AJAX upload and main image option.
Could be useful if you want to manage images on the back office side.

How to install?
-----

Just run the following command.

```
composer require jakeroid/yii2-liqugallery-widget
```

How to use?
-----

It is JavaScript wrapped in yii2 widget.
All you need is to create a handler in the controller and specify the path to it.
Here is some example. 

```
    [
        'label' => 'Editor gallery',
        'content' => jakeroid\liqugallerywidget\LiquGalleryWidget::widget([
            'handler_url' => Url::to(['liqugallery-back-office/handle']),
            'custom_params' => [
                LiquGalleryParams::GALLERY_GROUP_ID => ($model->source->gallery) ? $model->source->gallery->id : false,
                LiquGalleryParams::IMAGE_TYPE => \app\models\DbImage::TYPE_EDITOR_IMAGE,
            ]
        ]),
    ],

```