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
            return redirect()->guest('admin/auth/login');
        }
        return $next($request);
    }
}
