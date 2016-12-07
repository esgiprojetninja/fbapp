<?php

namespace App\Http\Middleware;

use Closure;

class CheckIsAdmin
{
  /**
  * Handle an incoming request.
  *
  * @param  \Illuminate\Http\Request  $request
  * @param  \Closure  $next
  * @return mixed
  */
  public function handle($request, Closure $next)
  {
    /*

    Rajouter ici la verif is Admin

    if ($request->isAdmin == 0) {
      return redirect('home');
    }

    */
    return $next($request);
  }
}
