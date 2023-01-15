const Keypad = ({ keyPad }) => {
  return (
    // TODO: find a way not to change colors of previously guessed letters from green to grey or gold
    <div className="letterBoard">
      {keyPad.map((tile, i) => {
        let className = 'letterBox';
        className += ' ' + tile.status;
        return (
          <div className={className} key={i}>
            {tile.letter}
          </div>
        );
      })}
    </div>
  );
};
export default Keypad;
