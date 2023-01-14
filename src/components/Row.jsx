const Row = ({ line }) => {
  const singleLine = [];
  for (let char of line) {
    singleLine.push(<div>{char}</div>);
  }
  return <div>{singleLine}</div>;
};
export default Row;
