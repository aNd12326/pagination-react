const renderData = (data) => {
  return (
    <ul>
      {data.map((todo) => {
        return <li key={todo.id}>{todo.title}</li>;
      })}
    </ul>
  );
};

export default renderData;
