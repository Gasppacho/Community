<!DOCTYPE HTML>
<html>
	<head>
		<!-- App Title -->
		<title>Community</title>

		<!-- Metadata -->
		<meta charset="utf-8"/>

		<!-- IE compatibility -->
		<meta http-equiv="X-UA-Compatible" content="chrome=1,IE=Edge">

		<!-- Mobile compatibility -->
		<meta name="format-detection" content="telephone=no">
		<meta name="HandheldFriendly" content="true" />
		<meta name="robots" content="noindex,nofollow" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black" />
		<meta name="apple-mobile-web-app-title" content="Phaser App">
		<meta name="viewport" content="initial-scale=1 maximum-scale=1 user-scalable=0 minimal-ui" />

		<!-- Icons -->
		<!-- Desktop -->
		<link rel="shortcut icon" href="icons/favicon.ico" type="image/x-icon" />

		<!-- Mobile --> 
		<!-- non-retina iPhone pre iOS 7 -->
		<link rel="apple-touch-icon" sizes="57x57" href="icons/app_icon_57x57.png">
		<link rel="apple-touch-icon" sizes="60x60" href="icons/app_icon_60x60.png">
		<!-- non-retina iPad pre iOS 7 -->
		<link rel="apple-touch-icon" sizes="72x72" href="icons/app_icon_72x72.png">
		<!-- non-retina iPad iOS 7 -->
		<link rel="apple-touch-icon" sizes="76x76" href="icons/app_icon_76x76.png">
		<!-- retina iPhone pre iOS 7 -->
		<link rel="apple-touch-icon" sizes="114x114" href="icons/app_icon_114x114.png">
		<!-- retina iPhone iOS 7 -->
		<link rel="apple-touch-icon" sizes="120x120" href="icons/app_icon_120x120.png">
		<!-- retina iPad pre iOS 7 -->
		<link rel="apple-touch-icon" sizes="144x144" href="icons/app_icon_144x144.png">
		<!-- retina iPad iOS 7 -->
		<link rel="apple-touch-icon" sizes="152x152" href="icons/app_icon_152x152.png">
		<link rel="apple-touch-icon" sizes="256x256" href="icons/app_icon_256x256.png">
		<link rel="apple-touch-icon" sizes="512x512" href="icons/app_icon_512x512.png">
		<link rel="apple-touch-icon" sizes="1024x1024" href="icons/app_icon_1024x1024.png">

		<!-- Including stylesheets -->
		<link rel="stylesheet" type="text/css" href="css/normalize.css" charset="utf-8" />
		<link rel="stylesheet" type="text/css" href="css/stylesheet.css" charset="utf-8" />

		<!-- Including Phaser -->
		<script type="text/javascript" src="src/lib/phaser.min.js"></script>

		<!-- Loading all our javascript files -->
		<script type="text/javascript" src="src/loader.js"></script>
		<script type="text/javascript" src="src/movingEntities.js"></script>
		<script type="text/javascript" src="src/statistiques.js"></script>
		<script type="text/javascript" src="src/boot.js"></script>


	</head>
	<body>
		<!-- Game content -->
		<div id="game"></div>
		<!-- Orientation on the mobile devices -->
		<div id="orientation"></div>

		<!-- Entry point of the application -->
		<script type="text/javascript">

			(function() {
				// new phaser game, canvas generated in div game
				//var game = new Phaser.Game(1024, 512, Phaser.CANVAS, 'game');
				var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');
				// loading boot script
				game.state.add('Boot', Community.Boot);
				// starting boot
				game.state.start('Boot');

			})();

		</script>
	</body>
</html>