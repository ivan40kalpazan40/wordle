const Row = ({ line }) => {
  const singleLine = [];
  let className = 'tile';
  for (let i = 0; i < 5; i++) {
    let char = line[i];
    singleLine.push(
      <div className={className} key={i}>
        {char}
      </div>
    );
  }
  return <div className="row">{singleLine}</div>;
};
export default Row;
