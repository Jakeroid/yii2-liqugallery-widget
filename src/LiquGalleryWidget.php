<?php
/**
 * Created by PhpStorm.
 * User: Jakeroid
 * Date: 16-Mar-16
 * Time: 13:10
 */

namespace jakeroid\liqugallerywidget;

use yii\base\ErrorException;
use yii\base\Widget;

class LiquGalleryWidget extends Widget
{
    public $handler_url;
    public $custom_params = [];
    public $initial_images = [];

    public function init()
    {
        if ($this->handler_url == '') {
            throw new ErrorException('Handler URL didnt set.');
        } else {
            parent::init();
        }
    }

    public function run()
    {
        $this->render('liqugallery-widget', [
            'handler_url' => $this->handler_url,
            'custom_params' => $this->custom_params,
            'initial_images' => $this->initial_images,
        ]);
    }
}