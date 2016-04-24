function Pacman(X_coordinate, Y_coordinate, D)
{
	this.x = X_coordinate;
	this.y = Y_coordinate;
	this.D = D;
	this.DIRECTnext = undefined; 
	this.RADIUS = PACMAN_radius;
	this.MOUTHmove = true;
}

Pacman.prototype.getRow = function()
{
	return ROWindex(this.y);
};

Pacman.prototype.getCol = function()
{
	return COLindex(this.x);
};

Pacman.prototype.draw = function(color) 
{
	if (color == undefined)
	{
		ctx.fillStyle = PACMANcolor;
	}
	else
	{
		ctx.fillStyle = color;
	}
	ctx.beginPath();

	if (!this.MOUTHmove)
	{
		switch(this.D)
		{
			case DOWN:
				ctx.arc(this.x, this.y, this.RADIUS, 2*Math.PI-Math.PI*29/18, 2*Math.PI-Math.PI*25/18, true);
				break;
			case LEFT:
				ctx.arc(this.x, this.y, this.RADIUS, 2*Math.PI-Math.PI*10/9, 2*Math.PI-Math.PI*8/9, true);
				break;
			case UP:
				ctx.arc(this.x, this.y, this.RADIUS, 2*Math.PI-Math.PI*11/18, 2*Math.PI-Math.PI*7/18, true);
				break;
			case RIGHT:
				ctx.arc(this.x, this.y, this.RADIUS, 2*Math.PI-Math.PI/9, 2*Math.PI-Math.PI*17/9, true);
				break;
			default:
				break;
		}
	}
	else 
	{
		switch(this.D)
		{
			case DOWN:
				ctx.arc(this.x, this.y, this.RADIUS, 2*Math.PI-Math.PI*16/9, 2*Math.PI-Math.PI*11/9, true);
				break;
			case LEFT:
				ctx.arc(this.x, this.y, this.RADIUS, 2*Math.PI-Math.PI*23/18, 2*Math.PI-Math.PI*13/18, true);
				break;
			case UP:
				ctx.arc(this.x, this.y, this.RADIUS, 2*Math.PI-Math.PI*7/9, 2*Math.PI-Math.PI*2/9, true);
				break;
			case RIGHT:
				ctx.arc(this.x, this.y, this.RADIUS, 2*Math.PI-Math.PI*5/18, 2*Math.PI-Math.PI*31/18, true);
				break;
			default:
				break;
		}
	}
	ctx.lineTo(this.x, this.y);
	ctx.fill();
};

Pacman.prototype.MOVEability = function(D) 
{
	return MOVEability(this.x, this.y, D);
};

Pacman.prototype.MOVEstep = function() 
{
	var Xchanged =0;
	var Ychanged =0;
	if(!MOVEability(this.x, this.y, this.D))
	{
		return;
	}
	switch(this.D)
	{
		case DOWN:
			Ychanged = this.y + SPEED;
			if(Ychanged + this.RADIUS + wheight < Cheight) 
			{
				this.y = Ychanged;
				this.MOUTHmove = ! this.MOUTHmove;
			}
			break;

		case LEFT:
			Xchanged = this.x - SPEED;
			if(Xchanged - this.RADIUS - wheight > 0 )
			{
				this.x = Xchanged;
				this.MOUTHmove = ! this.MOUTHmove;
			}
			break;
		case UP:
			Ychanged = this.y  - SPEED;
			if(Ychanged - this.RADIUS - wheight > 0)
			{
				this.y = Ychanged;
				this.MOUTHmove = ! this.MOUTHmove;
			}
			break;
		case RIGHT:
			Xchanged = this.x + SPEED;
			if(Xchanged + this.RADIUS + wheight < Cwidth)
			{
				this.x = Xchanged;
				this.MOUTHmove = ! this.MOUTHmove;
			}
			break;
		default:
			break;
	}
};

Pacman.prototype.MOVE = function()  
{
	if(CENTER(this.x, this.y) === false)
	{
		if(this.DIRECTnext != undefined && ((this.D === UP && this.DIRECTnext === DOWN )||(this.D === DOWN && this.DIRECTnext === UP) ||(this.D === LEFT && this.DIRECTnext === RIGHT) ||(this.D === RIGHT && this.DIRECTnext ===LEFT)))
		{
			this.D = this.DIRECTnext;
			this.DIRECTnext = undefined;
		}
		this.MOVEstep();
		return;
	}
	else
	{
		if(this.DIRECTnext != undefined && this.MOVEability(this.DIRECTnext))
		{
			this.D = this.DIRECTnext;
			this.DIRECTnext = undefined;
			this.MOVEstep();
		}
		else
		{
			if(this.MOVEability(this.D))
			{
				this.MOVEstep();
			}
		}	
	}
};