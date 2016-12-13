<?php

namespace App\Http\Controllers\Api\v1;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Socialite;

use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    public function getMe(Request $request)
    {
        $user = Auth::user();
        return response()->json([
            'user' => $user
        ]);
    }
}
