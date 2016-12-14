<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\Auth;

use Closure;

class Admin
{
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  \Closure  $next
    */
    public function handle($request, Closure $next)
        {
        $user = Auth::user();
        if (!$user || !$user->isAdmin()) {
            return response()->json([
              'error' => 'Permission Denied'
          ], 401);
        }
        return $next($request);
    }
}
