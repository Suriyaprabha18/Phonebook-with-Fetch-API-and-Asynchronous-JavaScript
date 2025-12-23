const apiURL = "https://693a63b29b80ba7262c9b763.mockapi.io/contacts";

// Fetch and display contacts
async function loadContacts() {
    const res = await fetch(apiURL);
    const data = await res.json();

    let output = "";
    data.forEach(contact => {
        output += `
            <div>
                <span><b>${contact.name}</b> - ${contact.phone}</span>
                <button onclick="deleteContact(${contact.id})">Delete</button>
            </div>
        `;
    });

    document.getElementById("contacts").innerHTML = output;
}

// Add new contact
async function addContact() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    await fetch(apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone })
    });

    loadContacts();
}

// Delete contact
async function deleteContact(id) {
    await fetch(`${apiURL}/${id}`, {
        method: "DELETE"
    });
    loadContacts();
}

// Load contacts on start
loadContacts();
