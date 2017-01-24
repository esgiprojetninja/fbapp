<?php

namespace App;

use Illuminate\Http\Request;
use Socialite;

class Facebook
{
    protected $fb_app_id = '1200139990052440';
    protected $fb_app_secret = '7ed0f55fd08612a805b851fa6fbde893';
    protected $default_graph_version = 'v2.8';
    protected $fb_app_secret_id =  "1200139990052440|sIs-ANSRKPtTyImEdl68B8P56ZI";

    protected $fb;

    function __construct(){
        $this->fb = new \Facebook\Facebook([
            'app_id' => $this->fb_app_id,
            'app_secret' => $this->fb_app_secret,
            'default_graph_version' => $this->default_graph_version,
        ]);
    }

    public function getAppRoles(){
        return $this->fb->get('/app/roles',$this->fb_app_secret_id);
    }

    public function getPhotoById(int $id, $token){
      $id = (int) $id;
      // $token_url = "https://graph.facebook.com/oauth/access_token?"
      // . "client_id=" . $this->fb_app_id .
      // . "&client_secret=" . $this->fb_app_secret . "&code=" . $code;
      // $response = file_get_contents($token_url);
      $photo = Socialite::driver('facebook')
        ->with([
          '/'.$id.'?fields=can_tag,can_delete,id,webp_images,from'
        ])->userFromToken($token);
      return $photo;

      // get token
      // return $this->fb->get(
      //   $this->fb_app_secret_id,
      //   'GET',
      //   'me/'.$id.'?fields=can_tag,can_delete,id,webp_images,from'
      // );
    }


}
