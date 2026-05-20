let input = document.querySelector('#inputTarea')
let btn = document.querySelector('#btnTarea')
let tareas = document.querySelector('#tareas')
let contador = 0

btn.addEventListener('click', (event) => {

    //dibujando div para tareas

    if (input.value != "") {
        let div = document.createElement('div')
        div.className = 'd-flex w-50 justify-content-between align-items-baseline info'
        
        //dibujando checbox

        let checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox')
        checkbox.className = 'me-2'

        //dibujando label

        let label = document.createElement('label')

        checkbox.addEventListener('click', (event)=>{
            label.classList.toggle('text-decoration-line-through')
        })
        //dibujar el span

        let span = document.createElement('span')
        span.textContent = 'x'
        span.addEventListener('click', () =>{
            div.remove()
        })

        //agregar elementos al div
        label.textContent = input.value
        div.append(checkbox)
        div.append(label)
        div.append(span)
        tareas.append(div)
        input.value = ''
        
    }
})

