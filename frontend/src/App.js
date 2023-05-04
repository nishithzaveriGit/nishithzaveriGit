import { useEffect,useState} from 'react';
import './App.css';

function App() {

  const [todos, setTodos] = useState([]);
  let tmpTodoArr = [];

  const addTodo = (event) =>{
    event.preventDefault();
    let todoValue = document.getElementById('todo').value;
    tmpTodoArr.push(todoValue);
    console.log('TODO', todos, tmpTodoArr);
    localStorage.setItem('filteredTodoList', JSON.stringify([...todos, ...tmpTodoArr]));
    setTodos([...todos, ...tmpTodoArr]);
  }

  const todoCehcbox = (evt, item) =>{
    const removeTodoByIndex = todos.findIndex((todo) => todo === item);
    let updateTodoList = todos.splice(removeTodoByIndex,1);
    let filteredTodoList = todos.filter((td) => td !== updateTodoList);
    evt.target.checked = false;
    document.getElementById('todo').value = '';
    document.getElementById('todo').focus();
    localStorage.setItem('filteredTodoList', JSON.stringify(filteredTodoList));
    setTodos(filteredTodoList);
  }

  useEffect(() =>{
    let getTodosFromStorage = JSON.parse(localStorage.getItem('filteredTodoList'));
    
    if((todos && todos.length === 0) 
      && (getTodosFromStorage && getTodosFromStorage.length > 0)){
      setTodos(getTodosFromStorage);
    }
  }, [todos]);
  

  return (
    <div className="App">
      <div style={{display:'flex', justifyContent:'center'}}>
        <form>
          <input type='text' name="todo" id="todo" style={{padding:'10px'}}></input>
          <button onClick={(e) => addTodo(e)}  style={{padding:'10px'}}>Add Todo</button>
        </form>
      </div>
      <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
        {todos && 
        todos.map((todo, index) =>{
          return(
            <div className='todo-item' key={index} style={{padding:'10px', width:'246px', background:`#ffcc0${index}`}}>
              <input type="checkbox" name="todoChkBox" id={`todoChkBox-${index+1}`} onChange={(e) => todoCehcbox(e, todo)} />{todo}
              </div>
          )
        })
        }
        </div>
    </div>
  );
}

export default App;
