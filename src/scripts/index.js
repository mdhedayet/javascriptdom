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

    addtask.addEventListener('click',()=>{

            createNewTask(tasklist, taskfield.value)
            taskfield.value = ""
    })

}

let createNewTask = (parent, task)=>{
   // console.log(task, parent);
    let col = create({'class': 'col-sm-3'})
    let singletask = create({'class': 'single-task my-3'})
    let singletaskP = create('p' ,{'class': 'd-flex'})
    singletaskP.innerHTML = task
    singletask.appendChild(singletaskP)

    let editbtn = createeditBtn(singletask ,singletaskP)
    singletaskP.appendChild(editbtn)

    let taskController = CreateTaskController(singletask)
    let span = create('span', {'class': 'px-2'})
    span.style.color = 'white'
    span.style.cursor = 'pointer'
    span.innerHTML = '<i class="fas fa-window-close"></i>'
    span.addEventListener('click',()=>{
        parent.removeChild(col)
    })
    singletaskP.appendChild(span)

    
    taskController.style.visibility ="hidden"
    singletask.appendChild(taskController)

    singletask.onmouseenter = ()=>{
        taskController.style.visibility ="visible"
    }
    singletask.onmouseleave = ()=>{
        taskController.style.visibility ="hidden"
    }

    
    col.appendChild(singletask)
    parent.appendChild(col)
}

function CreateTaskController(parent){
    let controlpanel = create({"class":"task-control-panel"})
    let colorplate = createColorPlate(parent)
    controlpanel.appendChild(colorplate)
    return controlpanel;
}


function createeditBtn(parnt,singp){
    let span = create('span', {'class': 'ml-auto'})
    span.style.color = 'white'
    span.style.cursor = 'pointer'
    span.innerHTML = '<i class="fas fa-edit"></i>'

    span.addEventListener('click',()=>{
        let p = parnt.querySelector('p')
        let textArea  = create('textarea', {'class':'inner-textarea'})
        textArea.style.width = parnt.offsetWidth +'px'
        textArea.style.height = parnt.offsetHeight +'px'
        textArea.innerHTML = p.innerHTML.replace('<span class="ml-auto" style="color: white; cursor: pointer;"><i class="fas fa-edit"></i></span><span class="px-2" style="color: white; cursor: pointer;"><i class="fas fa-window-close"></i></span>','')

        textArea.addEventListener('keypress',(event)=>{
            if(event.keyCode === 13){
                event.stopPropagation()
                let value = event.target.value
                console.log(value);
                if(value){
                    p.innerHTML = value+'<span class="ml-auto" style="color: white; cursor: pointer;"><i class="fas fa-edit"></i></span><span class="px-2" style="color: white; cursor: pointer;"><i class="fas fa-window-close"></i></span>'
                    parnt.removeChild(event.target)
                }else{
                    alert('please put some data')
                }
            }
        })

        parnt.appendChild(textArea)
    })
    return span
    
}


function createColorPlate(parent){
    let colors = ['forestgreen','fuchsia','gainsboro','ghostwhite','gold','goldenrod','gray']
    let colorDiv = create({'class':'d-flex'})

    colors.forEach(color=>{
        let div  = create({'class':'color-circle'})
        div.style.background = color
        div.addEventListener('click',()=>{
            parent.style.background = color
        })
        colorDiv.appendChild(div)
    })

    return colorDiv;
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