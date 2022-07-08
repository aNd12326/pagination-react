import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

const renderData = (data) => {
  return (
    <ul>
      {data.map((todo) => {
        return <li key={todo.id}>{todo.title}</li>;
      })}
    </ul>
  );
};

export default function Pagination() {
  const [data, setData] = useState([]);

  // para el paginado es esto
  const [currentePage, setCurrentePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const handleClick = (e) => {
    setCurrentePage(Number(e.target.id));
  };

  const pages = [];
  for (let i = 1; i < Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    return (
      <li
        key={number}
        id={number}
        onClick={handleClick}
        className={currentePage == number ? "active" : null}
      >
        {number}
      </li>
    );
  });

  const fetchApi = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      <div>Todo List</div>
      <ul className="pageNumbers">{renderPageNumbers}</ul>
      {renderData(currentItems)}
    </>
  );
}
