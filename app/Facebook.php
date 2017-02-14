<?php

namespace App;

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

    public function getProfileIconPic($token){
        $this->fb->setDefaultAccessToken($token);
        $profileIcon = $this->fb->get('/me?fields=picture')->getDecodedBody()['picture']['data'];
        return empty($profileIcon['url']) ? false : $profileIcon['url'];
    }

    /**
    * Get a generic view of what the post's data will look like when a user participates to a contest
    * @return array
    */
    public static function getPublishArray($photo_source, $contest_title){
        return array(
            'message' => 'Je participe au concours '.$contest_title.'. Venez voter pour moi !',
            'picture' => $photo_source,
            'name' => "Ma participation à ".$contest_title,
            'description' => "",
            'caption' => "Pardonne moi maman",
            'link' => env('FB_APP_LINK'),
        );
    }

    /**
    * Posts a message on a user's wall
    * @param
    *
    **/
    public function publishParticipationMessage($token, $photo_source, $contest_title){
        $this->fb->setDefaultAccessToken($token);
        $attachment = Facebook::getPublishArray($photo_source, $contest_title);
        try {
            return $res = $this->fb->post('/me/feed/', $attachment)->getDecodedBody()['id'];
        } catch (Exception $e){
            return false;
        }
    }

    /**
    * Posts a message on a user's wall after contest
    * @param
    *
    **/
    public function publishParticipationMessageAfterContest($token, $fb_id, $message, $photo_source){
        $this->fb->setDefaultAccessToken($token);
        $params = [
            "message" => $message,
            "link" => env('FB_APP_LINK'),
            "picture" => $photo_source,
            "name" => "Résultat concours - Pardon Maman",
            "description" => "",
            "caption" => "Pardonne moi maman"
        ];
        try {
            $res = $this->fb->post("/".$fb_id."/feed",$params, $this->fb_app_secret_id );
        } catch (Exception $e){
            echo $e->getMessage();
        }
    }
}
