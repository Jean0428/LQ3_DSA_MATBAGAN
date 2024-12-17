// Function to authenticate user
function authenticate(username, password, users) {
  return users.some(user => user.username === username && user.password === password);
}

// Function to display bus information
function displayBus(bus) {
  console.log(`Bus: ${bus.name}`);
  for (let i = 0; i < bus.seats.length; i++) {
    console.log(`Seat ${i + 1}: ${bus.seats[i] ? bus.seats[i] : 'AVAILABLE'}`);
  }
}

// Initialize buses
let buses = [
  { name: 'Cubao', seats: new Array(30).fill(null) },
  { name: 'Baguio', seats: new Array(30).fill(null) },
  { name: 'Pasay', seats: new Array(30).fill(null) }
];

// Initialize users
let users = [
  { username: 'admin', password: 'password' }
];

// Start program
while (true) {
  let userType = prompt("Are you a TICKET PERSON or CUSTOMER? (Enter 'exit' to quit)");

  if (userType.toLowerCase() === 'exit') break;

  if (userType.toLowerCase() === 'ticket person') {
    let username = prompt("Enter username:");
    let password = prompt("Enter password:");

    if (authenticate(username, password, users)) {
      while (true) {
        let action = prompt("Do you want to LOGOUT, VIEW, or MANAGE a BUS?");

        if (action.toLowerCase() === 'logout') break;

        if (action.toLowerCase() === 'view') {
          for (let bus of buses) {
            displayBus(bus);
          }
          let cancelView = prompt("Type 'CANCEL' to go back");
          if (cancelView.toLowerCase() === 'cancel') continue;
        }

        if (action.toLowerCase() === 'manage') {
          let busName = prompt("Which bus do you want to manage? (Cubao, Baguio, Pasay)");

          let bus = buses.find(b => b.name.toLowerCase() === busName.toLowerCase());
          if (!bus) {
            alert("Bus not found!");
            continue;
          }

          while (true) {
            let manageAction = prompt("Do you want to ADD or REMOVE a reservation, or CANCEL?");
            
            if (manageAction.toLowerCase() === 'cancel') break;

            if (manageAction.toLowerCase() === 'add') {
              let seatNumber = parseInt(prompt("Enter seat number to reserve (1-30):")) - 1;

              if (bus.seats[seatNumber]) {
                alert("Seat is already taken!");
                continue;
              }

              let customerName = prompt("Enter customer name:");
              bus.seats[seatNumber] = customerName;

              let continueAdd = prompt("Do you want to continue adding reservations? (yes/no)");
              if (continueAdd.toLowerCase() === 'no') break;
            }

            if (manageAction.toLowerCase() === 'remove') {
              let seatNumber = parseInt(prompt("Enter seat number to remove reservation (1-30):")) - 1;

              if (!bus.seats[seatNumber]) {
                alert("Seat is already available!");
                continue;
              }

              bus.seats[seatNumber] = null;

              let continueRemove = prompt("Do you want to continue removing reservations? (yes/no)");
              if (continueRemove.toLowerCase() === 'no') break;
            }
          }
        }
      }
    } else {
      alert("Invalid username or password!");
    }
  }

  if (userType.toLowerCase() === 'customer') {
    while (true) {
      let action = prompt("Do you want to RESERVE or CANCEL RESERVATION, or CANCEL?");

      if (action.toLowerCase() === 'cancel') break;

      if (action.toLowerCase() === 'reserve') {
        let busName = prompt("Which bus do you want to reserve a seat on? (Cubao, Baguio, Pasay)");

        let bus = buses.find(b => b.name.toLowerCase() === busName.toLowerCase());
        if (!bus) {
          alert("Bus not found!");
          continue;
        }

        let availableSeats = bus.seats.map((seat, index) => seat ? null : index + 1).filter(seat => seat);
        if (availableSeats.length === 0) {
          alert("Bus is fully booked!");
          continue;
        }

        console.log("Available seats: " + availableSeats.join(", "));

        let seatNumber = parseInt(prompt("Enter seat number to reserve (1-30):")) - 1;

        if (bus.seats[seatNumber]) {
          alert("Seat is already taken!");
          continue;
        }

        let customerName = prompt("Enter your name:");
        bus.seats[seatNumber] = customerName;

        alert("Reservation confirmed!");
      }

      if (action.toLowerCase() === 'cancel reservation') {
        let busName = prompt("Which bus did you reserve a seat on? (Cubao, Baguio, Pasay)");

        let bus = buses.find(b => b.name.toLowerCase() === busName.toLowerCase());
        if (!bus) {
          alert("Bus not found!");
          continue;
        }

        let customerName = prompt("Enter your name:");

        let seatNumber = bus.seats.findIndex(seat => seat === customerName);
        if (seatNumber === -1) {
          alert("Reservation not found!");
          continue;
        }

        let confirmCancel = prompt("Are you sure you want to cancel the reservation? (yes/no)");
        if (confirmCancel.toLowerCase() === 'yes') {
          bus.seats[seatNumber] = null;
          alert("Reservation canceled!");
        }
      }
    }
  }
}
