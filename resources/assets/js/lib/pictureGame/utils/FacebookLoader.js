import AuthApi from "../API/user/AuthApi";

export default class FacebookLoader {

    constructor() {
        this.scope = [
            "public_profile",
            "email"
        ];
        this.playerScope = [
            "user_photos", 
            "publish_actions"
        ];
        this.checkPermissions = this.checkPermissions.bind(this);
        this.setPlayerScope = this.setPlayerScope.bind(this);
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
        if( player ) {
            if ( this.scope.filter( curScope => this.playerScope.indexOf(curScope) > -1 ).length !== this.playerScope.length ){
                this.scope = this.scope.concat(this.playerScope);
            }
        } else {
            this.scope = [
                "public_profile",
                "email"
            ];
        }
        this.scope = this.scope.filter( (item, pos) => this.scope.indexOf(item) == pos);
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

    getMyPictures (access_token, link, callback) {
        const url = link ? link : "/me/photos?fields=images,link&type=uploaded";
        return this.initFbScript().then(() => FB.api(
            url,
            {access_token: access_token},
            callback
        ));
    }

    getMyAlbums (access_token, callback) {
        const url = "/me/albums";
        return this.initFbScript().then(() => FB.api(
            url,
            (response) => {
                if (response.error) {
                    callback(response)
                } else {
                    const formatedAlbums = [];
                    const albumsToTreat = response.data.length;
                    let albumsTreated = 0;
                    const finalCallBack = (albumCoverData) => {
                        const treatedAlbum = response.data.filter( (a) => a.id === albumCoverData.albId )[0];
                        if ( !albumCoverData.res.hasOwnProperty("error") ) {
                            treatedAlbum.cover = albumCoverData.res.data;
                        }
                        formatedAlbums.push(treatedAlbum);
                        albumsTreated++;
                        if ( albumsTreated === albumsToTreat ) {
                            response.data = formatedAlbums;
                            callback(response)
                        }
                    }
                    response.data.map( (alb, key) => {
                        this._getAlbumCover(access_token, alb.id)
                        .then((albCoverResponse)=>finalCallBack(albCoverResponse))
                    });
                }
            },
            {access_token: access_token}
        ));
    }

    getAlbumPhotos(access_token, album_id, callback) {
        const url = "/"+album_id+"/photos?fields=link,source";
        return this.initFbScript().then(() => FB.api(
            url,
            {access_token: access_token},
            callback
        ));
    }

    /* No direct access to this method, it is "private" */
    _getAlbumCover (access_token, album_id) {
        return new Promise ((resolve, reject) => {
            const url = "/"+ album_id +"/picture";
            this.initFbScript().then(() => FB.api(
                url,
                (res) => {resolve({res, albId: album_id})},
                {access_token: access_token}
            ));
        });
    }
}
