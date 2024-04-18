function toggleForm() {
    var form = document.getElementById('property-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

var storedFiles = [];

function previewFiles() {
    var files = document.getElementById('file-input').files;
    var preview = document.getElementById('image-preview');
    preview.innerHTML = '';
    Array.from(files).forEach(file => {
        if (!/\.(jpe?g|png|webp)$/i.test(file.name)) {
            alert("Only image files (.jpg, .jpeg, .png, .webp) are allowed.");
            return;
        }
        var reader = new FileReader();
        reader.onload = function(e) {
            var img = document.createElement('img');
            img.src = e.target.result;
            preview.appendChild(img);
        };
        reader.readAsDataURL(file);
        storedFiles.push(file); 
    });
}

function addProperty() {
    var name = document.getElementById('property-name').value;
    var location = document.getElementById('location').value;
    var description = document.getElementById('description').value;
    var availability = document.getElementById('availability').value;
    var fileList = storedFiles.map(file => file.name).join(", ");
    var li = document.createElement("li");
    li.innerHTML = `Name: ${name}, Location: ${location}, Description: ${description}, Availability: ${availability}, Files: ${fileList}
                    <button onclick="editProperty(this)">Edit</button>
                    <button onclick="deleteProperty(this)">Delete</button>`;
    document.getElementById('properties').appendChild(li);
    resetForm(); 
}

function deleteProperty(btn) {
    var li = btn.parentNode;
    document.getElementById('properties').removeChild(li);
    document.getElementById('image-preview').innerHTML = ''; 
}

function editProperty(btn) {
    var li = btn.parentNode;
    var parts = li.textContent.replace('EditDelete', '').trim().split(', ');
    document.getElementById('property-name').value = parts[0].split(':')[1].trim();
    document.getElementById('location').value = parts[1].split(':')[1].trim();
    document.getElementById('description').value = parts[2].split(':')[1].trim();
    document.getElementById('availability').value = parts[3].split(':')[1].trim().includes('Available') ? 'Available' : 'Not Available';
    deleteProperty(btn);  
}

function resetForm() {
    document.getElementById('property-name').value = '';
    document.getElementById('location').value = '';
    document.getElementById('description').value = '';
    document.getElementById('availability').value = 'Available';
    document.getElementById('file-input').value = '';
    storedFiles = []; 
}
