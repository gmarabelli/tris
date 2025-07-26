let running;
let player;
const cells = document.getElementsByTagName("td");
const result = document.getElementById("result");
const resetBtn = document.getElementById("reset");

for(const cell of cells){
	cell.addEventListener("click", (e) => {
		hit(cell);
	});
}
resetBtn.addEventListener("click", reset);
reset();

function reset(){
	running = true;
	player = "X";
	for(const cell of cells){
		cell.dataset.sign = "";
		cell.classList.remove("win");
	}
	result.innerText = "It's " + player + "'s turn";
	console.log("new game");
}

function hit(cell){
	if(!running){
		return;
	}
	if(cell.dataset.sign !== ""){
		return;
	}
	cell.dataset.sign = player;

	// check rows
	const row = Math.floor(cell.id / 3) * 3;
	if(checktris(cell, range(row, row + 3, 1))){
		return;
	}
	// check columns
	const column = cell.id % 3;
	if(checktris(cell, range(column, 9, 3))){
		return;
	}
	// check diagonals
	if(row === column * 3){
		if(checktris(cell, range(0, 9, 4))){
			return;
		}
	}
	if(row + 3 * column === 6){
		if(checktris(cell, range(2, 7, 2))){
			return;
		}
	}

	if(checkdraw()){
		return;
	}

	switch(player) {
		case "X":
			player = "O";
			break;
		case "O":
			player = "X";
			break;
	}
	result.innerText = "It's " + player + "'s turn";
}

function range(start, end, step){
	return [...Array(Math.ceil((end - start) / step))].map((_, i) => (start + i * step));
}

function checktris(cell, tricell){
	let check = true;
	for(const i of tricell){
		if(cells[i].dataset.sign !== cell.dataset.sign){
			check = false;
			break;
		}
	}
	if(check){
		for(const i of tricell){
			cells[i].classList.add("win");
		}
		running = false;
		result.innerText = player + " wins!";
		console.log(player + " wins");
	}

	return check;
}

function checkdraw(){
	for(let i = 0; i < 9; i++){
		if(cells[i].dataset.sign === ""){
			return false;
		}
	}
	running = false;
	result.innerText = "It's a draw!";
	console.log("draw");

	return true;
}