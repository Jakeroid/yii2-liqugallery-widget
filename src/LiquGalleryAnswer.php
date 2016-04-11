<?php
/**
 * Created by PhpStorm.
 * User: Jakeroid
 * Date: 25-Mar-16
 * Time: 12:41
 */

namespace jakeroid\liqugallerywidget;

class LiquGalleryAnswer 
{
    const RESULT_OK = 'ok';
    const RESULT_ERROR = 'error';

    /**
     * @var string
     */
    public $result = '';

    /**
     * @var string
     */
    public $message = '';

    /**
     * @var LiquGalleryImageInterface[]
     */
    public $images = [];

    /**
     * Method generating answer for LiquGalleryWidget
     * @return string
     */
    public function render()
    {
        $images = [];

        foreach ($this->images as $image) {
            $temp['id'] = $image->getId();
            $temp['path'] = $image->getPath();
            $temp['isMain'] = $image->isMain();
            $images[] = $temp;
        }

        $render_result = [
            'result' => $this->result,
            'message' => $this->message,
            'images' => $images,
        ];
        
        return json_encode($render_result);
    }
}