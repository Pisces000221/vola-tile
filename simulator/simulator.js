var i,j,k,elm,tile;for(i=0;6>i;++i)for(elm=document.getElementById("f"+String.fromCharCode(i+48)),j=0;3>j;++j)for(k=0;3>k;++k)tile=document.createElement("div"),tile.setAttribute("id","tile-"+i.toString()+j.toString()+k.toString()),tile.classList.add("tile"),tile.classList.add("t"+String.fromCharCode(i+48)),tile.style.top=Math.round(160*j/3).toString()+"px",tile.style.left=Math.round(160*k/3).toString()+"px",elm.appendChild(tile);rotor(document.getElementById("cube-display"));var cube=new vtile.cube(3);
function do_move(a){var b,c,d,e,f={F:0,B:1,U:2,D:3,L:4,R:5,M:4,E:3,S:0},g={F:0,B:0,U:0,D:0,L:0,R:0,M:1,E:1,S:1};for(i=0;i<a.length;++i)b=a[i].charAt(0),c=f[b],d=g[b],b=a[i].charAt(a[i].length-1),e="'"===b,b="2"===b,0<=c&&6>c&&0<=d&&3>d&&(cube.turn(c,d,e),b&&cube.turn(c,d,e))}
function move(){var a,b,c;for(a=0;6>a;++a)for(b=0;3>b;++b)for(c=0;3>c;++c)document.getElementById("tile-"+a.toString()+b.toString()+c.toString()).classList.remove("t"+String.fromCharCode(cube.tiles[a][3*b+c]+48));do_move(document.getElementById("cmd-input").value.toUpperCase().split(" "));for(a=0;6>a;++a)for(b=0;3>b;++b)for(c=0;3>c;++c)document.getElementById("tile-"+a.toString()+b.toString()+c.toString()).classList.add("t"+String.fromCharCode(cube.tiles[a][3*b+c]+48))}
var repeating=!1,timer_id,repeat_cnt,cube_stash,start_hash;
function repeat(){repeat_cnt=0;cube_stash=new vtile.cube(3);cube_stash.tiles=cube.tiles;start_hash=cube.hash();document.getElementById("rpt-button").value="Stop";var a=document.getElementById("cmd-input").value.toUpperCase().split(" ");document.getElementById("rpt-display").textContent="";timer_id=setInterval(function(b){return function(){document.getElementById("rpt-display").textContent="Repeating... "+repeat_cnt+" repeats done.";for(var a=0;100>a;++a)if(++repeat_cnt,do_move(b),cube.hash()===start_hash){stop();
break}}}(a),1E3)}function stop(){repeating=!1;clearInterval(timer_id);document.getElementById("rpt-button").value="Repeat";var a="",a=cube.hash()===start_hash?"Backed to initial state after "+repeat_cnt+" repeats.":"Failed to get back after "+repeat_cnt+" repeats, restored.";document.getElementById("rpt-display").textContent=a;cube=cube_stash};
