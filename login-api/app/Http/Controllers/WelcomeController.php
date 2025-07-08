<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WelcomeController extends Controller
{
 public function index()
    {
return response()->json([
            'message' => 'Desde Laravel Aldo Hp'
        ]);
    }

}
