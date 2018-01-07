const pcolor1 = ['black', 'olive', 'red', 'orange'];
const pcolor2 = ['lime', 'rose', 'yellow'];
const pcolor3 = ['black', 'yellow', 'red', 'purple'];

var nbBulles=0;
var bulles=[];

var nbPoissons=0;
var poissons=[];

var nbPoissonsL=0;
var poissonsL=[];

var nbSerpents=0;
var serpents=[];

function setup() {
  smooth();
  createCanvas(600, 400);
  frameRate(45);
}

function draw() {
  background(0,204,203);

  noStroke();
  fill(203, 255, 0);
  rect(0,300,600,100);

  if(nbPoissons<7)
  {
    poissons.push(new poisson());
    nbPoissons++;
  }

  for(i=0;i<nbPoissons;i++)
  {
    poissons[i].slide();
    poissons[i].move();
    poissons[i].display();
    poissons[i].switch();
  }

  /*if(nbSerpents<1)
  {
    serpents.push(new serpent());
    nbSerpents++;
  }

  for(i=0;i<nbSerpents;i++)
  {
    serpents[i].display();
    serpents[i].move();
  }*/

  if(nbPoissonsL<5)
  {
    poissonsL.push(new poissonL());
    nbPoissonsL++;
  }

  for(i=0;i<nbPoissonsL;i++)
  {
    poissonsL[i].slide();
    poissonsL[i].growth();
    poissonsL[i].move();
    poissonsL[i].display();
  }


  if(nbBulles<25)
  {
    bulles.push(new bulle());
    nbBulles++;
  }

  for(i=0;i<nbBulles;i++)
  {
    if(bulles[i].y<0)
    {
      bulles[i].x=random(0,600);
      bulles[i].y=random(150,400);
      bulles[i].t=5;
    }
  }

  for(i=0;i<nbBulles;i++)
  {
    bulles[i].move();
    bulles[i].display();
  }
}

function bulle()
{
//-----------------------------//
  this.x=random(0,600);
  this.y=random(50,400);
  this.t=5;
//-----------------------------//

  this.display = function() {
    fill(255, 255, 255, 130);
    ellipse(this.x,this.y,this.t);
  };

  this.move = function()
  {
    let marks = [0,1];
    let mark;
    this.y = (this.y-2);
    mark=random(marks);
    print(mark);

    if (mark == 0)
    {
      if (this.t>15)
      {
        this.t=(this.t-1);
      }
      this.t=(this.t-1);
    }

    if (mark == 1)
    {
      if (this.t<15)
      {
        this.t=(this.t+1);
      }
      this.t=(this.t+1);
    }
  }



}

function poisson()
{
  this.x=random(100,500);
  this.y=random(100,300);
  this.t=randomGaussian(45,8);
  this.sens=random([1,-1]);
  this.aim=this.y;
  this.color1=random(pcolor1);
  this.color2=random(pcolor2);
  this.color3=random(pcolor3);

  this.slide = function()
  {
    if(this.aim<this.y+1 && this.aim>this.y-1)
    {
      this.aim=random(50,315);
    }
  }

  this.display = function()
  {
    fill(this.color1);
    ellipse(this.x,this.y,this.t);
    arc(this.x-((this.t/4)*3*this.sens),this.y,this.t,this.t,(-PI/2)*this.sens,(PI/2)*this.sens);

    fill(this.color2);
    arc(this.x-((this.t/4)*3*this.sens),this.y,this.t/2,this.t,(-PI/2)*this.sens,(PI/2)*this.sens);
    arc(this.x-((this.t/4)*this.sens),this.y+(this.t/5),this.t-(this.t/3),this.t/3,(-PI/2)*this.sens,(PI/2)*this.sens);

    fill(this.color3);
    ellipse(this.x-((this.t/25)*this.sens),this.y-(this.t/7),this.t/3,this.t/5);
    ellipse(this.x+((this.t/4)*this.sens),this.y+(this.t/5),this.t/7);

    //----------//
    fill('white');
    ellipse(this.x+((this.t/5)*this.sens),this.y-(this.t/9),this.t/3);
    fill('black');
    ellipse(this.x+((this.t/5)*this.sens)+(this.t/20),this.y-(this.t/9),this.t/7);

  }

  this.move = function()
  {
    this.x=this.x+((50/this.t)*this.sens);

    if(this.y<this.aim)
    {
      this.y=this.y+1
    }

    if(this.y>this.aim)
    {
      this.y=this.y-1;
    }
  }

  this.switch = function()
  {
    if(this.x<-100 || this.x>700)
    {
      this.sens=this.sens*-1;
    }
  }
}

function poissonL()
{
  this.x=random(50,550);
  this.y=random(50,350);
  this.t=random(10,20);
  this.m=this.t;
  this.g=1;
  this.aimx=this.x;
  this.aimy=this.y;
  this.color=random(pcolor1);

  this.slide = function()
  {
    if(this.aimy<this.y+1 && this.aimy>this.y-1)
    {
      this.aimy=random(50,315);
    }

    if(this.aimx<this.x+1 && this.aimx>this.x-1)
    {
      this.aimx=random(50,550);
    }
  }

  this.move = function()
  {
    if(this.x<this.aimx)
    {
      this.x=this.x+1
    }

    if(this.x>this.aimx)
    {
      this.x=this.x-1;
    }

    if(this.y<this.aimy)
    {
      this.y=this.y+1
    }

    if(this.y>this.aimy)
    {
      this.y=this.y-1;
    }
  }

  this.growth = function()
  {
    if(this.g==1){
     if(this.t<this.m*2)
     {
       this.t=this.t+1;
     }
    }

    if(this.g==0){
     if(this.t>this.m)
     {
       this.t=this.t-2;
     }
    }

    if(this.t>=this.m*2)
    {
      this.g=0;
    }

    if(this.t<=this.m)
    {
      this.g=1;
    }



  }

  this.display = function()
  {
    fill(this.color);
    ellipse(this.x,this.y,this.t);
  }
}

function serpent()
{
  this.l=8;
  this.t=10;
  this.sens=(random([-1,1]));
  this.aim=(random([-1,1]));
  this.vaim=random(25,300);
  this.x=[];
  this.y=[];

  for(i=0;i<this.l;i++)
  {
    this.x.push(100);
    this.y.push(100);
  }

  this.display = function()
  {
    fill('red');

    for(i=0;i<this.l;i++)
    {
      ellipse(this.x[i],this.y[i],this.t);
    }
  }

  this.slide = function()
  {
     if(this.vaim+1>this.x[0] && this.vaim-1<this.x[0])
     {
       this.vaim=random(25,300);
     }

    if(this.vaim<this.x)
    {
      this.aim=-1;
    }

    if(this.vaim>this.x)
    {
      this.aim=1;
    }
  }

  this.move = function()
  {
    let xin = this.x;
    let yin = this.y;
    let xout = this.x;
    let yout = this.y;

    this.x[0] += this.sens;
    this.y[0] += this.aim;

    for(i=1;i<this.l;i++)
    {
      xout = this.x[i];
      yout = this.y[i];
      this.x[i] = xin[i]+this.sens;
      this.y[i] = yin[i]+this.aim;
      xin = xout;
      yin = yout;
    }

  }

}
