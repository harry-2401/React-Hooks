import './App.scss';
import ColorBox from './component/colorBox/index';
import TodoList from './component/TodoList';
import TodoForm from './component/TodoForm/TodoForm';
import Pagination from './component/Pagination';
import React, { useEffect, useState } from 'react';
import PostList from './component/PostList';
import PostFiltersForm from './component/PostFiltersForm';
import queryStirng from 'query-string';
import Clock from './component/Clock';
import BetterCLock from './component/BetterClock';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'I love Easy Frontend! 😍' },
    { id: 2, title: 'We love Easy Frontend! 🥰' },
    { id: 3, title: 'They love Easy Frontend! 🚀' },
  ]);

  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 11,
  });
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
  })
  
  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramsString  = queryStirng.stringify(filters);
        const requestURL = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`
        const response = await fetch(requestURL);
        const responseJSON = await response.json();
        console.log(paramsString);
        console.log(responseJSON);

        const {data, pagination} = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch(error) {
        console.log(error)
      }
    }
    console.log('Post List effect')

    fetchPostList();
  }, [filters])

  useEffect(() => {
    console.log('TODO List effect')
  })

  function handlePageChange(newPage) {
    console.log(newPage);
    setFilters({
      ...filters,
      _page: newPage,
    })
  }

  function handleTodoClick(todo) {
    const index = todoList.findIndex(x => x.id === todo.id);
    if(index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValues) {
    const newTodo = {
      id: todoList.length + 1 + 'thisIsKey',
      ...formValues,
    }
    const newToDoList = [...todoList];
    newToDoList.push(newTodo);
    setTodoList(newToDoList);
  }

  function handleFiltersChange(newFilters) {
    console.log(newFilters);
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    })
  }

  const [showClock, setShowClock] = useState(true);

  return (
    <div className="App">
      <h1>Welcome to react hooks</h1>
      {/* <ColorBox/>
      <TodoForm onSubmit={handleTodoFormSubmit}/>
      <TodoList todos={todoList} onTodoClick={handleTodoClick}/> */}
      {/* <PostFiltersForm onSubmit={handleFiltersChange}/>
      <PostList posts={postList}/>
      <Pagination 
        pagination={pagination}
        onPageChange={handlePageChange}
      /> */}
      {showClock && < Clock/>}
      <BetterCLock/>
      <button onClick={() => setShowClock(false)}>Hide Clock</button>
    </div>
  );
}

export default App;
