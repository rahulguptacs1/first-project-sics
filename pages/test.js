import classNames from "classnames";
import { useState } from "react";
function test() {
  const [red, setRed] = useState(false);
  return (
    <div>
      <p className={classNames({ red })}>fsdfds</p>
      <button onClick={() => setRed(!red)}>click</button>
    </div>
  );
}

export default test;
