var ID = -1;
var NOwalls = -1;//no wall
var LEFTwall = 0;
var TOPwall = 1;
var RIGHTwall = 2;
var BOTTOMwall = 3;
var LR_wall = 4;
var LT_wall = 5;
var LB_wall = 6;
var RT_wall = 7;
var RB_wall = 8;
var TB_wall = 9;
var BLT_wall = 10;
var LTR_wall = 11;
var TRB_wall = 12;
var RBL_wall = 13;
var EMPTYblock = 14;
var CLOSEDblock = 15;


Grid.prototype.getRow = function() 
{
	return ROWindex(this.y);
};

Grid.prototype.getCol = function() 
{
	return COLindex(this.x);
};

Grid.prototype.toString = function() 
{
	return "Grid ("+this.x+","+this.y+") - Grid Type: " + this.TYPblock;
}; 

Grid.prototype.hasBean = true;

function Grid (X_coordinate, Y_coordinate, TYPblock, BEANcase) 
{
	this.x = X_coordinate;
	this.y = Y_coordinate;
	this.TYPblock = TYPblock===undefined? EMPTYblock : TYPblock;
	this.BEANcase = BEANcase;
}

Grid.prototype.BEANSdraw = function() 
{
	var BEANcase = this.BEANcase;
	var centerX = this.x + Gwidth/2;
	var centerY = this.y + Gheight/2;
	ctx.fillStyle = BEANS;
	if(BEANcase === undefined)
	{
		return;
	}
	
	if(BEANcase === LARGEbeans)
	{
		CIRCLEdraw(ctx, centerX, centerY, LARGEbeans_radius);
	}
	else if(BEANcase === SMALLbeans)
	{
		CIRCLEdraw(ctx, centerX, centerY, SMALLbeans_radius);
	}
	else
	{
		return;
	}
};

Grid.prototype.drawBOTTOMwall = function() 
{
	ctx.fillStyle = BDcolor;
	ctx.fillRect(this.x, this.y + Gheight - wheight, Gwidth, wheight);
};

Grid.prototype.drawLEFTwall = function() 
{
	ctx.fillStyle = BDcolor;
	ctx.fillRect(this.x, this.y, wheight, Gheight);
};

Grid.prototype.drawTOPwall = function() 
{
	ctx.fillStyle = BDcolor;
	ctx.fillRect(this.x, this.y, Gwidth, wheight);
};

Grid.prototype.drawRIGHTwall = function()
{
	ctx.fillStyle = BDcolor;
	ctx.fillRect(this.x+Gwidth - wheight , this.y, wheight , Gheight);
};

Grid.prototype.DRAWnowall = function() 
{
	ctx.fillStyle = BDcolor;
	ctx.fillRect(this.x, this.y, wheight, wheight);
	ctx.fillRect(this.x + Gwidth - wheight, this.y, wheight, wheight);
	ctx.fillRect(this.x, this.y + Gheight - wheight, wheight, wheight);
	ctx.fillRect(this.x + Gwidth - wheight, this.y + Gheight - wheight, wheight, wheight);
};

Grid.prototype.draw = function() 
{
	ctx.fillStyle = BKgrn_color;
	ctx.fillRect(this.x, this.y, Gwidth, Gheight);
	var TYPblock = this.TYPblock	;
	if(TYPblock === undefined || TYPblock === EMPTYblock)
	{
		this.BEANSdraw();
		return;
	}

	switch(TYPblock)
	{
		case BOTTOMwall:
			this.drawBOTTOMwall();
			break;
		case LEFTwall:
			this.drawLEFTwall();
			break;
		case TOPwall:
			this.drawTOPwall();
			break;
		case RIGHTwall:
			this.drawRIGHTwall();
			break;
		case LTR_wall:
			this.drawLEFTwall();
			this.drawTOPwall();
			this.drawRIGHTwall();
			break;
		case TRB_wall:
			this.drawTOPwall();
			this.drawRIGHTwall();
			this.drawBOTTOMwall();
			break;
		case RBL_wall:
			this.drawRIGHTwall();
			this.drawBOTTOMwall();
			this.drawLEFTwall();
			break;
		case BLT_wall:
			this.drawBOTTOMwall();
			this.drawLEFTwall();
			this.drawTOPwall();
			break;
		case LR_wall:
			this.drawLEFTwall();
			this.drawRIGHTwall();
			break;
		case LT_wall:
			this.drawLEFTwall();
			this.drawTOPwall();
			break;
		case LB_wall:
			this.drawLEFTwall();
			this.drawBOTTOMwall();
			break;
		case RT_wall:
			this.drawRIGHTwall();
			this.drawTOPwall();
			break;
		case RB_wall:
			this.drawRIGHTwall();
			this.drawBOTTOMwall();
			break;
		case TB_wall:
			this.drawTOPwall();
			this.drawBOTTOMwall();
			break;
		case CLOSEDblock:
			this.drawLEFTwall();
			this.drawTOPwall();
			this.drawBOTTOMwall();
			this.drawRIGHTwall();
			break;
		case NOwalls:
			this.DRAWnowall();
			break;
		default:
			break;
	}
	this.BEANSdraw();	
};