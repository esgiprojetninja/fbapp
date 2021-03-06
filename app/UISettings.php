<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UISettings extends Model
{

    protected $table = "uisettings";
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'main_color',
        'gallery_color',
        'submenu_img',
        'carousel_img',
        'enable_fullscreen'
    ];

    public function setMainColor ($color) {
        $this->main_color = $color;
    }

    public function setGalleryColor ($galleryColor) {
        $this->gallery_color = $galleryColor;
    }

    public function setSubmenuImg ($submenuImg) {
        $this->submenu_img = $submenuImg;
    }

    public function setCarouselImg ($carouselImg) {
        $this->carousel_img = $carouselImg;
    }

    public function setEnableFullscreen ($enableFullscreen) {
        $this->enable_fullscreen = $enableFullscreen;
    }

    public function getMainColor () {
        return $this->main_color;
    }

    public function getGalleryColor () {
        return $this->gallery_color;
    }

    public function getSubmenuImg () {
        return $this->submenu_img;
    }

    public function getCarouselImg () {
        return $this->carousel_img;
    }

    public function getEnableFullscreen () {
        return $this->enable_fullscreen;
    }
}
