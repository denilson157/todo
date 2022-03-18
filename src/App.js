import { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

import './App.css'
const ALL_TODO = gql`
  query allTodo {
    todo {
      Id
    	Texto 
      Completa
    }
  }
`

const UPDATE_TODO = gql`
  mutation completeTodo($id: uuid!, $completa: Boolean!) {
    update_todo(where: {Id: {_eq: $id}}, _set: {Completa: $completa}) {
      returning {
        Completa
        Id
        Texto
      }
    }
  }

`

const INSERT_TODO = gql`
  
mutation inserirTodo($texto:String!) {
  insert_todo(objects: {Texto: $texto}) {
    returning {
      Texto
      Id
      Completa
    }
  }
}

`

const DELETE_TODO = gql`
  
mutation deleteTodo($id: uuid!) {
  delete_todo(where: {Id: {_eq: $id}}) {
    returning {
      Completa
      Id
      Texto
    }
  }
}


`

const App = () => {

  const [todoTexto, setTodoTexto] = useState('');

  const { data, loading, error } = useQuery(ALL_TODO)
  const [update_todo] = useMutation(UPDATE_TODO)
  const [insert_todo] = useMutation(INSERT_TODO)
  const [delete_todo] = useMutation(DELETE_TODO)


  const ToggleTarefa = async (todo) => {


    await update_todo({
      variables: {
        id: todo.Id,
        completa: !todo.Completa
      }
    })


  }

  const inserirTodo = async (e) => {
    e.preventDefault()

    await insert_todo({
      variables: { texto: todoTexto },
      refetchQueries: [{ query: ALL_TODO }]
    })

    setTodoTexto('')

  }

  const deletarTodo = async (todo) => {
    if (window.confirm("Deseja apagar esse toDo?")) {

      if (window.confirm("Deseja mesmo mesmo??")) {
        await delete_todo({
          variables: { id: todo.Id },
          refetchQueries: [{ query: ALL_TODO }]
        })
      }
    }
  }


  return (
    <>
      {
        loading &&
        <p>
          Carregando
        </p>
      }
      {
        !loading &&
        <div>
          <h1>
            Lista de tarefas
          </h1>

          <form onSubmit={inserirTodo}>
            <input type="text" placeholder="Digite a nova tarefa" value={todoTexto} onChange={(e) => setTodoTexto(e.target.value)} />
            <button type="submit">
              Salvar
            </button>
          </form>
          {
            (data.todo || []).map(todo =>
              <div onDoubleClick={() => ToggleTarefa(todo)} key={todo.Id}>
                <input type="checkbox" checked={todo.Completa} readOnly />

                <label className={`${todo.Completa ? 'through' : ''}`}>
                  {todo.Texto}
                </label>
                <button onClick={() => deletarTodo(todo)}>
                  x
                </button>

              </div>
            )
          }
        </div>
      }
      {
        error &&
        <p>
          Não foi possível carregar os dados F
        </p>
      }
    </>
  );
}

export default App;
