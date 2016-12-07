<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ApiTest extends TestCase
{

  public function testGetAllContests()
  {
    $response = $this->call('GET', 'api/v1/contests');
    $data = json_decode($response);
    $this->assertEquals(false, $data['error']);
  }

  public function testGetContestById()
  {
    $response = $this->call('GET', 'api/v1/contest/32');
    $data = json_decode($response);
    $this->assertEquals(false, $data['error']);
  }

  public function testUpdateContestById()
  {
    $response = $this->call('PUT', 'api/v1/contest/32');
    $data = json_decode($response);
    $this->assertEquals(false, $data['error']);
  }

  public function testCreateContest()
  {
    $response = $this->call('POST', 'api/v1/contests');
    $data = json_decode($response);
    $this->assertEquals(false, $data['error']);
  }

  public function testDeleteContestById()
  {
    $response = $this->call('DELETE', 'api/v1/contest/43');
    $data = json_decode($response);
    $this->assertEquals(false, $data['error']);
  }

}
