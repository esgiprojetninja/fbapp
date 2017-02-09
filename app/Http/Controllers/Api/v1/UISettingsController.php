<?php

namespace App\Http\Controllers\Api\v1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controlers\ContestController;
use App\UISettings;
use App\Contest;

class UISettingsController extends Controller
{
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */
    public function index()
    {
        $uiSettings = UISettings::all();
        return response()->json([
            'uiSettings' => $uiSettings
        ]);
    }

    /**
    * Show the form for creating a new resource.
    *
    * @return \Illuminate\Http\Response
    */
    public function create(Request $request)
    {
        //
    }

    /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function store(Request $request)
    {
        if (array_key_exists('id', $request->all())) {
            $uisettings = UISettings::find($request->all()['id']);
            $uisettings->fill($request->all());
        }else {
            $uisettings = new UISettings($request->all());
            $uisettings->setMainColor();
            $uisettings->setGalleryColor();
            $uisettings->setSubmenuImg();
            $uisettings->setCarouselImgArray();
            $uisettings->setEnableFullscreen();
        }
        if ($uisettings->save()) {
            return response()->json([
                'status' => 'ok'
            ]);
        }
    }

    /**
    * Show the form for editing the specified resource.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
    public function edit($id)
    {
        //
    }

    /**
    * Update the specified resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
    public function update(Request $request, $id)
    {
        //
    }

    /**
    * Remove the specified resource from storage.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
    public function destroy($id)
    {
      UISettings::destroy($id);
    }

    /**
    * Show one UiSetting.
    *
    * @return Response
    */
    public function show($id)
    {

    }

}
