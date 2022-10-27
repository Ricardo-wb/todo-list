const formAddTodo = document.querySelector('.form-add-todo')
const todosContainer = document.querySelector('section')
const formSearch = document.querySelector('.form-search')

//ADICIONA TODO
formAddTodo.addEventListener('submit', event => {
    event.preventDefault()

    const todo = document.createElement('article')

    const inputValue = event.target.add.value

    todo.setAttribute("data-todo", `${inputValue}`)
    todo.innerHTML = `<span>${inputValue}</span>
    <i class="far fa-trash-alt" data-trash="${inputValue}"></i>`

    todosContainer.insertAdjacentElement('beforeend', todo)

    event.target.reset()
})

//REMOVE TODO
todosContainer.addEventListener('click', event => {
    const trashDataValue = event.target.dataset.trash
    const todo = document.querySelector(`[data-todo="${trashDataValue}"]`)
    
    if (trashDataValue) {
        todo.remove()
    }
})


//FILTRAR TODO
formSearch.addEventListener('input', event => {
    event.preventDefault()

    const todos = Array.from(todosContainer.children)
    const inputValue = event.target.value.toLowerCase()

    todos.forEach(todo => {
        const matchedTodos = todo.textContent.toLowerCase().includes(inputValue)

        if (!matchedTodos) {
            todo.classList.add('hidden')
        }
    })

    todos.forEach(todo => {
        const matchedTodos = todo.textContent.toLowerCase().includes(inputValue)

        if (matchedTodos) {
            todo.removeAttribute('class')
        }
    })
})