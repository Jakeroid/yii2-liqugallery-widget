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
    data-handler-url='<?= base64_encode(json_encode($handler_url)) ?>'
    data-custom-params='<?= base64_encode(json_encode($custom_params)) ?>'
>
    <div class="liqugallery-files-uploader">
        <input id="liqugallery-files-input" type="file" multiple>
        <div class="liqugallery-files-drop-zone liqugallery-files-click-zone">
            <?= Yii::t('liqugallery-widget', 'DROP FILES OR CLICK HERE FOR UPLOAD') ?>
        </div>
        <div class="liqugallery-api-error">
            <?= Yii::t('liqugallery-widget', 'SORRY, BUT YOUR BROWSER NOT SUPPORT HTML5 UPLOAD') ?>
        </div>
        <div class="liqugallery-list">
        </div>
        <div class="liqugallery-templates">
            <div class="liqugallery-element">
                <div class="liqugallery-item-image">
                    <img class="liqugallery-image" src="">
                </div>
                <div class="liqugallery-item-actions">
                    <button type="button" class="liqugallery-item-action-set-main btn-sm btn-primary">
                        <?= Yii::t('liqugallery-widget', 'SET MAIN') ?>
                    </button>
                    <button type="button" class="liqugallery-item-action-delete btn-sm btn-danger">
                        <?= Yii::t('liqugallery-widget', 'DELETE') ?>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
