import AuthApi from "../API/user/AuthApi";
import $ from "jquery";

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
            if ( typeof perms.data === "undefined" ) {perms.data=[]}
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
        const url = "/"+album_id+"/photos?fields=id,source,reactions,created_time&limit=4";
        return this.initFbScript().then(() => FB.api(
            url,
            {access_token: access_token},
            callback
        ));
    }

    getMoreAlbumPhotos(link, callback) {
        const url = link;
        return this.initFbScript().then(() => FB.api(
            url,
            callback
        ));
    }

    postBinaryPhoto(acces_token, imgData, msg, callback) {
        // Convert a data URI to blob
        function dataURItoBlob(dataURI) {
            var byteString = atob(dataURI.split(',')[1]);
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], {
                type: 'image/png'
            });
        }
        // Post a BASE64 Encoded PNG Image to facebook
        let blob;
        try {
            blob = dataURItoBlob(imgData);
        } catch (e) {
            return {error: e}
        }
        const fd = new FormData();
        fd.append("access_token", acces_token);
        fd.append("source", blob);
        fd.append("message", msg);
        $.ajax({
            url: "https://graph.facebook.com/me/photos?access_token=" + acces_token,
            type: "POST",
            data: fd,
            processData: false,
            /*######### CHANGE TO false for classic webbrowser: jsonp for app ######## */
            contentType: false,
            cache: false,
        }).done(response => {
            callback(response);
        });
    }

    deleteFbPhoto(photoId, accessToken, callback) {
        const url = "/" + photoId;
        return this.initFbScript().then(() => FB.api(
            url,
            "delete",
            {access_token: accessToken},
            callback
        ));
    }

    sharePhoto(access_token, photo, callback) {
        return FB.ui({
            method : 'share',
            message: 'sortie tout droit du concours sur pardon maman',
            picture: photo.fb_source,
            caption: "Venez voter pour lui",
            description: 'Un participant au concours organisé par "Pardon Maman !"',
            name: 'un participant au concours sur Pardon Maman !',
            href: window.location.href,
            access_token
          },
          (response) => {
              callback(response)
          }
        );
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
