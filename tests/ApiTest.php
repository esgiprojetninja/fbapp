<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ApiTest extends TestCase
{

  public function testGetAllContests()
  {
    $this->get('/api/v1/contests')
    ->seeJson([
      "error"=> false,
      "response"=> "[GET] show all contests",
      "status_code"=> 200
    ]);
  }

  public function testGetContestById()
  {
    $this->get('/api/v1/contest/32')
    ->seeJson([
      "error"=> false,
      "response"=> "[GET] show one contest by id",
      "status_code"=> 200
    ]);
  }

  public function testUpdateContestById()
  {
    $this->put('/api/v1/contest/32')
    ->seeJson([
      'error' => false,
      'response' => "[PUT] update one contest by id",
      'status_code' => 200
    ]);
  }

  public function testCreateContest()
  {
    $this->post('/api/v1/contest')
    ->seeJson([
      "error"=> false,
      "response"=> "[POST] contest created",
      "status_code"=> 200
    ]);
  }

  public function testDeleteContestById()
  {
    $this->delete('/api/v1/contest/32')
    ->seeJson([
      "error"=> false,
      "response"=> "[DELETE] Delete one contest by id",
      "status_code"=> 200
    ]);
  }

}
