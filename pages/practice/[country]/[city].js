import { useRouter } from "next/router";
function CityItem() {
  const router = useRouter();
  // console.log(router.query);
  const { country, city } = router.query; // Destructuring our router object

  return (
    <>
      <h2>
        {city} is placed in {country}
      </h2>
    </>
  );
}

export default CityItem;
