import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  const add = async () => {
    if (text == "") return;

    const info = await axios.post(`${process.env.REACT_APP_API}/add`, {
      text,
    });
    setTodos([...todos, { id: info.data.data._id, text: info.data.data.text }]);
    setText("");
  };

  const delOne = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API}/del`, { data: { id } });
    const filter = todos.filter((item) => item.id != id);
    setTodos(filter);
    setText("");
  };

  const clear = async () => {
    await axios.post(`${process.env.REACT_APP_API}/clear`);
    setTodos([]);
    setText("");
  };

  useEffect(() => {
    const getData = async () => {
      const info = await axios.get(`${process.env.REACT_APP_API}/get`);
      info.data.data.forEach((item) => {
        todos.push({ id: item._id, text: item.text });
      });
      setIsLoading(false);
    };

    getData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-black" data-testid="loading">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center px-4 py-4">
      <div>
        <h1 className="text-3xl font-bold text-black">To Do List</h1>
        <div className="my-5 text-xl">
          {todos &&
            todos.map((todo, index) => (
              <div className="flex gap-2" key={index}>
                <h1 className="text-black">{todo.text}</h1>
                <button
                  className="text-red-500"
                  onClick={() => delOne(todo.id)}
                >
                  x
                </button>
              </div>
            ))}
        </div>
        <div>
          <div>
            <input
              className="border px-2 py-2 text-black w-full"
              type="text"
              placeholder="Add to do..."
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          </div>
          <div className="my-2">
            <button
              className="px-2 py-2 bg-black text-white w-full"
              onClick={() => add()}
            >
              ADD
            </button>
          </div>
          <div className="my-2 text-center">
            <button className="px-2 py-2 text-black" onClick={() => clear()}>
              CLEAR
            </button>
          </div>
          <div className="my-2 text-center">
            <h1 className="text-black">v 0.0.4</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
