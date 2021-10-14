import '../styles/index.css'

window.onload = ()=>{
    const taskfield = document.querySelector('#taskField')
    const addtask = document.querySelector('#addtask')
    const tasklist = document.querySelector('#tasklist')

    taskfield.addEventListener('keypress',(event)=>{
        if(event.keyCode === 13){
            createNewTask(tasklist, event.target.value)
            event.target.value = ""
        }
    })
}

let createNewTask = (parent, task)=>{
   // console.log(task, parent);
    let col = create({'class': 'col-sm-3'})
    let singletask = create({'class': 'single-task my-3'})
    let singletaskP = create('p' ,{'class': 'd-flex'})
    singletaskP.innerHTML = task
    singletask.appendChild(singletaskP)

    let span = create('span', {'class': 'ml-auto'})
    span.style.color = 'white'
    span.style.cursor = 'pointer'
    span.innerHTML = '<i class="fas fa-window-close"></i>'
    span.addEventListener('click',()=>{
        parent.removeChild(col)
    })
    singletaskP.appendChild(span)

    
    col.appendChild(singletask)
    parent.appendChild(col)
}


window.create = function () {

    if (arguments.length === 0) {
        return document.createElement('div');
    }

    if (arguments.length === 1 && typeof arguments[0] != 'object') {
        return document.createElement(arguments[0]);
    }

    var tag = arguments[0];
    var attr = arguments[1] || arguments[0];

    if (arguments.length === 1 && typeof arguments[0] === 'object') {
        tag = 'div';
    }

    var element = document.createElement(tag);

    for (var i in attr) {
        element.setAttribute(i, attr[i]);
    }

    return element;
}

