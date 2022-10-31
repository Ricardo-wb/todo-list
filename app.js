const formAddTodo = document.querySelector('.form-add-todo')
const todosContainer = document.querySelector('ul')
const formSearch = document.querySelector('.form-search')

const setTodo = (todo, inputValue) => {
    todo.setAttribute("data-todo", `${inputValue}`)
    todo.innerHTML = `<span>${inputValue}</span>
    <i class="far fa-trash-alt" data-trash="${inputValue}"></i>`
}

const insertTodoIntoDom = inputValue => {
    const todo = document.createElement('li')

    setTodo(todo, inputValue)
    todosContainer.insertAdjacentElement('beforeend', todo)
}

const addTodo = event => {
    event.preventDefault()

    const inputValue = event.target.add.value.trim()
    insertTodoIntoDom(inputValue)

    event.target.reset()
}

const removeTodo = event => {
    const trashDataValue = event.target.dataset.trash
    const todo = document.querySelector(`[data-todo="${trashDataValue}"]`)

    if (trashDataValue) {
        todo.remove()
    }
}

const setTodoVisibility = (todo, classToSet, visibility) => visibility ?
    todo.removeAttribute(classToSet) : todo.classList.add(classToSet)

const filterTodos = (todos, inputSearchValue, returnMatchedTodo) => todos
    .filter(todo => {
        const matchedTodos = todo.textContent.toLowerCase().includes(inputSearchValue)

        return returnMatchedTodo ? matchedTodos : !matchedTodos
    })

const showTodos = (todos, inputSearchValue) =>
    filterTodos(todos, inputSearchValue, true).forEach(todo =>
        setTodoVisibility(todo, 'class', true))


const hideTodos = (todos, inputSearchValue) =>
    filterTodos(todos, inputSearchValue, false).forEach(todo =>
        setTodoVisibility(todo, 'hidden', false))

const filterTodoList = event => {
    event.preventDefault()

    const todos = Array.from(todosContainer.children)
    const inputSearchValue = event.target.value.trim().toLowerCase()

    showTodos(todos, inputSearchValue)
    hideTodos(todos, inputSearchValue)
}

formAddTodo.addEventListener('submit', addTodo)
todosContainer.addEventListener('click', removeTodo)
formSearch.addEventListener('input', filterTodoList)
