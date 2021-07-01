import Link from "next/link";
const cityList = [
  {
    country: "USA",
    city: "NewYork",
  },
  {
    country: "Spain",
    city: "Madrid",
  },
  {
    country: "England",
    city: "London",
  },
];

function About({ users }) {
  return (
    <div>
      <p>
        <Link href="/">
          <a>Home App</a>
        </Link>
      </p>
      <hr />
      <ul>
        {cityList.map((item, index) => (
          <li key={index}>
            <Link as={`/${item.country}/${item.city}`} href="/[country]/[city]">
              <a>
                {item.country}-{item.city}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default About;
