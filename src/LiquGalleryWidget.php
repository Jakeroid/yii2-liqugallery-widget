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
    public $initial_images = [];
    public $handler_url;

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
        $this->render('liqugallery-widget');
    }
}