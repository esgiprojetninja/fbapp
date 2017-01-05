import AuthApi from "../API/user/AuthApi";

export default class FacebookLoader {

    constructor() {
        this.scope = [
            "public_profile",
            "email"
        ];
    }

    initFbScript() {
        if (!this.scriptPromise) {
            this.scriptPromise = new Promise((resolve, reject) => {
                window.fbAsyncInit = () => {
                    FB.init({
                        appId      : '1200139990052440',
                        cookie: true,
                        xfbml      : true,
                        version    : 'v2.5'
                    });
                    resolve();
                };
                if (typeof FB === "undefined") {
                    ((d, s, id) => {
                        var js, fjs = d.getElementsByTagName(s)[0];
                        if (d.getElementById(id)) return;
                        js = d.createElement(s); js.id = id;
                        js.src = "//connect.facebook.net/es_LA/sdk.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    })(document, 'script', 'facebook-jssdk');
                }
            });
        }
        return this.scriptPromise;
    }

    getLoginStatus(callback) {
        return this.initFbScript().then(() => FB.getLoginStatus(callback));
    }

    checkPermissions(access_token, callback) {
        return this.initFbScript().then(() => FB.api("/me/permissions", {access_token: access_token}, (perms) => {
            let granted = true;
            const permissionsGranted = perms.data.reduce((grant, perm) => {
                if (perm.status === "granted") {
                    grant.push(perm.permission);
                }
                return grant;
            }, []);
            this.scope.map((perm) => {
                let nbGranted = permissionsGranted.filter(grant => grant === perm).length;
                if (nbGranted === 0) {
                    granted = false;
                }
            });
            callback(granted);
        }));
    }

    setPlayerScope (player = false) {
        if(this.scope.length < 4 && player) {
            this.scope = this.scope.concat(["user_photos", "publish_actions"]);
        } else {
            this.scope = [
                "public_profile",
                "email"
            ];
        }
    }

    login(callback) {
        return this.initFbScript().then(() => FB.login(
            (response) => {
                if (response.authResponse) {
                    return FB.api("/me?fields=id,name,email", callback);
                }
            },
            {
                scope: this.scope.join(","),
                auth_type: "rerequest"
            }
        ));
    }

    logout(callback) {
        return this.initFbScript().then(() => FB.logout(callback));
    }

    getMe(callback) {
        return this.initFbScript().then(() => FB.api("/me?fields=id,name,email", callback));
    }
}
