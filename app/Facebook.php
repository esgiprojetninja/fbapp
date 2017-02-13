<?php

namespace App;

use Facebook\FacebookRequest;

use Illuminate\Http\Request;
use Socialite;

class Facebook
{
    protected $fb;
    protected $fb_app_secret_id;

    function __construct(){
        $this->fb = new \Facebook\Facebook([
            'app_id' => env('FACEBOOK_APP_ID'),
            'app_secret' => env('FACEBOOK_APP_SECRET'),
            'default_graph_version' => env('DEFAULT_GRAPH_VERSION'),
            'fb_app_secret_id' => env('FACEBOOK_APP_SECRET_ID')
        ]);
        $this->fb_app_secret_id = env('FACEBOOK_APP_SECRET_ID');
    }

    public function getAppRoles(){
        return $this->fb->get('/app/roles',$this->fb_app_secret_id);
    }

    public function getAdminMail(){
        $emails = [];
        $data = $this->getAppRoles()->getDecodedBody();
        foreach ($data['data'] as $user) {
            $actualUserData = $this->fb->get('/'.$user['user'].'?fields=email',$this->fb_app_secret_id)->getDecodedBody();
            if(isset($actualUserData['email'])){
                $emails[] = $actualUserData['email'];
            }
        }
        return $emails;
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
