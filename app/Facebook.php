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

    /**
     * Posts a message on a user's wall
     * @param
     *
    **/
    public function publishParticipationMessage($token, $photo_source, $contest_title){
        $this->fb->setDefaultAccessToken($token);
        $attachment = array(
            'message' => 'Je participe au concours "'.$contest_title . '" sur ' . env('APP_URL') . ' . Votez pour moi !',
            'picture' => $photo_source,
            'name' => "Ma participation à ".$contest_title,
            'description' => "",
            'caption' => "Pardonne moi maman",
            'link' => $photo_source,
        );
        try {
            return $res = $this->fb->post('/me/feed/', $attachment)->getDecodedBody()['id'];
        } catch (Exception $e){
            return false;
        }
    }
}
