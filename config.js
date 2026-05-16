function getConfig() {
  // We collected the values and ensured that they are integers, with a default value of 0 if the field is empty.
  return {
    rows: parseInt(document.getElementById('rows').value) || 0,
    cols: parseInt(document.getElementById('cols').value) || 0,
    timeLimit: parseInt(document.getElementById('timeLimit').value) || 0
  };
}

function validateConfig(config) {
  const { rows, cols, timeLimit } = config;

  // Make sure that all inputs are positive numbers greater than zero
  if (rows <= 0 || cols <= 0 || timeLimit <= 0) {
    alert("Please enter positive numbers for all fields.");
    return false;
  }

  // Checking the basic condition: (The total number of cards must be even)
  if ((rows * cols) % 2 !== 0) {
    alert("Board size (rows x columns) must be even to create matching pairs!");
    return false;
  }

  // Checking the basic condition: (The total number of cards must be even)
  if (rows < 2 && cols < 2) {
    alert("The board is too small! Please make it at least 2x2 or 2x1.");
    return false;
  }

  // Checking for sufficient time (optional but professional)
  if (timeLimit < 10) {
    alert("Time limit is too short! Minimum recommended is 10 seconds.");
    return false;
  }

  return true;
}