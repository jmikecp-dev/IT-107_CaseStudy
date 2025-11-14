document.getElementById('addDonation').addEventListener('click', () => {
  const donor = document.getElementById('donorName').value.trim();
  const item = document.getElementById('itemName').value.trim();
  const category = document.getElementById('category').value;
  const quantity = parseInt(document.getElementById('quantity').value);
  const date = new Date().toLocaleString();

  if (!donor || !item || isNaN(quantity) || quantity <= 0) {
    alert("Please fill out all fields correctly.");
    return;
  }

  const donation = { donor, item, category, quantity, date };

  // Save to localStorage (acts as JSON)
  let donations = JSON.parse(localStorage.getItem('donations')) || [];
  donations.push(donation);
  localStorage.setItem('donations', JSON.stringify(donations));

  alert("Donation submitted successfully!");
  document.getElementById('donorName').value = '';
  document.getElementById('itemName').value = '';
  document.getElementById('quantity').value = '';
});
