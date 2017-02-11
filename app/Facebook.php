<?php

namespace App;

use Illuminate\Http\Request;
use Socialite;

class Facebook
{
    protected $fb_app_id;
    protected $fb_app_secret;
    protected $default_graph_version;
    protected $fb_app_secret_id;

    protected $fb;

    function __construct(){
        $this->fb_app_id = env('FB_APP_ID');
        $this->fb_app_secret = env('FB_APP_SECRET');
        $this->default_graph_version = env('DEFAULT_GRAPH_VERSION');
        $this->fb_app_secret_id =  env('FB_APP_SECRET_ID');
        $this->fb = new \Facebook\Facebook([
            'app_id' => $this->fb_app_id,
            'app_secret' => $this->fb_app_secret,
            'default_graph_version' => $this->default_graph_version,
        ]);
    }

    public function getAppRoles(){
        return $this->fb->get('/app/roles',$this->fb_app_secret_id);
    }

    /**
    * Fetches a ... object
    * @param (int) photo_id, (string) token
    * @return ...
    **/
    public function getPhotoById(int $id, $token){
      $id = (int) $id;
      try {
        $this->fb->setDefaultAccessToken($token);
        $response = $this->fb->get('/'.$id.'?fields=can_tag,can_delete,id,webp_images,from');
        $dataArray = $response->getDecodedBody();
        if ( is_array($dataArray) && !empty($dataArray) )
          return $dataArray;
      } catch(Facebook\Exceptions\FacebookResponseException $e) {
        return false;
      } catch(Facebook\Exceptions\FacebookSDKException $e) {
        return false;
      }
      return false;
    }


}
