<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>FB APP</title>
        <!-- You can use Open Graph tags to customize link previews.
        Learn more: https://developers.facebook.com/docs/sharing/webmasters -->
        <meta property="og:url"           content="http://esgi.ninja/" />
        <meta property="og:type"          content="website" />
        <meta property="og:title"         content="Pardon Maman" />
        <meta property="og:description"   content="Pardon maman est une application de concours photographie lié au tatouage." />
        <meta property="og:image"         content="https://image.noelshack.com/fichiers/2017/07/1487089944-ca-marche.png" />

        <link rel="stylesheet" href="{{ elixir('css/app.css') }}">
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
    </head>
    <body>
        <div id="fbapp"></div>
        <script src="{{ elixir('js/dist/bundle.min.js') }}"></script>
    </body>
</html>
