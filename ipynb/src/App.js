function App() {
  const add = () => {
  };

  const elements = ["one", "two", "three"];
  return (
    <div id="test">
      Type your own Sage computation below and click “Evaluate”.
      <div className="compute">
        <script type="text/x-sage"></script>
      </div>
      <div className="compute">
        <script type="text/x-sage">
          @interact def f(n=(0,10)): print(2^n)
        </script>
      </div>
      {elements.map((value, index) => {
        return (
          <div className="compute">
            <script type="text/x-sage"></script>
          </div>
        );
      })}
      <br></br>
      <button onClick={add}>Add new cell</button>
    </div>
  );
}

export default App;
