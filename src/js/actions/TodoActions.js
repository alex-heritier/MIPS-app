import dispatcher from "../dispatcher"

export function createTodo(text) {
    dispatcher.dispatch({
        type: "CREATE_TODO",
        text,
    });
}

export function deleteTodo(id) {
    dispatcher.dispatch({
        type: "DELETE_TODO",
        id,
    });
}

export function reloadTodos() {
    dispatcher.dispatch({type: "FETCH_TODOS"});
    setTimeout(() => {
        dispatcher.dispatch({
            type: "RECEIVE_TODOS",
            todos: [
                {
                    id: 113464613,
                    text: "Go shopping again",
                    complete: false
                },
                {
                    id: 235684679,
                    text: "hug your wife",
                    complete: true
                }
            ]
        });
    }, 1000);
}
