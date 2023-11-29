import { createContext} from 'react';
import './App.css';


const UserContext = createContext({
  username: '',
  updateUsername: () => {},
});
export const UserConsumer = UserContext.Consumer;

  export function UserMessage() {
    return (
      <UserConsumer>
        {({ username }) => <h1>Welcome {username}!</h1>}
      </UserConsumer>
    );
  }

  export function UserSettings() {
    return (
      <UserConsumer>
        {({ updateUsername }) => (
          <div>
            <h2>Settings</h2>
            <label htmlFor="username">Username: </label>
            <input
              id="username"
              type="text"
              onChange={event => {
                updateUsername(event.target.value);
              }}
            />
          </div>
        )}
      </UserConsumer>
    );
  }

function App() {

  // const [todos, setTodos] = useState([]);
  // let tmpTodoArr = [];

  // const addTodo = (event) =>{
  //   event.preventDefault();
  //   let todoValue = document.getElementById('todo').value;
  //   tmpTodoArr.push(todoValue);
  //   console.log('TODO', todos, tmpTodoArr);
  //   localStorage.setItem('filteredTodoList', JSON.stringify([...todos, ...tmpTodoArr]));
  //   setTodos([...todos, ...tmpTodoArr]);
  // }

  // const todoCehcbox = (evt, item) =>{
  //   const removeTodoByIndex = todos.findIndex((todo) => todo === item);
  //   let updateTodoList = todos.splice(removeTodoByIndex,1);
  //   let filteredTodoList = todos.filter((td) => td !== updateTodoList);
  //   evt.target.checked = false;
  //   document.getElementById('todo').value = '';
  //   document.getElementById('todo').focus();
  //   localStorage.setItem('filteredTodoList', JSON.stringify(filteredTodoList));
  //   setTodos(filteredTodoList);
  // }

  // useEffect(() =>{
  //   let getTodosFromStorage = JSON.parse(localStorage.getItem('filteredTodoList'));
    
  //   if((todos && todos.length === 0) 
  //     && (getTodosFromStorage && getTodosFromStorage.length > 0)){
  //     setTodos(getTodosFromStorage);
  //   }
  // }, [todos]);

  

  // const UserProvider = (props) =>{

  //   const [state, setState] = useState({
  //     username: 'user',
  //     updateUsername: {},
  //   });
  //   const [userName, setUserName] = useState({
  //     username: 'user',
  //   });
  //   // let user = {username: 'user',}
  //   const updateUsername = (newUserName) => {
  //     setUserName({username: newUserName})
  //     // user = {username: newUserName}
  //   }

  //   // setState({
  //   //   userName:user,
  //   //   updateUsername,
  //   // })

  //   return (
  //     <UserContext.Provider value={state}>
  //       {props.children}
  //     </UserContext.Provider>
  //   );
  // }

    // const [userName, setUserName] = useState({
    //   username: 'user',
    // });
    // const updateUsername = (newUserName) => {
    //   setUserName({username: newUserName})
    //   // user = {username: newUserName}
    // }

  // return(
  //   <UserProvider>
  //     <UserMessage />
  //     <UserSettings />
  //   </UserProvider>
  // )
  // return (
  //   <div className="App">
  //     <div style={{display:'flex', justifyContent:'center'}}>
  //       <form>
  //         <input type='text' name="todo" id="todo" style={{padding:'10px'}}></input>
  //         <button onClick={(e) => addTodo(e)}  style={{padding:'10px'}}>Add Todo</button>
  //       </form>
  //     </div>
  //     <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
  //       {todos && 
  //       todos.map((todo, index) =>{
  //         return(
  //           <div className='todo-item' key={index} style={{padding:'10px', width:'246px', background:`#ffcc0${index}`}}>
  //             <input type="checkbox" name="todoChkBox" id={`todoChkBox-${index+1}`} onChange={(e) => todoCehcbox(e, todo)} />{todo}
  //             </div>
  //         )
  //       })
  //       }
  //       </div>
  //   </div>
  // );
}

export default App;
