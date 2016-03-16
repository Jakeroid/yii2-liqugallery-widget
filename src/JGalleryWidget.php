<?php
/**
 * Created by PhpStorm.
 * User: Jakeroid
 * Date: 16-Mar-16
 * Time: 13:10
 */

namespace jakeroid\jgallerywidget;

use yii\base\Widget;

class JGalleryWidget extends Widget
{
    public $initial_images = [];

    public function init()
    {
        parent::init();
    }

    public function run()
    {
        $this->render('jgallery-widget');
    }
}