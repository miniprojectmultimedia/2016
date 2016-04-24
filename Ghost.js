function Ghost(X_coordinate, Y_coordinate, gColor, D){
	this.x = X_coordinate;
	this.y = Y_coordinate;
	this.color = gColor;
	this.D = D;
	this.isWeak = false;
	this.RADIUS = GHOST_radius;
	this.isMoving = false;
	this.isBlinking = false;
	this.isDead = false;
	this.SPEED = SPEED;
	this.COUNTsteps = 0;
}

Ghost.prototype.go_MAINplace_ghosts = function()
 {
	var initX;
	var initY;
	switch(this.color)
	{
			case BROWN:
				initX = MAINplace_ghosts[0][1]*Gwidth + Gwidth/2;
				initY = MAINplace_ghosts[0][0]*Gwidth + Gwidth/2;
				break;
			case GREEN:
				initX =  MAINplace_ghosts[1][1]*Gwidth + Gwidth/2;
				initY =  MAINplace_ghosts[1][0]*Gwidth + Gwidth/2;
				break;
			case BLUE:
				initX = MAINplace_ghosts[2][1]*Gwidth + Gwidth/2;
				initY = MAINplace_ghosts[2][0]*Gwidth + Gwidth/2;
				break;
			case PURPLE:
				initX = MAINplace_ghosts[3][1]*Gwidth + Gwidth/2;
				initY = MAINplace_ghosts[3][0]*Gwidth + Gwidth/2;
				break;
	}
	this.x = initX;
	this.y = initY;
	this.D = DOWN;
	this.COUNTsteps = 0;
};

Ghost.prototype.getRow = function()
{
	return ROWindex(this.y);
};

Ghost.prototype.getCol = function() 
{
	return COLindex(this.x);
};

Ghost.prototype.draw = function() 
{
	if(!this.isDead)
	{
		if(this.isWeak)
		{
			if(this.isBlinking)
			{
				ctx.fillStyle = RECOVERING;
			}
			else
			{
				ctx.fillStyle = EAT_GHOST;
			}
		}
		else
		{
			ctx.fillStyle = this.color;
		}
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.RADIUS, Math.PI, 0, false);
		ctx.moveTo(this.x-this.RADIUS, this.y);
		if (!this.isMoving)
		{
			ctx.lineTo(this.x-this.RADIUS, this.y+this.RADIUS);
			ctx.lineTo(this.x-this.RADIUS+this.RADIUS/3, this.y+this.RADIUS-this.RADIUS/4);
			ctx.lineTo(this.x-this.RADIUS+this.RADIUS/3*2, this.y+this.RADIUS);
			ctx.lineTo(this.x, this.y+this.RADIUS-this.RADIUS/4);
			ctx.lineTo(this.x+this.RADIUS/3, this.y+this.RADIUS);
			ctx.lineTo(this.x+this.RADIUS/3*2, this.y+this.RADIUS-this.RADIUS/4);
			ctx.lineTo(this.x+this.RADIUS, this.y+this.RADIUS);
			ctx.lineTo(this.x+this.RADIUS, this.y);
		}
		else 
		{
			ctx.lineTo(this.x-this.RADIUS, this.y+this.RADIUS-this.RADIUS/4);
			ctx.lineTo(this.x-this.RADIUS+this.RADIUS/3, this.y+this.RADIUS);
			ctx.lineTo(this.x-this.RADIUS+this.RADIUS/3*2, this.y+this.RADIUS-this.RADIUS/4);
			ctx.lineTo(this.x, this.y+this.RADIUS);
			ctx.lineTo(this.x+this.RADIUS/3, this.y+this.RADIUS-this.RADIUS/4);
			ctx.lineTo(this.x+this.RADIUS/3*2, this.y+this.RADIUS);
			ctx.lineTo(this.x+this.RADIUS, this.y+this.RADIUS-this.RADIUS/4);
			ctx.lineTo(this.x+this.RADIUS, this.y);
		}
			ctx.fill();
	}

	if(this.isWeak)
	{
		if(this.isBlinking)
		{
			ctx.fillStyle = "#9c2020";
			ctx.strokeStyle = "#ececec";
		}
		else
		{
			ctx.fillStyle = "#ececec";
			ctx.strokeStyle = "#ececec";
		}
		ctx.beginPath(); 
		ctx.arc(this.x+this.RADIUS/2.5, this.y-this.RADIUS/5, this.RADIUS/5, 0, Math.PI*2, true); 
		ctx.fill();
		ctx.beginPath();
		ctx.arc(this.x-this.RADIUS/2.5, this.y-this.RADIUS/5, this.RADIUS/5, 0, Math.PI*2, true);
		ctx.fill();
		ctx.beginPath();
		ctx.lineWidth=1;
		ctx.moveTo(this.x-this.RADIUS+this.RADIUS/5, this.y+this.RADIUS/2);
		ctx.lineTo(this.x-this.RADIUS+this.RADIUS/3, this.y+this.RADIUS/4);
		ctx.lineTo(this.x-this.RADIUS+this.RADIUS/3*2, this.y+this.RADIUS/2);
		ctx.lineTo(this.x, this.y+this.RADIUS/4);
		ctx.lineTo(this.x+this.RADIUS/3, this.y+this.RADIUS/2);
		ctx.lineTo(this.x+this.RADIUS/3*2, this.y+this.RADIUS/4);
		ctx.lineTo(this.x+this.RADIUS-this.RADIUS/5, this.y+this.RADIUS/2);
		ctx.stroke();
	}
	else
	{
		ctx.fillStyle = "#ececec"; 
		ctx.beginPath();
		ctx.arc(this.x+this.RADIUS/2.5, this.y-this.RADIUS/5, this.RADIUS/3, 0, Math.PI*2, true); 
		ctx.fill();
		ctx.fillStyle = "#ececec"; 
		ctx.beginPath();
		ctx.arc(this.x-this.RADIUS/2.5, this.y-this.RADIUS/5, this.RADIUS/3, 0, Math.PI*2, true); 
		ctx.fill();

		switch(this.D)
		{
			case DOWN:
				ctx.fillStyle="#000000"; 
				ctx.beginPath();
				ctx.arc(this.x+this.RADIUS/3, this.y-this.RADIUS/5+this.RADIUS/6, this.RADIUS/6, 0, Math.PI*2, true); 
				ctx.fill();
				ctx.fillStyle="#000000"; 
				ctx.beginPath();
				ctx.arc(this.x-this.RADIUS/3, this.y-this.RADIUS/5+this.RADIUS/6, this.RADIUS/6, 0, Math.PI*2, true);
				ctx.fill();	
				break;
				
			case LEFT:
				ctx.fillStyle="#000000"; 
				ctx.beginPath();
				ctx.arc(this.x+this.RADIUS/3-this.RADIUS/15, this.y-this.RADIUS/5, this.RADIUS/6, 0, Math.PI*2, true); 
				ctx.fill();
				ctx.fillStyle="#000000"; 
				ctx.beginPath();
				ctx.arc(this.x-this.RADIUS/3-this.RADIUS/5, this.y-this.RADIUS/5, this.RADIUS/6, 0, Math.PI*2, true); 
				ctx.fill();
				break;
				
			case UP:
				ctx.fillStyle="#000000"; 
				ctx.beginPath();
				ctx.arc(this.x+this.RADIUS/3, this.y-this.RADIUS/5-this.RADIUS/6, this.RADIUS/6, 0, Math.PI*2, true); 
				ctx.fill();
				ctx.fillStyle="#000000"; 
				ctx.beginPath();
				ctx.arc(this.x-this.RADIUS/3, this.y-this.RADIUS/5-this.RADIUS/6, this.RADIUS/6, 0, Math.PI*2, true); 
				ctx.fill();
				break;

			case RIGHT:
				ctx.fillStyle="#000000"; 
				ctx.beginPath();
				ctx.arc(this.x+this.RADIUS/3+this.RADIUS/5, this.y-this.RADIUS/5, this.RADIUS/6, 0, Math.PI*2, true); 
				ctx.fill();
				ctx.fillStyle="#000000"; 
				ctx.beginPath();
				ctx.arc(this.x-this.RADIUS/3+this.RADIUS/15, this.y-this.RADIUS/5, this.RADIUS/6, 0, Math.PI*2, true); 
				ctx.fill();	
				break;
		}
	}	
};

Ghost.prototype.MOVEstep = function() 
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
			Ychanged = this.y + this.SPEED;
			if(Ychanged + this.RADIUS + wheight < Cheight) 
			{
				this.y = Ychanged;
			}
			break;
		
		case LEFT:
			Xchanged = this.x - this.SPEED;
			if(Xchanged - this.RADIUS - wheight > 0 )
			{
				this.x = Xchanged;
			}
			break;
		
		case UP:
			Ychanged = this.y  - this.SPEED;
			if(Ychanged - this.RADIUS - wheight > 0)
			{
				this.y = Ychanged;
			}
			break;

		case RIGHT:
			Xchanged = this.x + this.SPEED;
			if(Xchanged + this.RADIUS + wheight < Cwidth)
			{
				this.x = Xchanged;
			}
			break;
		
		default:
			break;
	}
};

Ghost.prototype.TURNback = function()
{
	this.D = REVERSEdirection(this.D);
};

Ghost.prototype.FOLLOWpacman = function() 
{
	this.MOVEfollowPAC(true);
};


Ghost.prototype.RANDOMmove_ghost = function()
{
	this.RANDOMmove();
};

Ghost.prototype.MOVEfollowPAC = function(PACMAN_followed) {
	var LARGEdistance = Cwidth*Cheight;
	var	DOWN_d;
	var LEFT_d;
	var UP_d;
	var RIGHT_d;
	var DIRECTcurrent = this.D;
	var smallestDISTANCE = LARGEdistance;
	
	if(DIRECTcurrent === DOWN || !MOVEability(this.x, this.y, UP))
	{
		UP_d = LARGEdistance;
	}
	else{
		UP_d = this.GETpacmanDISTANCE(UP,PACMAN_followed);
	}

	if(DIRECTcurrent === LEFT || !MOVEability(this.x, this.y, RIGHT))
	{
		RIGHT_d = LARGEdistance;
	}
	else
	{
		RIGHT_d = this.GETpacmanDISTANCE(RIGHT,PACMAN_followed);
	}
	
	if(DIRECTcurrent === UP || !MOVEability(this.x, this.y, DOWN))
	{
		DOWN_d = LARGEdistance;
	}
	else
	{
		DOWN_d = this.GETpacmanDISTANCE(DOWN, PACMAN_followed);
	}
	
	if(DIRECTcurrent === RIGHT || !MOVEability(this.x, this.y, LEFT))
	{
		LEFT_d = LARGEdistance;
	}
	else
	{
		LEFT_d = this.GETpacmanDISTANCE(LEFT,PACMAN_followed);
	}
	this.D = DIRECTcurrent;
	smallestDISTANCE = Math.min(Math.min(LEFT_d, RIGHT_d), Math.min(UP_d, DOWN_d));
	switch(smallestDISTANCE)
	{
		case DOWN_d:
			this.D = DOWN;
			break;
		case LEFT_d:
			this.D = LEFT;
			break;
		case UP_d:
			this.D = UP;
			break;
		case RIGHT_d:
			this.D = RIGHT;
			break;
	}
	this.MOVEstep();
};

Ghost.prototype.GETpacmanDISTANCE = function(D, PACMAN_followed)
 {
	var RETURNdist = 0;
	this.D = D;
	this.MOVEstep();
	if(PACMAN_followed)
	{
		RETURNdist = Math.sqrt(Math.pow( (this.x - PACMAN.x)  ,2)+Math.pow( this.y -PACMAN.y,2));
	}
	else
	{
		switch(PACMAN.D)
		{
			case DOWN:
				RETURNdist = Math.sqrt(Math.pow( (this.x - PACMAN.x)  ,2)+Math.pow( this.y - (PACMAN.y  + 4*Gheight),2));
				break;
			case LEFT:
				RETURNdist = Math.sqrt(Math.pow( (this.x - (PACMAN.x - 4*Gwidth))  ,2)+Math.pow( this.y -PACMAN.y,2));
				break;
			case UP:
				RETURNdist = Math.sqrt(Math.pow( (this.x - PACMAN.x)  ,2)+Math.pow( this.y - (PACMAN.y - 4*Gheight),2));
				break;
			case RIGHT:
				RETURNdist = Math.sqrt(Math.pow( (this.x - (PACMAN.x + 4*Gwidth))  ,2)+Math.pow( this.y -PACMAN.y,2));
				break;
			default:
				RETURNdist = Math.sqrt(Math.pow( (this.x - PACMAN.x)  ,2)+Math.pow( this.y -PACMAN.y,2));
				break;
		}
	}
	this.TURNback();
	this.MOVEstep();
	return RETURNdist;
};

Ghost.prototype.RANDOMmove = function() {
	var DIRECTnext =  parseInt(Math.random()*4)+1;
	while(true)
	{
		if( DIRECTnext != REVERSEdirection(this.D) 
			&& MOVEability(this.x, this.y, DIRECTnext))
		{
			break;
		}
		DIRECTnext =  parseInt(Math.random()*4)+1;
	}
	this.D = DIRECTnext;
	this.MOVEstep();
};

Ghost.prototype.MOVE = function() 
{
	this.isMoving = !this.isMoving;
	if(this.isWeak)
	{
		this.SPEED = SPEED/2;
		if(WEAKcount === WEAKtime)
		{
			this.D = REVERSEdirection(this.D);
		}
		if(CENTER(this.x, this.y) === false)
		{
			this.MOVEstep();
		}
		else
		{
			var CURRENTblock = BLOCKS[ROWindex(this.y)][COLindex(this.x)];
			if(CURRENTblock.TYPblock === TRB_wall)
			{
				this.D = LEFT;
				this.MOVEstep();
			}
			else if(CURRENTblock.TYPblock === LTR_wall)
			{
				this.D = DOWN;
				this.MOVEstep();
			}
			else if(CURRENTblock.TYPblock === BLT_wall)
			{
				this.D = RIGHT;
				this.MOVEstep();
			}
			else if(CURRENTblock.TYPblock === RBL_wall)
			{
				this.D = UP;
				this.MOVEstep();
			}
			else
			{
				this.RANDOMmove();
			}
		}
		this.COUNTsteps++;
	}
	else
	{
		if(this.COUNTsteps != 0 && this.COUNTsteps % 2 !=0)
		{
			this.SPEED = SPEED/2;
			this.COUNTsteps = 0;
		}
		else
		{
			this.SPEED = SPEED;
		}
		
		if(CENTER(this.x, this.y) === false)
		{
			this.MOVEstep();
		}
		else
		{
			var CURRENTblock = BLOCKS[ROWindex(this.y)][COLindex(this.x)];
			if(CURRENTblock.TYPblock === TRB_wall)
			{
				this.D = LEFT;
				this.MOVEstep();
			}
			else if(CURRENTblock.TYPblock === LTR_wall)
			{
				this.D = DOWN;
				this.MOVEstep();
			}
			else if(CURRENTblock.TYPblock === BLT_wall)
			{
				this.D = RIGHT;
				this.MOVEstep();
			}
			else if(CURRENTblock.TYPblock === RBL_wall)
			{
				this.D = UP;
				this.MOVEstep();
			}
			else
			{
				switch(this.color)
				{
					case BLUE:
					case BROWN:
					this.RANDOMmove_ghost();
					break;
					
					case PURPLE:
					case GREEN:
					this.FOLLOWpacman();
					break;
				}
			}
		}
	}

};
