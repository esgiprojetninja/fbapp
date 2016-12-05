<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ApiTest extends TestCase
{

  public function testAllContests()
  {
    $this->visit('/api/v1.3/SEXUEL/contests')
    ->see('Retourne la liste des concours');
    /*
    $this->get('/contests')
    ->seeJsonStructure([
    '*' => [
    'id', 'name', 'email'
  ]
]);
*/
  }

  public function testContestById()
  {
    $this->visit('/api/v1.3/SEXUEL/contest/34')
    ->see('Retourne le concours qui a pour id : 34');
  }

}
