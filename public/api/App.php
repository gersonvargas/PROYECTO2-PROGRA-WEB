<?php
/**
 * Created by PhpStorm.
 * User: juan
 * Date: 29/05/18
 * Time: 07:33 PM
 */

class App
{
    public function success($output){
        die(json_encode(array(
            "code" => 200,
            "msg" => $output
        )));
    }

    public function error($output){
        die(json_encode(array(
            "code" => 401,
            "msg" => $output
        )));
    }
}