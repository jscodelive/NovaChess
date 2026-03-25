<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>LacteoData — Gestión para queserías artesanales</title>
        <meta name="description" content="SaaS para la gestión de queserías artesanales venezolanas. Inventario, ventas, leche y tasas de cambio.">
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    </head>
    <body class="antialiased">
        <div id="app"></div>
    </body>
</html>
