function getConfig() {
  return {
    rows: parseInt(document.getElementById('rows').value) || 0,
    cols: parseInt(document.getElementById('cols').value) || 0,
    timeLimit: parseInt(document.getElementById('timeLimit').value) || 60
  };
}

function validateConfig(rows, cols) {
  // Catch negative inputs or zeros immediately 
  if (rows <= 0 || cols <= 0) {
    alert("No negative numbers or zeros allowed! Please enter valid sizes.");
    return false;
  }
  
  // Make sure the board is at least a 2x2 grid
  if (rows < 2 || cols < 2) {
    alert("Minimum board size is 2x2");
    return false;
  }

  // The total slots must be an even number so every card has a matching pair
  if ((rows * cols) % 2 !== 0) {
    alert("Board size (rows x columns) must be even!");
    return false;
  }

  return true;
}