const Row = ({ line, word, isEntered }) => {
  const singleLine = [];
  for (let i = 0; i < 5; i++) {
    let className = 'tile';
    let char = line[i];
    if (isEntered) {
      // TODO: Not always register the correctly guessed letter. Address the issue
      if (char === word[i]) {
        className += ' correct';
      } else if (word.includes(char)) {
        className += ' available';
      } else {
        className += ' filled';
      }
    }
    singleLine.push(
      <div className={className} key={i}>
        {char}
      </div>
    );
  }
  return <div className="row">{singleLine}</div>;
};
export default Row;
