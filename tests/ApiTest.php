<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ApiTest extends TestCase
{

  public function testAllContests()
  {
    $this->visit('/api/v1/contests')
    ->see('<body><p>all contest</p></body>');
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
    $this->visit('/api/v1/contest/34')
    ->see('<body><p>contest34</p></body>');
  }

}
