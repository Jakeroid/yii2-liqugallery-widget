<?php
/**
 * Created by PhpStorm.
 * User: Jakeroid
 * Date: 16-Mar-16
 * Time: 16:44
 */

namespace jakeroid\liqugallerywidget;

use yii\web\AssetBundle;

class LiquGalleryAsset extends AssetBundle
{
    public $sourcePath = '@vendor/jakeroid/yii2-liqugallery-widget/src/assets';
    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap\BootstrapAsset',
        'yii\web\JqueryAsset',
    ];

    public function init()
    {
        //TODO: Make min version of js
        //$this->js[] = YII_DEBUG ? 'js/jgallery.js' : 'js/jgallery.min.js';
        $this->js[] = 'js/liqugallery.js';
        parent::init();
    }
}