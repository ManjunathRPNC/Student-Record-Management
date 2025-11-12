let students = JSON.parse(localStorage.getItem('students')) || [];
let editIndex = null;

const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const gradeInput = document.getElementById('grade');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const tableBody = document.getElementById('tableBody');

// Display all students
function displayStudents() {
  tableBody.innerHTML = '';
  students.forEach((student, index) => {
    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>
          <button class="action-btn edit-btn" onclick="editStudent(${index})">Edit</button>
          <button class="action-btn delete-btn" onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
  localStorage.setItem('students', JSON.stringify(students));
}

// Add a new student
addBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const age = ageInput.value.trim();
  const grade = gradeInput.value.trim();

  if (!name || !age || !grade) {
    alert('Please fill all fields!');
    return;
  }

  const newStudent = { name, age, grade };
  students.push(newStudent);
  clearForm();
  displayStudents();
});

// Delete student
function deleteStudent(index) {
  if (confirm('Are you sure you want to delete this record?')) {
    students.splice(index, 1);
    displayStudents();
  }
}

// Edit student
function editStudent(index) {
  const student = students[index];
  nameInput.value = student.name;
  ageInput.value = student.age;
  gradeInput.value = student.grade;
  addBtn.style.display = 'none';
  updateBtn.style.display = 'inline-block';
  editIndex = index;
}

// Update student
updateBtn.addEventListener('click', () => {
  const updatedStudent = {
    name: nameInput.value,
    age: ageInput.value,
    grade: gradeInput.value
  };

  students[editIndex] = updatedStudent;
  addBtn.style.display = 'inline-block';
  updateBtn.style.display = 'none';
  editIndex = null;
  clearForm();
  displayStudents();
});

// Clear form inputs
function clearForm() {
  nameInput.value = '';
  ageInput.value = '';
  gradeInput.value = '';
}

window.onload = displayStudents;
