const data = [
    {
        texto: 'Ganar en una partida de amoug us', estaCompletada: true, id: 1
    },
    {
        texto: 'Ver el mundial', estaCompletada: false, id: 2
    },
    {
        texto: 'Programar en mi pc', estaCompletada: false, id: 3
    },
    {
        texto: 'Ganar la champios en mi liga master', estaCompletada: false, id: 4
    }

]


let input = document.querySelector('#inputTarea')
let btn = document.querySelector('#btnTarea')
let tareas = document.querySelector('#tareas')
let contador = 0


if (data.length > 0) {
    for (let i = 1; i <= data.length; i++) {
        let div = document.createElement('div')
        div.className = 'd-flex w-50 justify-content-between align-items-baseline info'

        //dibujando checbox

        let checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox')
        checkbox.setAttribute('id', data[i - 1].id)

        checkbox.className = 'me-2'

        //dibujando label

        let label = document.createElement('label')
        if (data[i-1].estaCompletada) {
            checkbox.checked = true;
            label.classList.add('text-decoration-line-through')
        }else{
            label.classList.remove('text-decoration-line-through')
        }

        checkbox.addEventListener('click', (event) => {
            console.log(event.target.id)
            let tareaBuscar = data.find(item => item.id == event.target.id)
            tareaBuscar.estaCompletada = !tareaBuscar.estaCompletada
        if (tareaBuscar.estaCompletada) {
            checkbox.checked = true;
            label.classList.add('text-decoration-line-through')
        }else{
            label.classList.remove('text-decoration-line-through')
        }
        })
        //dibujar el span

        let span = document.createElement('span')
        span.textContent = 'x'
        span.addEventListener('click', () => {
            div.remove()
        })

        //agregar elementos al div
        label.textContent = data[i - 1].texto
        div.append(checkbox)
        div.append(label)
        div.append(span)
        tareas.append(div)
    }
}
btn.addEventListener('click', (event) => {

    //dibujando div para tareas

    if (input.value.trim() != "") {
        let div = document.createElement('div')
        div.className = 'd-flex w-50 justify-content-between align-items-baseline info'

        //dibujando checbox

        let checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox')
        checkbox.className = 'me-2'

        //dibujando label

        let label = document.createElement('label')

        checkbox.addEventListener('click', (event) => {
            console.log(event.target)
            label.classList.toggle('text-decoration-line-through')
        })
        //dibujar el span

        let span = document.createElement('span')
        span.textContent = 'x'
        span.addEventListener('click', () => {
            div.remove()
        })

        //agregar elementos al div
        label.textContent = input.value
        div.append(checkbox)
        div.append(label)
        div.append(span)
        tareas.append(div)
        data.push({ id: data.length + 1, texto: input.value, estaCompletada: false })
    }
    input.value = ''
})