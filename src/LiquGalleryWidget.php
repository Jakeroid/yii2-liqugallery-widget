<?php
/**
 * Created by PhpStorm.
 * User: Jakeroid
 * Date: 16-Mar-16
 * Time: 13:10
 */

namespace jakeroid\liqugallerywidget;

use Yii;
use yii\base\ErrorException;
use yii\base\Widget;

class LiquGalleryWidget extends Widget
{
    public $handler_url;
    public $custom_params = [];

    public function init()
    {
        $i18n = [
            'class' => 'yii\i18n\PhpMessageSource',
            'basePath' => __DIR__ . DIRECTORY_SEPARATOR . '/messages',
            'forceTranslation' => true,
        ];

        Yii::$app->i18n->translations['liqugallery-widget'] = $i18n;
        
        if ($this->handler_url == '') {
            throw new ErrorException(Yii::t('liqugallery-widget', 'HANDLER URL DID NOT SET') . '.');
        } else {
            parent::init();
        }
    }

    public function run()
    {
        return $this->render('liqugallery-widget', [
            'handler_url' => $this->handler_url,
            'custom_params' => $this->custom_params,
        ]);
    }
}