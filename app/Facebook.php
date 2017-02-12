<?php

namespace App;

use Facebook\FacebookRequest;

class Facebook
{
    protected $fb;
    protected $fb_app_secret_id;

    function __construct(){
        $this->fb = new \Facebook\Facebook([
            'app_id' => env('FB_APP_ID'),
            'app_secret' => env('FB_APP_SECRET'),
            'default_graph_version' => env('DEFAULT_GRAPH_VERSION'),
            'fb_app_secret_id' => env('FB_APP_SECRET_ID')
        ]);
        $this->fb_app_secret_id = env('FB_APP_SECRET_ID');
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

}
