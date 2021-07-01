import classNames from "classnames";
import Link from "next/link";
import { useEffect, useState } from "react";
function Test() {
  const [red, setRed] = useState(false);
  const [count, setCount] = useState(0);
  let componentMounted = true;
  let i;
  useEffect(() => {
    i = setInterval(() => {
      console.log("count incr");
      console.log(componentMounted);

      if (componentMounted) {
        setCount((c) => {
          console.log("set count ran");
          return c + 1;
        });
      } else {
        clearInterval(i);
      }
    }, 500);
    return () => {
      componentMounted = false;
      // clearInterval(i);
    };
  }, []);
  return (
    <div>
      <p className={classNames({ red })}>{count}</p>
      <button onClick={() => setRed(!red)}>click</button>
      <Link href="/practice/about">
        <a>about</a>
      </Link>
    </div>
  );
}

export default Test;
