
const confirmLogin = document.querySelector('.confirm_login');
const welcome = document.querySelector('.welcome');
const studentDatabase = document.querySelector('.student_database');
const student_name = document.getElementById('student_name');
const id = document.getElementById('student_id');
const department = document.getElementById('student_department');
const file = document.getElementById('file');
const submit = document.querySelector('#inputdetails');
const collection = document.querySelector('.collection');
const leftui = document.querySelector('.leftui');
const userName = document.querySelector('.welcome_user');
// const userPassword = document.querySelector('.welcome_user');
const addStudent = document.querySelector(".add");
const editEntry = document.querySelector(".edit");
const deleteEntry = document.querySelector(".delete");

console.log(screen.width);


window.addEventListener("resize",function(){
    if(screen.width<500)
    document.querySelector('.logo_image').setAttribute("style", "max-width:50vw;");
    });

let data = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : [];
let isEdit = false;
confirmLogin.addEventListener('click', function (e) {
    e.preventDefault();


    welcome.classList.remove("hidden");
    collection.classList.remove("hidden");
    leftui.classList.add("hidden");
    if (screen.width < 500) {
        document.querySelector('.carousel').setAttribute("style", "width:80% !important;");
     
studentDatabase.setAttribute("style", "width:90% !important;");
    }
    else {
        document.querySelector('.carousel').setAttribute("style", "width:50% !important;");
    } 
    userName.innerText = document.querySelector('#input_user').value;
});

addStudent.addEventListener('click', function () {
    studentDatabase.classList.toggle("hidden");
});

window.addEventListener("load", createCard);

function createCard() {
    console.log("hello");
    collection.innerHTML = null;
    data.forEach((obj, i) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("mx-2");
        card.classList.add("my-5");
        // const newDiv = document.createElement('div');
        const cardTemplate = ` <img src=${obj.img} class="card-img-top img-fluid h-50" alt="...">
          <div class="card-body ">
            <h2 class="card-text student_name">${obj.Name}</h2>
            <label for="" class="d-inline"> REFERENCE ID:</label>
            <p class="card-text student_id d-inline">${obj.Id}</p><br>
            <label for="" class="d-inline">AUTHOR:</label>
            <p class="card-text student_department d-inline">${obj.Department}</p><br>
            <button class="btn edit btn-outline-warning my-2 d-inline" id=${i} >Edit</button>
            <button class="btn btn-outline-danger my-2 d-inline delete" onclick="deletefunction(obj)">Delete</button>
          </div>`;
        // newDiv.innerHTML += cardTemplate;

        // editBtn.addEventListener('click', ()=>editfunction(obj))
        card.innerHTML += cardTemplate;
        let editBtn = card.querySelector('.edit');
        let deleteBtn = card.querySelector(".delete");
        editBtn.addEventListener('click', () => editfunction(obj));

        deleteBtn.addEventListener('click', () => deletefunction(i));
        collection.append(card);
    }
    );
};

function editfunction(obj) {
    isEdit = obj.Id;
    collection.classList.add("hidden");
    studentDatabase.classList.remove("hidden");
    student_name.value = obj.Name;
    id.value = obj.Id;
    id.department = obj.Department;

}
function deletefunction(index) {
    data = data?.filter((item, i) => i !== index);
    createCard();
    savingRecords();
}
let selectedImg = null;

submit.addEventListener('click', function (e) {
    e.preventDefault();
    collection.classList.remove("hidden");
    studentDatabase.classList.add("hidden");
    let Name = student_name.value;
    let Id = id.value;
    let Department = department.value;
    const img = selectedImg;
    // const img = document.getElementById('file')

    const newData = { Name, Id, Department, img };
    console.log(newData);
    if (!isEdit)
        data.push(newData);
    else {
        data = data?.map((item) => {
            if (item?.Id === isEdit) {
                return newData;
            }

            return item;
        });
    }
    console.log(data);
    createCard();
    savingRecords();
    isEdit = false;
});

file.addEventListener("change", function () {

    const reader = new FileReader();


    reader.readAsDataURL(this.files[0]);

    reader.addEventListener("load", () => {
        console.log(reader.result);
        selectedImg = reader.result;
    });
});


function savingRecords() {
    localStorage.setItem("data", JSON.stringify(data));
}