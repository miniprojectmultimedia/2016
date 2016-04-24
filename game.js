var canvasID = "myCanvas";
var Cwidth = 510;
var Cheight = 510;
var canvas = document.getElementById(canvasID);
var ctx = canvas.getContext("2d");
var BKgrn_color = "#eca0a0";
var BDcolor = "#841800";
var BEANS = "#1c209c";
var PACMANcolor = "#fcfc68";
var PURPLE = "#8C2074";
var GREEN = "#507c38";
var BLUE = "#505cc0";
var BROWN = "#985C28";
var EAT_GHOST = "#6C6C6C";
var RECOVERING = "#ECECEC";
var Gwidth = 30;
var Gheight = 30;
var wheight = 3;
var number_of_rows = Cwidth/Gheight;
var number_of_columns = Cheight/Gwidth;
var TIMEint;
var TIMErest = 0;
var TIMEdelay = 80;
var SPEED = 5;
var SCORE = 0;
var LIFE = 1;
var EATghost_SCORE = 100;
var WINbeans = 125;
var beansREMAINING = WINbeans;
var WEAKcount;
var WEAKtime = 10000/TIMEdelay;
var SMALLbeans = 1
var LARGEbeans = 2;
var SMALLbeans_radius = 2;
var LARGEbeans_radius = 5;
var PACMAN_radius = 9;
var GHOST_radius = 9;
var PACMAN;
var ghost1;
var ghost2;
var ghost3;
var ghost4;
var FIRSTpacman;
var GHOSTS;
var UP = 1;
var DOWN = 2;
var LEFT = 3;
var RIGHT = 4;
var GAMEon = false;
var mySound;
var mySound1;
mySound = new sound("Kirby - Gourmet Race (Electro-Chiptune) remix.mp3");
mySound1 = new sound("Kirby - Gourmet Race (Electro-Chiptune) remix.mp3");
var STATgrids = [];
var STATgrids_number = 0;
var PACMAN_firstLOC = [4,9];
var EMPTYblocks = [PACMAN_firstLOC,[5,12],[5,13],[9,5],[9,6],[3,0],[5,6],[5,5],[12,7],[14,5],[12,10],[12,11],[14,11],[0,2],[0,3],[0,4],[1,0],[4,0],[14,9],[15,11],[11,7],[15,13],[13,13],[13,14],[10,15],[11,13],[5,14]];
var EMPTYblocks_number=EMPTYblocks.length;
var LARGEbeans_locations = [[0,0], [3,13], [16,4], [16,12], [7,5], [12,6]];
var MAINplace_ghosts = [];
var MAINplace_ghostsNUMBER = 0;
var BLOCKS = new Array(Cheight/Gheight);

var GAMEwalls = [
[BLT_wall,RT_wall,BLT_wall,TB_wall,TRB_wall,LT_wall,TB_wall,RT_wall,LT_wall,TOPwall,TOPwall,TOPwall,TOPwall,TOPwall,TOPwall,RT_wall,CLOSEDblock],
[CLOSEDblock,LEFTwall,TB_wall,TB_wall,TB_wall,RIGHTwall,LTR_wall,LR_wall,LB_wall,BOTTOMwall,BOTTOMwall,BOTTOMwall,BOTTOMwall,BOTTOMwall,BOTTOMwall,BOTTOMwall,TRB_wall],
[ BLT_wall,RIGHTwall,LT_wall,TB_wall,RT_wall,LR_wall,LR_wall,LEFTwall,TB_wall,TB_wall,TB_wall,TB_wall,RT_wall,BLT_wall,TOPwall,TB_wall,TRB_wall],
[LTR_wall,LR_wall,RBL_wall,CLOSEDblock,RBL_wall,LR_wall,RBL_wall,LR_wall,BLT_wall,TB_wall,TB_wall,TRB_wall,LEFTwall,RT_wall,LR_wall,LT_wall,TRB_wall],
[RBL_wall,LEFTwall,TB_wall,TB_wall,TOPwall,BOTTOMwall,TB_wall,EMPTYblock,TB_wall,TB_wall,TB_wall,TOPwall,BOTTOMwall,RB_wall,LR_wall,LR_wall,CLOSEDblock],
[BLT_wall,RIGHTwall,BLT_wall,RT_wall,RBL_wall,LT_wall,TRB_wall,LR_wall,LT_wall,TB_wall,RT_wall,LR_wall,BLT_wall,TOPwall,RIGHTwall,LB_wall,TRB_wall],
[LTR_wall,LR_wall,CLOSEDblock,LB_wall,TB_wall,RB_wall,CLOSEDblock,LR_wall,LR_wall,LTR_wall,LR_wall,LR_wall,CLOSEDblock,LB_wall,BOTTOMwall,TB_wall,TRB_wall],
[LR_wall,LB_wall,TB_wall,TB_wall,TOPwall,TB_wall,TB_wall,RIGHTwall,LR_wall,LR_wall,LR_wall,LEFTwall,TB_wall,TB_wall,TB_wall,TB_wall,RT_wall],
[LB_wall,TB_wall,TB_wall,TRB_wall,LR_wall,LT_wall,RT_wall,LR_wall,LR_wall,LR_wall,LR_wall,LR_wall,LT_wall,TB_wall,RT_wall,CLOSEDblock,LR_wall],
[LT_wall,TOPwall,TOPwall,RT_wall,LR_wall,LB_wall,RB_wall,LR_wall,RBL_wall,LR_wall,RBL_wall,LR_wall,RBL_wall,LTR_wall,LB_wall,RT_wall,LR_wall],
[LEFTwall,EMPTYblock,EMPTYblock,RIGHTwall,LEFTwall,TB_wall,TOPwall,BOTTOMwall,TB_wall,BOTTOMwall,TB_wall,BOTTOMwall,TOPwall,BOTTOMwall,RT_wall,LR_wall,LR_wall],
[LEFTwall,EMPTYblock,EMPTYblock,RIGHTwall,LR_wall,LTR_wall,LR_wall,LT_wall,TOPwall,TOPwall,TOPwall,RT_wall,LR_wall,CLOSEDblock,LR_wall,RBL_wall,LR_wall],
[LEFTwall,EMPTYblock,EMPTYblock,RIGHTwall,LR_wall,LR_wall,LR_wall,LB_wall,BOTTOMwall,BOTTOMwall,BOTTOMwall,RB_wall,LEFTwall,TB_wall,BOTTOMwall,TB_wall,RIGHTwall],
[LEFTwall,EMPTYblock,EMPTYblock,RIGHTwall,LR_wall,LR_wall,LEFTwall,TB_wall,TOPwall,TB_wall,TOPwall,TB_wall,RIGHTwall,BLT_wall,TB_wall,RT_wall,LR_wall],
[LEFTwall,EMPTYblock,EMPTYblock,RIGHTwall,LR_wall,LR_wall,LR_wall,LTR_wall,LR_wall,CLOSEDblock,LR_wall,LTR_wall,LEFTwall,TB_wall,RT_wall,LR_wall,LR_wall],
[LEFTwall,EMPTYblock,EMPTYblock,RIGHTwall,LR_wall,RBL_wall,LR_wall,LR_wall,LB_wall,TOPwall,RB_wall,LR_wall,LR_wall,CLOSEDblock,LR_wall,RBL_wall,LR_wall],
[LB_wall,BOTTOMwall,BOTTOMwall,RB_wall,LB_wall,TB_wall,RB_wall,LB_wall,TRB_wall,RBL_wall,BLT_wall,RB_wall,LB_wall,TB_wall,BOTTOMwall,TB_wall,RB_wall]
];


function CANVdraw(width, height)
{
	if(width===undefined || !(width instanceof Number))
	{
		width = Cwidth;
	}
	if(height===undefined || !(height instanceof Number))
	{
		height = Cheight;
	}
	ctx.fillStyle = "#880000";
	ctx.fillRect(0,0,Cwidth,Cheight);
}

function BLOCKSdraw()
{
	for(var i=0; i<BLOCKS.length; i++)
	{
		var oneRow = new Array(Cwidth/Gwidth);
		BLOCKS[i] = oneRow;
	}

	for( var row = 0; row < Cheight/Gheight; row++)
	{
		for(var col = 0; col < Cwidth/Gwidth; col++)
		{
			var BEANcase = SMALLbeans;
			var newGrid = new Grid(col*Gwidth,row*Gheight , GAMEwalls[row][col],BEANcase);
			BLOCKS[row][col] = newGrid;
			newGrid.draw();
		}
	}

	for(var i=0; i<EMPTYblocks.length; i++)
	{
		var x = EMPTYblocks[i][0];
		var y = EMPTYblocks[i][1];
		BLOCKS[x][y].BEANcase = undefined;
		BLOCKS[x][y].draw();
	}

	for(var i=0; i<LARGEbeans_locations.length;i++)
	{
		var x = LARGEbeans_locations[i][0];
		var y = LARGEbeans_locations[i][1];
		BLOCKS[x][y].BEANcase = LARGEbeans;
		BLOCKS[x][y].draw();
	}
}






function CIRCLEdraw(ctx, cx, cy, RADIUS) {

	ctx.beginPath();
    ctx.arc(cx, cy, RADIUS, 0, 2*Math.PI, true);
    ctx.fill();
}

function initializeBLOCKS () 
{
	for (var i=0; i<2; i++)
	{
		for (var j=8; j<17; j++)
		{
			STATgrids[STATgrids_number]=[i,j];
			STATgrids_number++;
		}
	}
	
	for(var i=0; i<2; i++)
	{
		for(var j=8; j<17; j++)
		{
			EMPTYblocks[EMPTYblocks_number]=[i,j];
			EMPTYblocks_number++;
		}
	}
	
	for (var i=1; i<=3; i++)
	{
		EMPTYblocks[EMPTYblocks_number]=[i,6];
		EMPTYblocks_number++;
	}
	
	for (var j=1; j<=3; j++)
	{
		EMPTYblocks[EMPTYblocks_number]=[8,j];
		EMPTYblocks_number++;
	}
	
	for (var i=2; i<6; i++)
	{
		for (var j=14; j<17; j++)
		{
			STATgrids[STATgrids_number]=[i,j];
			STATgrids_number++;
		}
	}
	
	for(var i=2; i<=3; i++)
	{
		for(var j=2; j<=4; j++)
		{
			EMPTYblocks[EMPTYblocks_number]=[i,j];
			EMPTYblocks_number++;
		}
	}
	
	for (var j=2; j<=3; j++)
	{
		EMPTYblocks[EMPTYblocks_number]=[5,j];
		EMPTYblocks_number++;
	}
	
	for (var j=2; j<=6; j++)
	{
		EMPTYblocks[EMPTYblocks_number]=[6,j];
		EMPTYblocks_number++;
	}
	
	for (var i=5; i<=6; i++)
	{
		EMPTYblocks[EMPTYblocks_number]=[8,i];
		EMPTYblocks_number++;
	}
	
	for (var i=6; i<10; i++)
	{
		MAINplace_ghosts[MAINplace_ghostsNUMBER]=[i,9];
		MAINplace_ghostsNUMBER++;
	}

	for (var j=6; j<=8; j++)
	{
		EMPTYblocks[EMPTYblocks_number]=[j,0];
		EMPTYblocks_number++;
	}
	
	for (var j=8; j<=11; j++)
	{
		EMPTYblocks[EMPTYblocks_number]=[3,j];
		EMPTYblocks_number++;
	}
	
	for (var i=9; i<17; i++)
	{
		for (var j=0; j<4; j++)
		{
			STATgrids[STATgrids_number]=[i,j];
			STATgrids_number++;
		}
	}
	
	for(var i=9; i<17; i++)
	{
		for(var j=0; j<4; j++)
		{
			EMPTYblocks[EMPTYblocks_number]=[i,j];
			EMPTYblocks_number++;
		}
	}
	
	for (var j=12; j<=15; j++)
	{
		EMPTYblocks[EMPTYblocks_number]=[8,j];
		EMPTYblocks_number++;
	}
	
	for (var i=13; i<=16; i++)
	{
		EMPTYblocks[EMPTYblocks_number]=[2,i];
		EMPTYblocks_number++;
	}
	
	for (var j=13; j<=16; j++)
	{
		EMPTYblocks[EMPTYblocks_number]=[3,j];
		EMPTYblocks_number++;
	}
	
	for (var i=14; i<=16; i++)
	{
		EMPTYblocks[EMPTYblocks_number]=[4,i];
		EMPTYblocks_number++;
	}
	
	for (var i=14; i<=15; i++)
	{
		EMPTYblocks[EMPTYblocks_number]=[i,7];
		EMPTYblocks_number++;
	}
	
	for (var j=15; j<=16; j++)
	{
		EMPTYblocks[EMPTYblocks_number]=[5,j];
		EMPTYblocks_number++;
	}
	
	for (var j=12; j<=16; j++)
	{
		EMPTYblocks[EMPTYblocks_number]=[6,j];
		EMPTYblocks_number++;
	}
	
	for (var i=5; i<10; i++)
	{
		for(var j=8; j<11; j++)
		{
			EMPTYblocks[EMPTYblocks_number]=[i,j];
			EMPTYblocks_number++;
		}
	}
	
	for (var j=14; j<16; j++)
	{
		EMPTYblocks[EMPTYblocks_number]=[9,j];
		EMPTYblocks_number++;
	}
	
	for (var j=8; j<=11; j++)
	{
		EMPTYblocks[EMPTYblocks_number]=[11,j];
		EMPTYblocks_number++;
	}
	
	for (var j=12; j<13; j++)
	{
		EMPTYblocks[EMPTYblocks_number]=[9,j];
		EMPTYblocks_number++;
	}
	
	for (var j=11; j<=15; j++)
	{
		EMPTYblocks[EMPTYblocks_number]=[j,5];
		EMPTYblocks_number++;
	}
	
	for(var i=13; i<16; i++)
	{
		EMPTYblocks[EMPTYblocks_number]=[i, 15];
		EMPTYblocks_number++;
	}	

	for(var i=8; i<10; i++)
	{
		EMPTYblocks[EMPTYblocks_number]=[12,i];
		EMPTYblocks_number++;
	}
	
	for(var i=7; i<=8; i++)
	{
		EMPTYblocks[EMPTYblocks_number]=[16,i];
		EMPTYblocks_number++;
	}
	
	for(var j=15; j<16; j++)
	{
		EMPTYblocks[EMPTYblocks_number]=[11, j];
		EMPTYblocks_number++;
	}
	
	for(var i=10; i<=11; i++)
	{
		EMPTYblocks[EMPTYblocks_number]=[16,i];
		EMPTYblocks_number++;
	}
}	

function sound(src) 
{
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function()
	{
        this.sound.play();
    }
    this.stop = function()
	{
        this.sound.pause();                                              
    }
}

function ROWindex (Y_coordinate)
 {
	if(Y_coordinate === undefined)
	{
		return -1;//err
	}
	return parseInt(Y_coordinate/Gheight);
}

function COLindex (X_coordinate) 
{
	if(X_coordinate === undefined)
	{
		return -1;//err
	}
	return parseInt(X_coordinate/Gwidth);
}

function X_center (y)
 {
	return ((y - Gwidth/2) % Gwidth) === 0;
}

function Y_center (x)
 {
	return ((x - Gheight/2) % Gheight) === 0;
}


function CENTER (x,y)
 {
	return X_center(y) && Y_center(x);
}

function REVERSEdirection (D) 
{
	switch(D)
	{
		case DOWN:
		return UP;
		break;
		
		case LEFT:
		return RIGHT;
		break;
		
		case UP:
		return DOWN;
		break;

		case RIGHT:
		return LEFT;
		break;

		default:
		return -1;
	}
}

function MAINplace_ghostsCONTENT(Coordin) {
	var x = Coordin[0];
	var y = Coordin[1];
	for(var i=0; i< MAINplace_ghosts.length; i++ ){
		if(x=== MAINplace_ghosts[i][0] &&
			y=== MAINplace_ghosts[i][1]){
			return true;
		}
	}
	return false;
}

function FIXING (x, y) 
{
	var row = ROWindex(y);
	var col = COLindex(x);

	if(X_center(y))
	{
 		BLOCKS[row][col].draw();
 		if(col+1 < BLOCKS.length && !STATgrids_content([row, col+1])){
 			BLOCKS[row][col+1].draw();
 		}
 		if(col-1 >= 0 && !STATgrids_content([row, col-1])){
 			BLOCKS[row][col-1].draw();
 		}
 	}
 	else if(Y_center(x))
	{
 		BLOCKS[row][col].draw();
 		if(row+1 < BLOCKS.length  && !STATgrids_content([row+1, col]))
		{
 			BLOCKS[row+1][col].draw();
 		}
 		if(row-1 >=0 && !STATgrids_content([row-1,col]) )
		{
 			BLOCKS[row-1][col].draw();
 		}
 	}
}

function STATgrids_content(Coordin)
 {
	var x = Coordin[0];
	var y = Coordin[1];
	for(var i=0; i< STATgrids.length; i++ )
	{
		if(x=== STATgrids[i][0] &&
			y=== STATgrids[i][1]){
			return true;
		}
	}
	return false;
}

function MOVEability (x,y,D) 
{
	if(!CENTER(x,y))
	{
		return true;
	}
	var MOVEability = false;
	var CURRENTblock = BLOCKS[ROWindex(y)][COLindex(x)];
	var TYPblock = CURRENTblock.TYPblock;
	switch(D){

		case DOWN:
		if(TYPblock != LB_wall && TYPblock != TB_wall && TYPblock != RB_wall
			&& TYPblock != BOTTOMwall && TYPblock!= RBL_wall
			&& TYPblock != BLT_wall && TYPblock!= TRB_wall){
			MOVEability = true;
		}
		break;

		case LEFT:
		if(TYPblock != LB_wall && TYPblock != LT_wall && TYPblock != LEFTwall
			&& TYPblock != LR_wall && TYPblock!= LTR_wall
			&& TYPblock != BLT_wall && TYPblock!= RBL_wall){
			MOVEability = true;
		}
		break;

		case UP:
		if(TYPblock != LT_wall && TYPblock != RT_wall && TYPblock != TB_wall
			&& TYPblock != TOPwall && TYPblock!= LTR_wall 
			&& TYPblock != TRB_wall && TYPblock!= BLT_wall){
			MOVEability = true;
		}
		break;
		
		case RIGHT:
		if(TYPblock != RB_wall && TYPblock != RT_wall && TYPblock != RIGHTwall
			&& TYPblock != LR_wall && TYPblock!= RBL_wall 
			&& TYPblock != TRB_wall && TYPblock != LTR_wall){
			MOVEability = true;
		}
		break;
		
		default:
		break;
	}
	return MOVEability;
}

function DISPLAYscore()
{
	ctx.fillStyle="#eca0a0";
	ctx.fillRect(Cwidth-250, 10, 190, 40);
	ctx.fillStyle = "#841800";
	ctx.font = "24px monospace";
	ctx.textAlign = "left";
	ctx.fillText("SCORE: " + parseInt(SCORE), Cwidth-200, 37);	
}
	

function top_ten () 
{
	ctx.fillStyle = "white";
	ctx.font="12px monospace";
	ctx.textAlign = "left";


	var TEXT_left = "Restart:Enter\nTop 10 : \n";   						  
	var x = 12;
	var y = Cheight-220;
	var lineheight = 15;
	var array = fetchScores();
if ( array.length <=10){
	for (i=0;i<array.length;i++)
	{
	TEXT_left = TEXT_left + array[i].name+" : "+array[i].score +"\n";

	}
}
else {

	for (i=0;i<10;i++)
	{
	TEXT_left = TEXT_left + array[i].name+" : "+array[i].score +"\n";

	}}
	var lines = TEXT_left.split('\n');

	for (var i = 0; i<lines.length; i++)
	    ctx.fillText(lines[i], x, y + (i*lineheight) );
}

function STARTscreen()
{

	mySound.play();
	GAMEon = false;
	ctx.fillStyle = "#fce08c";
	ctx.font = "80px monospace";
	ctx.textAlign = "center";
	ctx.fillText("PACMAN", 160, 150);
	ctx.font = "20px monospace";
	ctx.fillText("Press Enter to start", 270, 200);
	FIRSTpacman = new Pacman(Cwidth/2, Cheight/3*2, RIGHT);
	FIRSTpacman.RADIUS = 70;
	FIRSTpacman.draw();
	TIMEint = setInterval(UPDATE_STARTscreen, TIMEdelay*2);

}

function UPDATE_STARTscreen () 
{
	ctx.fillStyle = "#880000";
	ctx.fillRect(0, Cheight/2, Cwidth,140);
	
	FIRSTpacman.MOUTHmove = !FIRSTpacman.MOUTHmove;
FIRSTpacman.draw();
}

function END_loser()
{	
	
	var name;
	do {
		name = prompt("Enter Your Name");
	}while(name.length < 3);
	addScore({
		name: name,
		score: parseInt(SCORE)
	});


	ctx.fillStyle = "#442800";
	ctx.strokeStyle = "#3854a8";
	ctx.lineWidth=5;
	ctx.fillRect(Cwidth/2-150, Cheight/2-60, 300, 150);
	ctx.strokeRect(Cwidth/2-150, Cheight/2-60, 300, 150);
	ctx.textAlign="center";
	ctx.fillStyle = "#7c9cdc";
	ctx.font = "30px monospace";
	ctx.fillText("GAME OVER :(", Cheight/2, Cheight/2+7);
	ctx.font = "16px monospace";
	ctx.fillText("Play again : ENTER ...", Cheight/2, Cheight/2+28);
	

	
}

function END_winner()
{

	var name;
	do {
		name = prompt("Enter Your Name");
	}while(name.length < 3);
	addScore({
		name: name,
		score: parseInt(SCORE)
	});
	ctx.fillStyle = "#442800";
	ctx.strokeStyle = "#3854a8";
	ctx.lineWidth=5;
    ctx.fillRect(Cwidth/2-150, Cheight/2-60, 300, 150);
	ctx.strokeRect(Cwidth/2-150, Cheight/2-60, 300, 150);
	ctx.textAlign="center";
	ctx.fillStyle = "#7c9cdc";
	ctx.font = "30px monospace";
	ctx.fillText("you won :D", Cheight/2, Cheight/2+6);
	ctx.font = "16px monospace";
	ctx.fillText("Play again: ENTER ...", Cheight/2, Cheight/2+28);
	
		
}

function PRESSkey (event) 
{
	var CODE_KEYS = event.keyCode;
	var CODE_enter = 13;	
	var CODE_down = 40;
	var CODE_left = 37;
	var CODE_up = 38;
	var CODE_right = 39;

	if(!GAMEon)
	{
		if(CODE_KEYS === CODE_enter)
		{
			clearInterval(TIMEint);
			GAMEon = true;
			BLOCKSdraw();
			START_GAME();
			return;
		}	
	}
	else
	{
		switch(CODE_KEYS)
			{
				case CODE_down:
					PACMAN.DIRECTnext = PACMAN.D === DOWN? undefined : DOWN;
					break;
				case CODE_left:
					PACMAN.DIRECTnext = PACMAN.D === LEFT? undefined : LEFT;
					break;
				case CODE_up:
					PACMAN.DIRECTnext = PACMAN.D===UP ? undefined: UP;
					break;
				case CODE_right:
					PACMAN.DIRECTnext = PACMAN.D===RIGHT? undefined : RIGHT;
					break;
				default:
					break;
			}
		if( CODE_KEYS === CODE_enter && TIMErest > 0)
			{
				mySound.stop();
				mySound1.play();
				TIMErest = 0;
				clearInterval(TIMEint);
				GAMEon = true;
				SCORE = 0;
				LIFE = 1;
				beansREMAINING = WINbeans;
				BLOCKSdraw();
				START_GAME();
			} 			
	}	
}

function LOSTgame()
{
	for(var i=0; i<GHOSTS.length; i++)
	{
		
		if(Math.abs(PACMAN.x-GHOSTS[i].x)<=5 && Math.abs(PACMAN.y-GHOSTS[i].y)<=5 && !GHOSTS[i].isWeak)
		{
			mySound.stop();
			mySound1.stop();
			return true;
		}
	}
	return false;
}

function WONgame()
{
	return beansREMAINING === 0;
}

function BEANeat () 
{
	if(CENTER(PACMAN.x, PACMAN.y))
	{
		if(BLOCKS[PACMAN.getRow()][PACMAN.getCol()].BEANcase===SMALLbeans)
		{
			SCORE+= parseInt(5);
			DISPLAYscore();
			beansREMAINING--;
		}
		else if (BLOCKS[PACMAN.getRow()][PACMAN.getCol()].BEANcase===LARGEbeans)
		{
			SCORE+=parseInt(30);
			DISPLAYscore();
			beansREMAINING--;
			WEAKcount=WEAKtime;
			
			for(var i=0; i<GHOSTS.length; i++)
			{
				GHOSTS[i].isWeak=true;
			}	
		}
		
		BLOCKS[PACMAN.getRow()][PACMAN.getCol()].BEANcase=undefined;
		BLOCKS[PACMAN.getRow()][PACMAN.getCol()].draw();
	}
}

function GHOSTeat () 
{
	for(var i=0; i<GHOSTS.length; i++)
	{
		if(Math.abs(PACMAN.x-GHOSTS[i].x)<=5 && Math.abs(PACMAN.y-GHOSTS[i].y)<=5 && GHOSTS[i].isWeak && !GHOSTS[i].isDead)
		{
			SCORE += parseInt( EATghost_SCORE);
			DISPLAYscore();
			GHOSTS[i].isDead = true;
			GHOSTS[i].go_MAINplace_ghosts();
		}
	}
}

function CANVupdate() 
{
	TIMErest++;
	if (LOSTgame()===true)
	{
		clearInterval(TIMEint);
		END_loser();
	}
	else if (WONgame()===true)
	{
		clearInterval(TIMEint);
		END_winner();
	}
	else
	{
		if(WEAKcount>0)
		{
			WEAKcount--;
		}
		if(WEAKcount>0 && WEAKcount<2000/TIMEdelay)
		{
			for(var i=0; i<GHOSTS.length; i++)
			{
				GHOSTS[i].isBlinking = !GHOSTS[i].isBlinking;
			}
		}
		if(WEAKcount===0)
		{
			for(var i=0; i<GHOSTS.length; i++)
			{
				GHOSTS[i].isDead = false;
				GHOSTS[i].isWeak = false;
				GHOSTS[i.isBlinking = false];
				EATghost_SCORE= 200;
			}
		}

		BEANeat();
		GHOSTeat();
		PACMAN.MOVE();

		for(var i=0; i<GHOSTS.length; i++)
		{
			if(GHOSTS[i].isDead === false)
			{
				GHOSTS[i].MOVE();
			}
		}

	 	FIXING(PACMAN.x, PACMAN.y);
		
	 	for(var i=0; i<GHOSTS.length; i++)
		{
			FIXING(GHOSTS[i].x, GHOSTS[i].y);
		}

	    PACMAN.draw();
		
	    for(var i=0; i<GHOSTS.length; i++)
		{
			GHOSTS[i].draw();
		}
	}
}

function START_GAME() 
{
	DISPLAYscore();
    PACMAN = new Pacman(PACMAN_firstLOC[1]*Gwidth + Gwidth/2, PACMAN_firstLOC[0]*Gheight + Gheight/2, RIGHT);
	ghost1 = new Ghost(0,0, PURPLE, DOWN);
    ghost2 = new Ghost(0,0, BLUE, DOWN);
	ghost3 = new Ghost(0,0, GREEN, DOWN);
	ghost4 = new Ghost(0,0, BROWN, DOWN);
	GHOSTS = [ghost1, ghost2, ghost3, ghost4];
	
	ghost1.go_MAINplace_ghosts();
	ghost2.go_MAINplace_ghosts();
	ghost3.go_MAINplace_ghosts();
	ghost4.go_MAINplace_ghosts();
	ghost2.draw();
	ghost1.draw();
	ghost3.draw();
	ghost4.draw();
	PACMAN.draw();
	
	top_ten();
	TIMEint = setInterval(CANVupdate, TIMEdelay);	
}

initializeBLOCKS();
CANVdraw(Cwidth, Cheight);
canvas.addEventListener('keydown', PRESSkey, false);
canvas.setAttribute('tabindex','0');
canvas.focus();
STARTscreen();


