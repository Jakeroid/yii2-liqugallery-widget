<?php
/**
 * Created by PhpStorm.
 * User: Jakeroid
 * Date: 16-Mar-16
 * Time: 16:41
 */

use jakeroid\liqugallerywidget\LiquGalleryAsset;

/* @var $this yii\web\View */

LiquGalleryAsset::register($this);
?>

<div class="panel panel-default jgallery-widget">
    <div class="panel-heading">
        <button type="button" class="btn btn-default no-focus spoiler-trigger" data-toggle="collapse"><?= Yii::t('app', 'Gallery') ?></button>
    </div>
    <div class="panel-collapse collapse out" id="gallery-panel">
        <div class="panel-body">
            <div class="gallery-files-uploader">
                <input id="gallery-files-input" type="file" multiple>
                <div class="gallery-files-drop-zone">
                    <?= Yii::t('app', 'Drop files or click here for upload') ?>
                </div>
                <div class="gallery-api-error">
                    <?= Yii::t('app', 'Sorry, but your browser not support HTML5 upload') ?>
                </div>
                <div class="gallery-list">
                </div>
            </div>
        </div>
    </div>
</div>
