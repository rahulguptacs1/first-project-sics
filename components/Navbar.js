import { useState } from "react";
import styles from "../styles/Navbar.module.scss";
import Dropdown from "./Dropdown";
import Sidebar from "./Sidebar";
import SideItem from "./SideItem";
import classNames from "classnames";
function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className={styles.navbar}>
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
          <img src="https://template65052.motopreview.com/mt-demo/65000/65052/mt-content/uploads/2017/09/mt-1169_header_logo01.png" />
        </div>
        <SideItem text="mavic" />
        <SideItem text="phantom" />
        <SideItem text="accessories" />
        <SideItem
          text={
            <span>
              about&ensp;<i className="fa fa-angle-down" aria-hidden="true"></i>
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
        <img src="https://template65052.motopreview.com/mt-demo/65000/65052/mt-content/uploads/2017/09/mt-1169_header_logo01.png" />
      </div>

      <div className={styles.items}>
        <p className={styles.item}>mavic</p>
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
  );
}

export default Navbar;
