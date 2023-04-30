// replaces code in some function
window["insertIntoFunction"] = function(funcName, where, code) {
  window[funcName] = new Function (
    window[funcName].toString().match(/{([\s\S]*)}/)[1].replace(where, code)
  );
}

// typically, if the player is above the "regular" screen and hits a block, they'll automatically
// teleport to the top cell. this looks incredibly weird with a real camera, so replace the code resposible.

// could be considered cheating? 
insertIntoFunction('oef','bird.y = -(cell_size + 12*2);','')


// the rest of this code takes place inside of the game loop 

let old = oef

oef = function() {
  old() 

  // make sure to reset the ground height, otherwise shenanigans will ensue
  ground.canvas.style.top = (hh - 88) 

  
  // (this is midway up the screen, accounting for the floor size)
  let thresh = (hh - 102) - window.innerHeight/2 - 51
  // if the player is in the bottom region of the screen we keep the camera normal
  if (bird.y > thresh) return
  if (!game.started && !game.ended) return

  // otherwise it locks there and everything else scrolls
  bird.div.style.top = thresh
  
  for (var i=0; i<walls.length; i++) {
    for (var j=0; j<walls[i].cells.length; j++) {
      let cell = walls[i].cells[j] 
      cell.div.style.top = cell.y - bird.y + thresh + 'px'
    }
  }
  ground.canvas.style.top = (hh - 88) - bird.y + thresh + 'px'
}
