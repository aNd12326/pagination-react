import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import renderData from "../helpers/renderData";

export default function Pagination() {
  const [data, setData] = useState([]);

  // para el paginado es esto
  const [currentePage, setCurrentePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

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

  //renderizar numeros de paginas
  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
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
    } else {
      return null;
    }
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

  const handleNextBtn = () => {
    setCurrentePage(currentePage + 1);
    if (currentePage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevBtn = () => {
    setCurrentePage(currentePage - 1);
    if ((currentePage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  return (
    <>
      <div>Todo List</div>
      {renderData(currentItems)}
      <ul className="pageNumbers">
        <li>
          <button
            disabled={currentePage == pages[0] ? true : false}
            onClick={handlePrevBtn}
          >
            Prev
          </button>
        </li>
        {renderPageNumbers}
        <li>
          <button
            disabled={currentePage == pages[pages.length - 1] ? true : false}
            onClick={handleNextBtn}
          >
            Next
          </button>
        </li>
      </ul>
    </>
  );
}
