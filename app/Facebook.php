<?php

namespace App;

class Facebook
{
    protected $fb_app_id = FB_APP_ID;
    protected $fb_app_secret = FB_APP_SECRET;
    protected $default_graph_version = DEFAULT_GRAPH_VERSION;
    protected $fb_app_secret_id =  FB_APP_SECRET_ID;

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

}
