for(code in KEY_CODES={32:"space",37:"left",38:"up",39:"right",40:"down",70:"f",71:"g",72:"h",77:"m",80:"p"},KEY_STATUS={keyDown:!1},KEY_CODES)KEY_STATUS[KEY_CODES[code]]=!1;for(var sfx in $(window).keydown((function(t){KEY_STATUS.keyDown=!0,KEY_CODES[t.keyCode]&&(t.preventDefault(),KEY_STATUS[KEY_CODES[t.keyCode]]=!0)})).keyup((function(t){KEY_STATUS.keyDown=!1,KEY_CODES[t.keyCode]&&(t.preventDefault(),KEY_STATUS[KEY_CODES[t.keyCode]]=!1)})),GRID_SIZE=60,Matrix=function(t,i){var e,s;for(this.data=new Array(t),e=0;e<t;e++)this.data[e]=new Array(i);this.configure=function(t,i,e,s){var n=t*Math.PI/180,h=Math.sin(n)*i,o=Math.cos(n)*i;this.set(o,-h,e,h,o,s)},this.set=function(){var n=0;for(e=0;e<t;e++)for(s=0;s<i;s++)this.data[e][s]=arguments[n],n++},this.multiply=function(){var n=new Array(t);for(e=0;e<t;e++)for(n[e]=0,s=0;s<i;s++)n[e]+=this.data[e][s]*arguments[s];return n}},Sprite=function(){this.init=function(t,i){this.name=t,this.points=i,this.vel={x:0,y:0,rot:0},this.acc={x:0,y:0,rot:0}},this.children={},this.visible=!1,this.reap=!1,this.bridgesH=!0,this.bridgesV=!0,this.collidesWith=[],this.x=0,this.y=0,this.rot=0,this.scale=1,this.currentNode=null,this.nextSprite=null,this.preMove=null,this.postMove=null,this.run=function(t){this.move(t),this.updateGrid(),this.context.save(),this.configureTransform(),this.draw();var i=this.findCollisionCanidates();this.matrix.configure(this.rot,this.scale,this.x,this.y),this.checkCollisionsAgainst(i),this.context.restore(),this.bridgesH&&this.currentNode&&this.currentNode.dupe.horizontal&&(this.x+=this.currentNode.dupe.horizontal,this.context.save(),this.configureTransform(),this.draw(),this.checkCollisionsAgainst(i),this.context.restore(),this.currentNode&&(this.x-=this.currentNode.dupe.horizontal)),this.bridgesV&&this.currentNode&&this.currentNode.dupe.vertical&&(this.y+=this.currentNode.dupe.vertical,this.context.save(),this.configureTransform(),this.draw(),this.checkCollisionsAgainst(i),this.context.restore(),this.currentNode&&(this.y-=this.currentNode.dupe.vertical)),this.bridgesH&&this.bridgesV&&this.currentNode&&this.currentNode.dupe.vertical&&this.currentNode.dupe.horizontal&&(this.x+=this.currentNode.dupe.horizontal,this.y+=this.currentNode.dupe.vertical,this.context.save(),this.configureTransform(),this.draw(),this.checkCollisionsAgainst(i),this.context.restore(),this.currentNode&&(this.x-=this.currentNode.dupe.horizontal,this.y-=this.currentNode.dupe.vertical))},this.move=function(t){this.visible&&(this.transPoints=null,$.isFunction(this.preMove)&&this.preMove(t),this.vel.x+=this.acc.x*t,this.vel.y+=this.acc.y*t,this.x+=this.vel.x*t,this.y+=this.vel.y*t,this.rot+=this.vel.rot*t,this.rot>360?this.rot-=360:this.rot<0&&(this.rot+=360),$.isFunction(this.postMove)&&this.postMove(t))},this.updateGrid=function(){if(this.visible){var t=Math.floor(this.x/GRID_SIZE),i=Math.floor(this.y/GRID_SIZE);t=t>=this.grid.length?0:t,i=i>=this.grid[0].length?0:i,t=t<0?this.grid.length-1:t,i=i<0?this.grid[0].length-1:i;var e=this.grid[t][i];e!=this.currentNode&&(this.currentNode&&this.currentNode.leave(this),e.enter(this),this.currentNode=e),KEY_STATUS.g&&this.currentNode&&(this.context.lineWidth=3,this.context.strokeStyle="green",this.context.strokeRect(t*GRID_SIZE+2,i*GRID_SIZE+2,GRID_SIZE-4,GRID_SIZE-4),this.context.strokeStyle="black",this.context.lineWidth=1)}},this.configureTransform=function(){if(this.visible){var t=this.rot*Math.PI/180;this.context.translate(this.x,this.y),this.context.rotate(t),this.context.scale(this.scale,this.scale)}},this.draw=function(){if(this.visible){for(child in this.context.lineWidth=1/this.scale,this.children)this.children[child].draw();this.context.beginPath(),this.context.moveTo(this.points[0],this.points[1]);for(var t=1;t<this.points.length/2;t++){var i=2*t,e=i+1;this.context.lineTo(this.points[i],this.points[e])}this.context.closePath(),this.context.stroke()}},this.findCollisionCanidates=function(){if(!this.visible||!this.currentNode)return[];var t=this.currentNode,i=[];return t.nextSprite&&i.push(t.nextSprite),t.north.nextSprite&&i.push(t.north.nextSprite),t.south.nextSprite&&i.push(t.south.nextSprite),t.east.nextSprite&&i.push(t.east.nextSprite),t.west.nextSprite&&i.push(t.west.nextSprite),t.north.east.nextSprite&&i.push(t.north.east.nextSprite),t.north.west.nextSprite&&i.push(t.north.west.nextSprite),t.south.east.nextSprite&&i.push(t.south.east.nextSprite),t.south.west.nextSprite&&i.push(t.south.west.nextSprite),i},this.checkCollisionsAgainst=function(t){for(var i=0;i<t.length;i++){var e=t[i];do{this.checkCollision(e),e=e.nextSprite}while(e)}},this.checkCollision=function(t){if(t.visible&&this!=t&&-1!=this.collidesWith.indexOf(t.name))for(var i,e,s=t.transformedPoints(),n=s.length/2,h=0;h<n;h++)if(i=s[2*h],e=s[2*h+1],$.browser.mozilla?this.pointInPolygon(i,e):this.context.isPointInPath(i,e))return t.collision(this),void this.collision(t)},this.pointInPolygon=function(t,i){for(var e,s,n=this.transformedPoints(),h=2,o=!1,r=0;r<n.length;r+=2)e=n[r+1],s=n[h+1],(e<i&&s>=i||s<i&&e>=i)&&n[r]+(i-e)/(s-e)*(n[h]-n[r])<t&&(o=!o),(h+=2)==n.length&&(h=0);return o},this.collision=function(){},this.die=function(){this.visible=!1,this.reap=!0,this.currentNode&&(this.currentNode.leave(this),this.currentNode=null)},this.transformedPoints=function(){if(this.transPoints)return this.transPoints;var t=new Array(this.points.length);this.matrix.configure(this.rot,this.scale,this.x,this.y);for(var i=0;i<this.points.length/2;i++){var e=2*i,s=e+1,n=this.matrix.multiply(this.points[e],this.points[s],1);t[e]=n[0],t[s]=n[1]}return this.transPoints=t,t},this.isClear=function(){if(0==this.collidesWith.length)return!0;var t=this.currentNode;if(null==t){var i=Math.floor(this.x/GRID_SIZE),e=Math.floor(this.y/GRID_SIZE);i=i>=this.grid.length?0:i,e=e>=this.grid[0].length?0:e,t=this.grid[i][e]}return t.isEmpty(this.collidesWith)&&t.north.isEmpty(this.collidesWith)&&t.south.isEmpty(this.collidesWith)&&t.east.isEmpty(this.collidesWith)&&t.west.isEmpty(this.collidesWith)&&t.north.east.isEmpty(this.collidesWith)&&t.north.west.isEmpty(this.collidesWith)&&t.south.east.isEmpty(this.collidesWith)&&t.south.west.isEmpty(this.collidesWith)},this.wrapPostMove=function(){this.x>Game.canvasWidth?this.x=0:this.x<0&&(this.x=Game.canvasWidth),this.y>Game.canvasHeight?this.y=0:this.y<0&&(this.y=Game.canvasHeight)}},Ship=function(){this.init("ship",[-5,4,0,-12,5,4]),this.children.exhaust=new Sprite,this.children.exhaust.init("exhaust",[-3,6,0,11,3,6]),this.bulletCounter=0,this.postMove=this.wrapPostMove,this.collidesWith=["asteroid","bigalien","alienbullet"],this.preMove=function(t){if(KEY_STATUS.left?this.vel.rot=-6:KEY_STATUS.right?this.vel.rot=6:this.vel.rot=0,KEY_STATUS.up){var i=(this.rot-90)*Math.PI/180;this.acc.x=.5*Math.cos(i),this.acc.y=.5*Math.sin(i),this.children.exhaust.visible=Math.random()>.1}else this.acc.x=0,this.acc.y=0,this.children.exhaust.visible=!1;if(this.bulletCounter>0&&(this.bulletCounter-=t),KEY_STATUS.space&&this.bulletCounter<=0){this.bulletCounter=10;for(var e=0;e<this.bullets.length;e++)if(!this.bullets[e].visible){SFX.laser();var s=this.bullets[e],n=(i=(this.rot-90)*Math.PI/180,Math.cos(i)),h=Math.sin(i);s.x=this.x+4*n,s.y=this.y+4*h,s.vel.x=6*n+this.vel.x,s.vel.y=6*h+this.vel.y,s.visible=!0;break}}Math.sqrt(this.vel.x*this.vel.x+this.vel.y*this.vel.y)>8&&(this.vel.x*=.95,this.vel.y*=.95)},this.collision=function(t){SFX.explosion(),Game.explosionAt(t.x,t.y),Game.FSM.state="player_died",this.visible=!1,this.currentNode.leave(this),this.currentNode=null,Game.lives--}},Ship.prototype=new Sprite,BigAlien=function(){this.init("bigalien",[-20,0,-12,-4,12,-4,20,0,12,4,-12,4,-20,0,20,0]),this.children.top=new Sprite,this.children.top.init("bigalien_top",[-8,-4,-6,-6,6,-6,8,-4]),this.children.top.visible=!0,this.children.bottom=new Sprite,this.children.bottom.init("bigalien_top",[8,4,6,6,-6,6,-8,4]),this.children.bottom.visible=!0,this.collidesWith=["asteroid","ship","bullet"],this.bridgesH=!1,this.bullets=[],this.bulletCounter=0,this.newPosition=function(){Math.random()<.5?(this.x=-20,this.vel.x=1.5):(this.x=Game.canvasWidth+20,this.vel.x=-1.5),this.y=Math.random()*Game.canvasHeight},this.setup=function(){this.newPosition();for(var t=0;t<3;t++){var i=new AlienBullet;this.bullets.push(i),Game.sprites.push(i)}},this.preMove=function(t){var i=this.currentNode;if(null!=i){var e=0;i.north.nextSprite&&e++,i.north.east.nextSprite&&e++,i.north.west.nextSprite&&e++;var s=0;if(i.south.nextSprite&&s++,i.south.east.nextSprite&&s++,i.south.west.nextSprite&&s++,e>s?this.vel.y=1:e<s?this.vel.y=-1:Math.random()<.01&&(this.vel.y=-this.vel.y),this.bulletCounter-=t,this.bulletCounter<=0){this.bulletCounter=22;for(var n=0;n<this.bullets.length;n++)if(!this.bullets[n].visible){bullet=this.bullets[n];var h=2*Math.PI*Math.random(),o=Math.cos(h),r=Math.sin(h);bullet.x=this.x,bullet.y=this.y,bullet.vel.x=6*o,bullet.vel.y=6*r,bullet.visible=!0,SFX.laser();break}}}},BigAlien.prototype.collision=function(t){"bullet"==t.name&&(Game.score+=200),SFX.explosion(),Game.explosionAt(t.x,t.y),this.visible=!1,this.newPosition()},this.postMove=function(){this.y>Game.canvasHeight?this.y=0:this.y<0&&(this.y=Game.canvasHeight),(this.vel.x>0&&this.x>Game.canvasWidth+20||this.vel.x<0&&this.x<-20)&&(this.visible=!1,this.newPosition())}},BigAlien.prototype=new Sprite,Bullet=function(){this.init("bullet",[0,0]),this.time=0,this.bridgesH=!1,this.bridgesV=!1,this.postMove=this.wrapPostMove,this.configureTransform=function(){},this.draw=function(){this.visible&&(this.context.save(),this.context.lineWidth=2,this.context.beginPath(),this.context.moveTo(this.x-1,this.y-1),this.context.lineTo(this.x+1,this.y+1),this.context.moveTo(this.x+1,this.y-1),this.context.lineTo(this.x-1,this.y+1),this.context.stroke(),this.context.restore())},this.preMove=function(t){this.visible&&(this.time+=t),this.time>50&&(this.visible=!1,this.time=0)},this.collision=function(t){this.time=0,this.visible=!1,this.currentNode.leave(this),this.currentNode=null},this.transformedPoints=function(t){return[this.x,this.y]}},Bullet.prototype=new Sprite,AlienBullet=function(){this.init("alienbullet"),this.draw=function(){this.visible&&(this.context.save(),this.context.lineWidth=2,this.context.beginPath(),this.context.moveTo(this.x,this.y),this.context.lineTo(this.x-this.vel.x,this.y-this.vel.y),this.context.stroke(),this.context.restore())}},AlienBullet.prototype=new Bullet,Asteroid=function(){this.init("asteroid",[-10,0,-5,7,-3,4,1,10,5,4,10,0,5,-6,2,-10,-4,-10,-4,-5]),this.visible=!0,this.scale=6,this.postMove=this.wrapPostMove,this.collidesWith=["ship","bullet","bigalien","alienbullet"],this.collision=function(t){if(SFX.explosion(),"bullet"==t.name&&(Game.score+=120/this.scale),this.scale/=3,this.scale>.5)for(var i=0;i<3;i++){var e=$.extend(!0,{},this);e.vel.x=6*Math.random()-3,e.vel.y=6*Math.random()-3,Math.random()>.5&&e.points.reverse(),e.vel.rot=2*Math.random()-1,e.move(3*e.scale),Game.sprites.push(e)}Game.explosionAt(t.x,t.y),this.die()}},Asteroid.prototype=new Sprite,Explosion=function(){this.init("explosion"),this.bridgesH=!1,this.bridgesV=!1,this.lines=[];for(var t=0;t<5;t++){var i=2*Math.PI*Math.random(),e=Math.cos(i),s=Math.sin(i);this.lines.push([e,s,2*e,2*s])}this.draw=function(){if(this.visible){this.context.save(),this.context.lineWidth=1/this.scale,this.context.beginPath();for(var t=0;t<5;t++){var i=this.lines[t];this.context.moveTo(i[0],i[1]),this.context.lineTo(i[2],i[3])}this.context.stroke(),this.context.restore()}},this.preMove=function(t){this.visible&&(this.scale+=t),this.scale>8&&this.die()}},Explosion.prototype=new Sprite,GridNode=function(){this.north=null,this.south=null,this.east=null,this.west=null,this.nextSprite=null,this.dupe={horizontal:null,vertical:null},this.enter=function(t){t.nextSprite=this.nextSprite,this.nextSprite=t},this.leave=function(t){for(var i=this;i&&i.nextSprite!=t;)i=i.nextSprite;i&&(i.nextSprite=t.nextSprite,t.nextSprite=null)},this.eachSprite=function(t,i){for(var e=this;e.nextSprite;)e=e.nextSprite,i.call(t,e)},this.isEmpty=function(t){for(var i=!0,e=this;e.nextSprite&&(i=!(e=e.nextSprite).visible||-1==t.indexOf(e.name)););return i}},Text={renderGlyph:function(t,i,e){var s=i.glyphs[e];if(s.o){var n;s.cached_outline?n=s.cached_outline:(n=s.o.split(" "),s.cached_outline=n);for(var h=n.length,o=0;o<h;){switch(n[o++]){case"m":t.moveTo(n[o++],n[o++]);break;case"l":t.lineTo(n[o++],n[o++]);break;case"q":var r=n[o++],a=n[o++];t.quadraticCurveTo(n[o++],n[o++],r,a);break;case"b":var l=n[o++],c=n[o++];t.bezierCurveTo(n[o++],n[o++],n[o++],n[o++],l,c)}}}s.ha&&t.translate(s.ha,0)},renderText:function(t,i,e,s){this.context.save(),this.context.translate(e,s);var n=72*i/(100*this.face.resolution);this.context.scale(n,-1*n),this.context.beginPath();for(var h=t.split(""),o=h.length,r=0;r<o;r++)this.renderGlyph(this.context,this.face,h[r]);this.context.fill(),this.context.restore()},context:null,face:null},SFX={laser:new Audio("39459__THE_bizniss__laser.wav"),explosion:new Audio("51467__smcameron__missile_explosion.wav")},SFX)!function(){var t=SFX[sfx];t.muted=!0,t.play(),SFX[sfx]=function(){return this.muted||(0==t.duration?(t.load(),t.play()):(t.muted=!1,t.currentTime=0)),t}}();SFX.muted=!0,Game={score:0,totalAsteroids:5,lives:0,canvasWidth:800,canvasHeight:600,sprites:[],ship:null,bigAlien:null,nextBigAlienTime:null,spawnAsteroids:function(t){t||(t=this.totalAsteroids);for(var i=0;i<t;i++){var e=new Asteroid;for(e.x=Math.random()*this.canvasWidth,e.y=Math.random()*this.canvasHeight;!e.isClear();)e.x=Math.random()*this.canvasWidth,e.y=Math.random()*this.canvasHeight;e.vel.x=4*Math.random()-2,e.vel.y=4*Math.random()-2,Math.random()>.5&&e.points.reverse(),e.vel.rot=2*Math.random()-1,Game.sprites.push(e)}},explosionAt:function(t,i){var e=new Explosion;e.x=t,e.y=i,e.visible=!0,Game.sprites.push(e)},FSM:{boot:function(){Game.spawnAsteroids(5),this.state="waiting"},waiting:function(){Text.renderText(window.ipad?"Touch Screen to Start":"Press Space to Start",36,Game.canvasWidth/2-270,Game.canvasHeight/2),(KEY_STATUS.space||window.gameStart)&&(KEY_STATUS.space=!1,window.gameStart=!1,this.state="start")},start:function(){for(var t=0;t<Game.sprites.length;t++)"asteroid"==Game.sprites[t].name?Game.sprites[t].die():"bullet"!=Game.sprites[t].name&&"bigalien"!=Game.sprites[t].name||(Game.sprites[t].visible=!1);Game.score=0,Game.lives=2,Game.totalAsteroids=2,Game.spawnAsteroids(),Game.nextBigAlienTime=Date.now()+3e4+3e4*Math.random(),this.state="spawn_ship"},spawn_ship:function(){Game.ship.x=Game.canvasWidth/2,Game.ship.y=Game.canvasHeight/2,Game.ship.isClear()&&(Game.ship.rot=0,Game.ship.vel.x=0,Game.ship.vel.y=0,Game.ship.visible=!0,this.state="run")},run:function(){for(var t=0;t<Game.sprites.length&&"asteroid"!=Game.sprites[t].name;t++);t==Game.sprites.length&&(this.state="new_level"),!Game.bigAlien.visible&&Date.now()>Game.nextBigAlienTime&&(Game.bigAlien.visible=!0,Game.nextBigAlienTime=Date.now()+3e4*Math.random())},new_level:function(){null==this.timer&&(this.timer=Date.now()),Date.now()-this.timer>1e3&&(this.timer=null,Game.totalAsteroids++,Game.totalAsteroids>12&&(Game.totalAsteroids=12),Game.spawnAsteroids(),this.state="run")},player_died:function(){Game.lives<0?this.state="end_game":(null==this.timer&&(this.timer=Date.now()),Date.now()-this.timer>1e3&&(this.timer=null,this.state="spawn_ship"))},end_game:function(){Text.renderText("GAME OVER",50,Game.canvasWidth/2-160,Game.canvasHeight/2+10),null==this.timer&&(this.timer=Date.now()),Date.now()-this.timer>5e3&&(this.timer=null,this.state="waiting"),window.gameStart=!1},execute:function(){this[this.state]()},state:"boot"}},$((function(){var t=$("#canvas");Game.canvasWidth=t.width(),Game.canvasHeight=t.height();var i=t[0].getContext("2d");Text.context=i,Text.face=vector_battle;for(var e=Math.round(Game.canvasWidth/GRID_SIZE),s=Math.round(Game.canvasHeight/GRID_SIZE),n=new Array(e),h=0;h<e;h++){n[h]=new Array(s);for(var o=0;o<s;o++)n[h][o]=new GridNode}for(h=0;h<e;h++)for(o=0;o<s;o++){var r=n[h][o];r.north=n[h][0==o?s-1:o-1],r.south=n[h][o==s-1?0:o+1],r.west=n[0==h?e-1:h-1][o],r.east=n[h==e-1?0:h+1][o]}for(h=0;h<e;h++)n[h][0].dupe.vertical=Game.canvasHeight,n[h][s-1].dupe.vertical=-Game.canvasHeight;for(o=0;o<s;o++)n[0][o].dupe.horizontal=Game.canvasWidth,n[e-1][o].dupe.horizontal=-Game.canvasWidth;var a=[];Game.sprites=a,Sprite.prototype.context=i,Sprite.prototype.grid=n,Sprite.prototype.matrix=new Matrix(2,3);var l=new Ship;l.x=Game.canvasWidth/2,l.y=Game.canvasHeight/2,a.push(l),l.bullets=[];for(h=0;h<10;h++){var c=new Bullet;l.bullets.push(c),a.push(c)}Game.ship=l;var u=new BigAlien;u.setup(),a.push(u),Game.bigAlien=u;var d=new Ship;d.scale=.6,d.visible=!0,d.preMove=null,d.children=[];o=0;var v,p,m,x=!1,f=!1,S=0,w=0,g=0,b=Date.now(),y=t[0];window.requestAnimFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t,i){window.setTimeout(t,1e3/60)};var G=function(){if(i.clearRect(0,0,Game.canvasWidth,Game.canvasHeight),Game.FSM.execute(),KEY_STATUS.g){i.beginPath();for(var t=0;t<e;t++)i.moveTo(t*GRID_SIZE,0),i.lineTo(t*GRID_SIZE,Game.canvasHeight);for(var n=0;n<s;n++)i.moveTo(0,n*GRID_SIZE),i.lineTo(Game.canvasWidth,n*GRID_SIZE);i.closePath(),i.stroke()}for(v=Date.now(),p=v-b,b=v,m=p/30,t=0;t<a.length;t++)a[t].run(m),a[t].reap&&(a[t].reap=!1,a.splice(t,1),t--);var h=""+Game.score;for(Text.renderText(h,18,Game.canvasWidth-14*h.length,20),t=0;t<Game.lives;t++)i.save(),d.x=Game.canvasWidth-8*(t+1),d.y=32,d.configureTransform(),d.draw(),i.restore();f&&Text.renderText(""+S,24,Game.canvasWidth-38,Game.canvasHeight-2),w++,(g+=p)>1e3&&(g-=1e3,S=w,w=0),x?Text.renderText("PAUSED",72,Game.canvasWidth/2-160,120):requestAnimFrame(G,y)};G(),$(window).keydown((function(t){switch(KEY_CODES[t.keyCode]){case"f":f=!f;break;case"p":(x=!x)||(b=Date.now(),G());break;case"m":SFX.muted=!SFX.muted}}))}));