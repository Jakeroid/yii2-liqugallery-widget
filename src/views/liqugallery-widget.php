<?php
/**
 * Created by PhpStorm.
 * User: Jakeroid
 * Date: 16-Mar-16
 * Time: 16:41
 */

use jakeroid\liqugallerywidget\LiquGalleryAsset;

/* @var $this yii\web\View */
/* @var $handler_url string */
/* @var $custom_params [] */
/* @var $initial_images \jakeroid\liqugallerywidget\LiquGalleryImageInterface[] */

LiquGalleryAsset::register($this);
?>

<div
    id="liqugallery-widget"
    class="panel panel-default"
    data-handler-url='<?= base64_encode(json_encode($handler_url)) ?>'
    data-custom-params='<?= base64_encode(json_encode($custom_params)) ?>'
>
    <div class="panel-heading">
        <button type="button" class="btn btn-default no-focus spoiler-trigger" data-toggle="collapse"><?= Yii::t('app', 'Gallery') ?></button>
    </div>
    <div class="panel-collapse collapse out liqugallery-main-panel">
        <div class="panel-body liqugallery-files-drop-zone">
            <div class="liqugallery-files-uploader">
                <input id="liqugallery-files-input" type="file" multiple>
                <div class="liqugallery-files-click-zone">
                    <?= Yii::t('app', 'Drop files or click here for upload') ?>
                </div>
                <div class="liqugallery-api-error">
                    <?= Yii::t('app', 'Sorry, but your browser not support HTML5 upload') ?>
                </div>
                <div class="liqugallery-list">
                </div>
                <div class="liqugallery-templates">
                    <div class="liqugallery-element">
                        <div class="liqugallery-item-image">
                            <img class="liqugallery-image" src="">
                        </div>
                        <div class="liqugallery-item-actions">
                            <button type="button" class="liqugallery-item-action-set-main btn-sm btn-primary">Сделать главной</button>
                            <button type="button" class="liqugallery-item-action-delete btn-sm btn-danger">Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
