document.addEventListener('DOMContentLoaded', function() {
    const imgTaskAdd = document.getElementById("img-post-task")
    imgTaskAdd.addEventListener('click', function(){
       createTask()
    })
    getTasks()
    //createTask("test", date.toISOString())
}, false)

const mockapiURL = "https://678caea6f067bf9e24e7ed3e.mockapi.io/task"
function getTasks(){
    const container = document.getElementById("task-container")

    fetch(mockapiURL, {
       method: 'GET',
       headers: {'content-type':'application/json'}, 
    }).then(res => {
      if (res.ok) {
            return res.json();
      }
    }).then(tasks => {
      container.innerHTML = ''
      tasks.forEach(task => {
          const taskName = task["name"]
          const li = document.createElement("li")
          li.classList += "shadow custom-shadow flex justify-between items-center mt-3 my-1 px-5 py-1 w-full text-black text-xl rounded-lg duration-300 shape-change-effect "
          li.innerHTML = `<span>${taskName}</span>
                    <div class="flex gap-2">
                        <img class="cursor-pointer duration-300 hover:scale-125" src="./images/check.svg" alt="" srcset="">
                        <img class="cursor-pointer duration-300 hover:scale-125" src="./images/Edit.svg" alt="" srcset="">
                        <img class="cursor-pointer duration-300 hover:scale-125" src="./images/Trash.svg" alt="" srcset="">
                    </div>`
            container.appendChild(li)
            //document.body.insertBefore(itemHtml, container)
            //container.insertBefore(itemHtml)
        });


      }).catch(error => {

      })
}

function createTask(){
    const inputTask = document.getElementById("input-post-task")
    const container = document.getElementById("task-container")
    var date = new Date();
    const newTask = {
        name: inputTask.value,
        is_complated: false,
        created: date.toISOString(),
      };

      fetch(mockapiURL, { method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(newTask)
      }).then(res => {
        inputTask.value = ""
        if (res.ok) {
            return res.json();
        }
      }).then(task => {
        console.log(task)
      }).catch(error => {

      })
}
