<?php

namespace App\Http\Controllers;
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email'=> $request->email,
            'password' => bcrypt($request->password),
        ]);

        return response()->json([
            'token' => $user->createToken('token')->plainTextToken,
            'user' => $user
        ]);
    }

  public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password'=> 'required'
    ]);

    if (!Auth::attempt($request->only('email', 'password'))) {
        return response()->json(['errors' => ['Credenciales incorrectas']], 422);
    }

    $request->session()->regenerate(); // importante para seguridad

    return response()->json([
        'message' => 'Inicio de sesión exitoso',
        'user' => Auth::user()
    ]);
}

public function logout(Request $request)
{
    Auth::guard('web')->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return response()->json(['message' => 'Sesión cerrada correctamente']);
}


}
