<?php

namespace App\Http\Controllers;

use App\Models\Marca;
use App\Models\Modelo;
use App\Models\User;

class DashboardController extends Controller
{
    public function indicadores()
    {
        return response()->json([
            'marcas' => Marca::count(),
            'modelos' => Modelo::count(),
            'usuarios' => User::count()
        ]);
    }
}

