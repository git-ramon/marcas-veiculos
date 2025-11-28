<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route('login');
});

// Rotas públicas (login, register, etc)
Auth::routes();

Route::post('/force-logout', function () {
    Auth::logout();
    request()->session()->invalidate();
    return response()->json(['ok' => true]);
});


// Rotas protegidas
Route::middleware('auth')->group(function () {

    Route::view('/home', 'home')->name('home');

    Route::get('/marcas', function() {
        return view('app.marcas');
    })->name('marcas');

    Route::get('/modelos', function () {
        return view('app.modelos');
    })->name('modelos');

    Route::get('/gerenciarmodelos', function () {
        return view('app.gerenciarmodelos'); 
    })->name('gerenciarmodelos');
});

