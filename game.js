/* global $ */
/*
1 Fighter
2 Cruiser
3 Dreadnought
4 Damaged Dreadnought
*/

const showLog = false
const battles = 1000
let p_wins = 0
let e_wins = 0
let draws = 0

const fleet_player = [1,1,1,1,1,2,2,2,2,3,3,3]
const fleet_enemy = [1,1,1,1,2,2,2,2,3,3,3,3]

print('Battle Simulator')
print('=====================================================================')
print('Player'+printCurrentFleet(fleet_player))
print('Ememy'+printCurrentFleet(fleet_enemy))
if(battles > 1) print(`Simulating ${battles} battles...`)
else print('Combat starts...')

// combat simulation
for (var i = 0; i < battles; i++) {

  let P = [...fleet_player]
  let E = [...fleet_enemy]
  let round = 1;

  while(P.length > 0 && E.length > 0){
    showLog && print(`Round ${round} starts...`)

    const p = [...P], e = [...E]; // helpers so they can shoot at same time
    E = assignHits(e, calcHits(p));
    P = assignHits(p, calcHits(e));
    showLog && print('Player'+printCurrentFleet(P))
    showLog && print('Player'+printCurrentFleet(P))

    if(!P.length && !E.length) {
      showLog && print('This was a draw!')
      showLog && print('All ships lost!')
      showLog && print('Combat ends...')
      draws++;
      break;
    }
    if(!P.length) {
      showLog && print('Player looses!')
      showLog && print('Remaining Enemy'+printCurrentFleet(E))
      showLog && print('Combat ends...')
      p_wins++;
      break;
    }
    if(!E.length){
      showLog && print('Player wins!')
      showLog && print('Remaining Player'+printCurrentFleet(P))
      showLog && print('Combat ends...')
      e_wins++;
      break;
    }
    round++
  }
}

if(battles > 1) print(`${battles} Battles: Player won ${p_wins} times,
Enemy won ${e_wins} times. ${draws} Draws.`)

function assignHits(fleet, number){
  for (var i = 0; i < number; i++) {
    if(!fleet.length) break
    const index = Math.floor(Math.random() * fleet.length)
    const target = fleet[index];
    fleet.splice(index, 1)
    if(target === 3) fleet.push(4) // add damaged dreadnought if undamaged
  }
  return fleet
}

function calcHits(fleet){
  let hits = 0
  for(let i=0; i<(count(fleet, 3) + count(fleet, 4)); i++){ if(calcHit(5)) hits++; }
  for(let i=0; i<(count(fleet, 2)); i++){ if(calcHit(7)) hits++; }
  for(let i=0; i<(count(fleet, 3)); i++){ if(calcHit(9)) hits++; }
  return hits
}

function calcHit(battlevalue){
  return battlevalue > Math.floor(Math.random() * 10);
}

function count(fleet, type=null){
  if(!type) return fleet.length;
  return fleet.filter(i => i===type).length
}

function printCurrentFleet(fleet){
  return ` Fleet: ${count(fleet, 3)} Dreadnoughts (${count(fleet, 4)} damaged),
  ${count(fleet, 2)} Cruisers, ${count(fleet, 1)} Fighters`
}

function print(output){
  $('#output').append('<p>'+output+'</p>');
}