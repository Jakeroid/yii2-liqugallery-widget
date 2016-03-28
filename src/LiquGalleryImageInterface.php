<?php
/**
 * Created by PhpStorm.
 * User: Jakeroid
 * Date: 25-Mar-16
 * Time: 17:30
 */

namespace jakeroid\liqugallerywidget;

/**
 * Interface LiquGalleryImageInterface
 */
interface LiquGalleryImageInterface
{
    /**
     * Method should return ID of image in your system
     * @return string
     */
    public function getId();

    /**
     * Method should return path of your image
     * It will used for display image
     * @return string
     */
    public function getPath();

    /**
     * Method should return true if image is main image for your entity
     * @return boolean
     */
    public function isMain();
}