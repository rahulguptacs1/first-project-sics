import { useState } from "react";
import styles from "@styles/Navbar/Navbar.module.scss";
import Dropdown from "./NavbarDropdown";
import Sidebar from "./Sidebar/Sidebar";
import SideItem from "./Sidebar/SideItem";
import classNames from "classnames";
import Link from "next/link";
import useCart from "@bigcommerce/storefront-data-hooks/cart/use-cart";

const countItem = (count, item) => count + item.quantity;
const countItems = (count, items) => items.reduce(countItem, count);
const CartNumber = () => {
  const { data, isValidating, isEmpty } = useCart();
  // console.log(isEmpty);
  // console.log(data);
  const itemsCount = Object.values(data?.line_items ?? {}).reduce(
    countItems,
    0
  );

  return itemsCount > 0 ? <span>{itemsCount}</span> : null;
};
function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className={styles.navbar}>
      <div className={styles.first}>
        <Link href="/cart">
          <div className={styles.icon}>
            <i className="fas fa-shopping-cart"></i>
            <p className={styles.number}>
              (<CartNumber />)
            </p>
          </div>
        </Link>

        <div className={styles.icon}>
          <i className="fas fa-balance-scale"></i>
          <p className={styles.number}>(0)</p>
        </div>
        <div className={styles.icon}>
          <i className="fas fa-user"></i>
        </div>
      </div>
      <div className={styles.second}>
        <div className={styles.burger} onClick={() => setShowSidebar(true)}>
          <i className="fa fa-bars"></i>
        </div>
        <Sidebar show={showSidebar} close={() => setShowSidebar(false)}>
          <div
            className={styles.logo}
            style={{
              padding: `1rem 1.5rem`,
              justifyContent: "flex-start",
            }}
          >
            <Link href="/">
              <img
                onClick={() => setShowSidebar(false)}
                src="https://template65052.motopreview.com/mt-demo/65000/65052/mt-content/uploads/2017/09/mt-1169_header_logo01.png"
              />
            </Link>
          </div>
          <Link href="/">
            <SideItem text="mavic" />
          </Link>
          <SideItem text="phantom" />
          <SideItem text="accessories" />
          <SideItem
            text={
              <span>
                about&ensp;
                <i className="fa fa-angle-down" aria-hidden="true"></i>
              </span>
            }
            items={[
              <SideItem
                key={0}
                text={
                  <span>
                    maintanence&ensp;
                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                  </span>
                }
                level={2}
                items={[
                  <SideItem key={0} text="privacy policy" />,
                  <SideItem key={1} text="blog" />,
                ]}
              />,
              <SideItem key={1} text="careers" />,
              <SideItem key={2} text="our team" />,
            ]}
            level={1}
          />

          <SideItem text="contacts" />
          <SideItem text="blog" />
        </Sidebar>
        <div className={styles.logo}>
          <Link href="/">
            <img src="https://template65052.motopreview.com/mt-demo/65000/65052/mt-content/uploads/2017/09/mt-1169_header_logo01.png" />
          </Link>
        </div>

        <div className={styles.items}>
          <Link href="/">
            <p className={styles.item}>mavic</p>
          </Link>
          <p className={styles.item}>phantom</p>
          <p className={styles.item}>accessories</p>
          <Dropdown
            position="down"
            component={({ classes, ...handlers }) => (
              <p className={classNames(styles.item, classes)} {...handlers}>
                about&ensp;
                <i className="fa fa-angle-down" aria-hidden="true"></i>
              </p>
            )}
            items={[
              <Dropdown
                key={0}
                position="right"
                component={({ handlers }) => (
                  <p {...handlers}>
                    maintanence{" "}
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                  </p>
                )}
                items={[<p key={0}>Privacy policy</p>, <p key={1}>Blog</p>]}
              />,
              <p key={1}>careers</p>,
              <p key={2}>our team</p>,
            ]}
          />

          <p className={styles.item}>contacts</p>
          <p className={styles.item}>blog</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
