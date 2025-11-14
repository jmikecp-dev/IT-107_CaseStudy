if (sessionStorage.getItem('loggedIn') !== 'true') {
  window.location.href = 'login.html';
}

const tableBody = document.querySelector('#donationTable tbody');
let donations = JSON.parse(localStorage.getItem('donations')) || [];

// Renders all donation rows
function renderDonations() {
  tableBody.innerHTML = '';

  donations.forEach((donation, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${donation.donor}</td>
      <td>${donation.item}</td>
      <td>${donation.category}</td>
      <td>${donation.quantity}</td>
      <td>${donation.date}</td>
      <td>
        <button class="editBtn" data-index="${index}">Edit</button>
        <button class="deleteBtn" data-index="${index}">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  addActionEvents();
}

// Save donations to localStorage
function saveDonations() {
  localStorage.setItem('donations', JSON.stringify(donations));
}

// Add edit/delete event listeners
function addActionEvents() {
  // 🗑️ Delete button
  document.querySelectorAll('.deleteBtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      const donation = donations[index];

      const confirmed = confirm(`Are you sure you want to delete this donation from "${donation.donor}"?`);
      if (confirmed) {
        donations.splice(index, 1);
        saveDonations();
        alert("Donation deleted successfully!");
        renderDonations();
      }
    });
  });

  // ✏️ Edit button
  document.querySelectorAll('.editBtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      const donation = donations[index];

      const newDonor = prompt("Edit Donor Name:", donation.donor);
      const newItem = prompt("Edit Item:", donation.item);
      const newCategory = prompt("Edit Category (Food/Clothes/Funds):", donation.category);
      const newQuantity = prompt("Edit Quantity:", donation.quantity);

      // If user cancels any prompt, skip editing
      if (newDonor === null || newItem === null || newCategory === null || newQuantity === null) {
        alert("Edit cancelled.");
        return;
      }

      // Confirm before applying changes
      const confirmEdit = confirm("Are you sure you want to save these changes?");
      if (confirmEdit) {
        if (newDonor && newItem && newCategory && newQuantity && !isNaN(newQuantity)) {
          donations[index] = {
            donor: newDonor,
            item: newItem,
            category: newCategory,
            quantity: parseInt(newQuantity),
            date: new Date().toLocaleString()
          };
          saveDonations();
          alert("Donation updated successfully!");
          renderDonations();
        } else {
          alert("Invalid input, edit cancelled.");
        }
      } else {
        alert("Edit cancelled.");
      }
    });
  });
}
// Logout button
document.getElementById('logoutBtn').addEventListener('click', () => {
  sessionStorage.removeItem('loggedIn');
  window.location.href = 'login.html';
});

// Initial render
renderDonations();