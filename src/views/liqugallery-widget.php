<?php
/**
 * Created by PhpStorm.
 * User: Jakeroid
 * Date: 16-Mar-16
 * Time: 16:41
 */

use yii\helpers\Html;
use jakeroid\liqugallerywidget\LiquGalleryAsset;
use jakeroid\liqugallerywidget\LiquGalleryParams;

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
            <?= Yii::t('liqugallery-widget', 'DROP_FILES_OR_CLICK_HERE_FOR_UPLOAD') ?>
        </div>
        <div class="liqugallery-api-error">
            <?= Yii::t('liqugallery-widget', 'SORRY_BUT_YOUR_BROWSER_NOT_SUPPORT_HTML5_UPLOAD') ?>
        </div>
        <div class="liqugallery-list">
        </div>
        <div class="liqugallery-templates">
            <div class="liqugallery-element">
                <div class="liqugallery-item-image">
                    <img class="liqugallery-image" src="">
                </div>
                <div class="liqugallery-item-tags">
                    <div class="liqugallery-item-tag-alt form-group">
                        <label class="control-label"><?= Yii::t('liqugallery-widget', 'ALT_TAG_LABEL') ?></label>
                        <input class="form-control liqugallery-item-tag-alt-input" type="text"
                               name="alt-tag">
                        <span class="liqugallery-item-tag-status"
                              data-text-saving="<?= Yii::t('liqugallery-widget', 'TAG_INPUT_TEXT_SAVING') ?>"
                              data-text-saved="<?= Yii::t('liqugallery-widget', 'TAG_INPUT_TEXT_SAVED') ?>"
                              data-text-error="<?= Yii::t('liqugallery-widget', 'TAG_INPUT_TEXT_ERROR') ?>"></span>
                    </div>
                    <div class="liqugallery-item-tag-title form-group">
                        <label class="control-label"><?= Yii::t('liqugallery-widget', 'TITLE_TAG_LABEL') ?></label>
                        <input class="form-control liqugallery-item-tag-title-input" type="text"
                               name="title-tag">
                        <span class="liqugallery-item-tag-status"
                              data-text-saving="<?= Yii::t('liqugallery-widget', 'TAG_INPUT_TEXT_SAVING') ?>"
                              data-text-saved="<?= Yii::t('liqugallery-widget', 'TAG_INPUT_TEXT_SAVED') ?>"
                              data-text-error="<?= Yii::t('liqugallery-widget', 'TAG_INPUT_TEXT_ERROR') ?>"></span>
                    </div>
                </div>
                <div class="liqugallery-item-actions">
                    <button type="button" class="liqugallery-item-action-set-main btn-sm btn-primary"
                            data-disabled-text="<?= Yii::t('liqugallery-widget', 'ALREADY_IS_MAIN') ?>">
                        <?= Yii::t('liqugallery-widget', 'SET_MAIN') ?>
                    </button>
                    <button type="button" class="liqugallery-item-action-delete btn-sm btn-danger">
                        <?= Yii::t('liqugallery-widget', 'DELETE') ?>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
