/* Define Canvas */

var canvas;
var stage;

/* Background */

var titleBg;

/* Title View */

var titleBgImg = new Image();
var titleBg;
var playBtnImg = new Image();
var playBtn;
var creditsBtnImg = new Image();
var creditsBtn;
var titleView = new Container();

/* Credits */

var creditsViewImg = new Image();
var creditsView;


/* Game Bg */

var gameBgImg = new Image();
var gameBg;

/* Alert */

var alertBgImg = new Image();
var alertBg;

/* Score */

var score;

/* voles */

var voleImg = new Image();
var vole;
var lastvole;

var voleHitBoxImg = new Image();
var voleHitBox;
var lastvoleHitBox;


var volesX = [80, 198, 338, 70, 225, 376, 142, 356];
var volesY = [11, 51, 34, 110, 136, 96, 211, 186];

var centerX = 240;
var centerY = 160;
var gfxLoaded = 0; //used as a preloader

var timerSource;
var currentvoles = 0; //voles already shown
var volesHit = 0;
var totalvoles = 10; //total of voles to display

function Main_vole()
{
    /* Link Canvas */

    canvas = document.getElementById('WhackaVole');
    centerX = Math.floor(canvas.width / 2)
    centerY = Math.floor(canvas.height/ 2)
    stage = new Stage(canvas);
    stage.mouseEventsEnabled = true;
//    stage.enableMouseOver();

    /* Load GFX */

    titleBgImg.src = '../static/images/titleBg.svg';
    titleBgImg.name = 'titleBg';
    titleBgImg.onload = loadGfx;
    titleBgImg.width = 400;
    titleBgImg.height = 266.67;


    gameBgImg.src = '../static/images/gameBg.png';
    gameBgImg.name = 'gameBg';
    gameBgImg.onload = loadGfx;

    playBtnImg.src = '../static/images/playBtn.png';
    playBtnImg.name = 'playBtn';
    playBtnImg.onload = loadGfx;

    creditsBtnImg.src = '../static/images/creditsBtn.png';
    creditsBtnImg.name = 'creditsBtn';
    creditsBtnImg.onload = loadGfx;

    creditsViewImg.src = '../static/images/creditsView.png';
    creditsViewImg.name = 'credits';
    creditsViewImg.onload = loadGfx;

    alertBgImg.src = '../static/images/alertBg.png';
    alertBgImg.name = 'alertBg';
    alertBgImg.onload = loadGfx;

    voleImg.src = '../static/images/vole.png';
    voleImg.name = 'vole';
    voleImg.onload = loadGfx;
//    voleImg.width = 288;
//    voleImg.height = 283;

    voleHitBoxImg.src = '../static/images/voleHitBox.png';
    voleHitBoxImg.name = 'voleHitBox';
    voleHitBoxImg.onload = loadGfx;


    /* Ticker */

	Ticker.setFPS(30);
	Ticker.addListener(stage);
}

function loadGfx(e)
{
	if(e.target.name = 'titleBg'){titleBg = new Bitmap(titleBgImg);}
	if(e.target.name = 'gameBg'){gameBg = new Bitmap(gameBgImg);}
	if(e.target.name = 'playBtn'){playBtn = new Bitmap(playBtnImg);}
	if(e.target.name = 'creditsBtn'){creditsBtn = new Bitmap(creditsBtnImg);}
	if(e.target.name = 'alertBg'){alertBg = new Bitmap(alertBgImg);}
	if(e.target.name = 'vole'){vole = new Bitmap(voleImg);}
	if(e.target.name = 'creditsView'){creditsView = new Bitmap(creditsViewImg);}
	if(e.target.name = 'voleHitBox'){voleHitBox = new Bitmap(voleHitBoxImg);}

	gfxLoaded++;

	if(gfxLoaded == 8)
	{
		addTitleView();
	}
}

function addTitleView()
{



    gameBg.scaleY = (canvas.height / gameBgImg.height)
    gameBg.scaleX = (canvas.width / gameBgImg.width)
	/* Add GameView BG */
	stage.addChild(gameBg);

	/* Title Screen */

	playBtn.x = centerX - (playBtnImg.width/2);
	playBtn.y = centerY + 0.2*(canvas.height);

	creditsBtn.x = centerX - (creditsBtnImg.width/2);
	creditsBtn.y = centerY + 0.3*(canvas.height);

    titleBg.scaleY = (canvas.height / titleBgImg.height)
    titleBg.scaleX = (canvas.width / titleBgImg.width)

	titleView.addChild(titleBg, playBtn, creditsBtn);

	stage.addChild(titleView);

	startButtonListeners('add');

	stage.update();
}

function startButtonListeners(action)
{
	if(action == 'add')
	{
		titleView.getChildAt(1).onPress = showGameView;
		titleView.getChildAt(2).onPress = showCredits;
	}
	else
	{
		titleView.getChildAt(1).onPress = null;
		titleView.getChildAt(2).onPress = null;
	}
}

function showCredits()
{
	playBtn.visible = false;
	creditsBtn.visible = false;
	creditsView = new Bitmap(creditsViewImg);

	creditsView.scaleY = (canvas.height / titleBgImg.height)

	stage.addChild(creditsView);
	creditsView.x = -203;

	Tween.get(creditsView).to({x:0}, 200).call(function(){creditsView.onPress = hideCredits;});
}

function hideCredits()
{
	playBtn.visible = true;
	creditsBtn.visible = true;
	Tween.get(creditsView).to({x:-203}, 200).call(function(){creditsView.onPress = null; stage.removeChild(creditsView); creditsView = null;});
}

function showGameView()
{
	Tween.get(titleView).to({x: -480}, 200).call(function(){startButtonListeners('rmv'); stage.removeChild(titleView); titleView = null; showvole();});
	score = new Text('0' + '/' + totalvoles, 'bold 20px Arial', '#EEE');
	score.maxWidth = 1000;	//fix for Chrome 17
	score.x = 55*(canvas.width / gameBgImg.width) + 5;
	score.y = 19*(canvas.height / gameBgImg.height) + 5;
	stage.addChild(score);
}

function showvole()
{
	if(currentvoles == totalvoles)
	{
		showAlert();
	}
	else
	{
		if(lastvole != null)
		{
			lastvole.onPress = null;
			lastvoleHitBox.onPress = null;
			stage.removeChild(lastvole);
			stage.removeChild(lastvoleHitBox);
			stage.update();
			lastvole = null;
			lastvoleHitBox = null;
		}

		var randomPos = Math.floor(Math.random() * 8);
		var vole = new Bitmap(voleImg);
		var voleHitBox = new Bitmap(voleHitBoxImg);

//        vole.scaleX = ((58*canvas.width / gameBgImg.width) / voleImg.width)
//        vole.scaleY = ((58*canvas.width / gameBgImg.width) / voleImg.width)

        vole.x = volesX[randomPos] * (canvas.width / gameBgImg.width);
		vole.y = volesY[randomPos] * (canvas.height / gameBgImg.height)+100;

		voleHitBox.x = volesX[randomPos]* (canvas.width / gameBgImg.width);
		voleHitBox.y = volesY[randomPos]* (canvas.height / gameBgImg.height);
		stage.addChild(vole, voleHitBox);
		voleHitBox.onPress = voleHit;

		lastvole = vole;
		lastvoleHitBox = voleHitBox;
		lastvole.scaleY = 0.3;
		lastvole.y += 42;
		lastvoleHitBox.y = -300;
		lastvoleHitBox.scaleY = (canvas.height / voleHitBoxImg.height)+10;
		lastvoleHitBox.scaleX = 3;
		lastvoleHitBox.x -= 100;
		console.log(lastvoleHitBox.y)
		console.log(canvas.height)

//		lastvoleHitBox.cursor = "pointer";
		stage.update();

		Tween.get(lastvole).to({scaleY: 1, y: volesY[randomPos]* (canvas.height / gameBgImg.height)+100}, 200).wait(1000).call(function(){currentvoles++; showvole()});
	}
}

function voleHit()
{
	volesHit++;
	score.text = volesHit + '/' + totalvoles;
	lastvole.onPress = null;
	lastvoleHitBox.onPress = null;
	stage.removeChild(lastvole, lastvoleHitBox);
	lastvole = null;
	lastvoleHitBox = null;
	stage.update();
}

function showAlert()
{
	alertBg.x = centerX - 120;
	alertBg.y = -80;
	stage.addChild(alertBg);

	Tween.get(alertBg).to({y:centerY - 80}, 200).call(function()
	{
		Ticker.removeAllListeners();
		var score = new Text(volesHit + '/' + totalvoles, 'bold 20px Arial', '#EEE');
		score.maxWidth = 1000;	//fix for Chrome 17
		score.x = centerX - 20;
		score.y = centerY + 50;
		stage.addChild(score);
		stage.update();
	});
}