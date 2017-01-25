<?php

namespace App;

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

}
