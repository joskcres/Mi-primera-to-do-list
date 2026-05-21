let data = []

//esto lo que hace es preguntar si existe data en el local storage si 
// es aso lo guarta y si no agrega un arreglo vacio al local storage 
// para almacenar los datos en el futuro
if (JSON.parse(localStorage.getItem('data'))) {
    data = JSON.parse(localStorage.getItem('data'))
} else {
    localStorage.setItem('data', JSON.stringify([]))
}

let input = document.querySelector('#inputTarea')
let btn = document.querySelector('#btnTarea')
let tareas = document.querySelector('#tareas')

const dibujarElementos = (info = null, i = null) => {
    let div = document.createElement('div')
    div.className = 'd-flex w-50 justify-content-between align-items-baseline info'

    //dibujando checbox

    let checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox') //El set atributte lo que hace es agregar el atributo a elemnto html el primer elemento lo que have es poner ael atributo y el segundo que atributo es
    checkbox.className = 'me-2 checkbox'
    //dibujando label

    let label = document.createElement('label')

    //dibujar el span

    let span = document.createElement('span')
    span.textContent = 'x'
    span.className = 'eliminar'

    if (info == null || i == null) {
        checkbox.setAttribute('id', getNextId())
        span.setAttribute('id', getNextId())
        label.textContent = input.value
    } else {
        checkbox.setAttribute('id', info[i].id)
        label.textContent = info[i].texto
        span.setAttribute('id', info[i].id)
    }
    //agregando elementos al div
    div.append(checkbox)
    div.append(label)
    div.append(span)

    return { div, checkbox, label, span }
}

const dibujarTodo = () => {
    if (data.length > 0) {
        for (let i = 0; i <= data.length - 1; i++) {
            const { div, checkbox, label, span } = dibujarElementos(data, i);
            if (data[i].estaCompletada) {
                checkbox.checked = true;
                label.classList.add('text-decoration-line-through')
            } else {
                checkbox.checked = false
                label.classList.remove('text-decoration-line-through')
            }
            tareas.append(div)
        }
    }
}

//funcion para agregar los id sin duplicados para evitar futuros errres
const getNextId = () => {
    return data.length > 0 ? data[data.length - 1]?.id + 1 : 1
}

//revisamos si le hacemos click al div de tareas
tareas.addEventListener('click', (event) => {
    if (event.target.classList.contains('checkbox')) {
        let tareaBuscar = data.find(item => item.id == event.target.id)
        tareaBuscar.estaCompletada = !tareaBuscar.estaCompletada
        if (tareaBuscar.estaCompletada) {
            event.target.nextSibling.classList.add('text-decoration-line-through')
        } else {
            event.target.nextSibling.classList.remove('text-decoration-line-through')
        }
        //recisamos si apretamos eliminar elimina la tarea de data y lo quye queda se va para el local storage
    } else if (event.target.classList.contains('eliminar')) {
        event.target.parentElement.remove()
        data = data.filter(item => item.id != event.target.id)
        localStorage.setItem('data', JSON.stringify(data))
    }

})

btn.addEventListener('click', (event) => {
    //revisar que el input traiga algo si trae algo lo inserto a la data
    if (input.value.trim() != '') {
        data.push({ id: getNextId(), texto: input.value, estaCompletada: false })
        localStorage.setItem('data', JSON.stringify(data))
        tareas.innerHTML = ''
        dibujarTodo()
    }
    input.value = ''
})
dibujarTodo()
