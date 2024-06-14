import React from "react";
import styles from "../style/Footer.module.css";
import fbicon from "../Pics/icons8-facebook-48.png";
import twittericon from "../Pics/icons8-twitter-50.png";
import instaicon from "../Pics/icons8-instagram-48.png";
import Image from "next/image";
const Footer = () => {
    return (
        <div className={`${styles.all} block`}>
            <div className={`${styles.foot_footerComponent__BtWvP} block`}>
                <div className={`${styles.foot_app_Title__zA_uX} block`}>
                    <h2 className={`${styles.h2Sstyles}`}>Shivstar Impex</h2>
                    <div className={`${styles.foot_social_media_Div__djhh7} flex`}>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <Image className={`${styles.imgStyle}`} src={fbicon} alt="Facebook Icon" width={30} height={30} />
                            {/* <img className={`${styles.imgStyle}`} src={fbicon} style={{ width: "30px" }} alt="Facebook Icon" /> */}
                        </a>
                        <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                            <Image className={`${styles.imgStyle}`} src={twittericon} alt="Twitter Icon" width={30} height={30} />
                            {/* <img className={`${styles.imgStyle}`} src={twittericon} style={{ width: "30px" }} alt="Twitter Icon" /> */}
                        </a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                            <Image className={`${styles.imgStyle}`} src={instaicon} alt="Instagram Icon" width={30} height={30} />
                            {/* <img className={`${styles.imgStyle}`} src={instaicon} style={{ width: "30px" }} alt="Instagram Icon" /> */}
                        </a>
                    </div>
                </div>
                <div className={`${styles.foot_contacts__yLyoe} block`}>
                    <p>Contact Us</p>
                    <p>Services</p>
                    <p>Return</p>
                    <p>Term of use</p>
                    <p>How to order?</p>
                </div>
                <div className={`${styles.foot_jewelry_Type__p6DGh} block`}>
                    <p>Rings</p>
                    <p>Bracelets</p>
                    <p>Earrings</p>
                    <p>Necklaces & Pendants</p>
                    <p>Watches</p>
                </div>
                <div className={`${styles.foot_email_Section__qc_3a} block`}>
                    <h1 style={{ color: "white", fontWeight: "500" }}>Discover the latest collections, news, and exclusive launches</h1>
                    <input className={`${styles.foot_mailInput__9Ia1} block`} type="email" placeholder="Enter your e-mail address" />
                    <hr className="my-2" />
                    <div className={`${styles.foot_policy__FkJCy} block`}>
                        <p>Legal notice</p>
                        <p>Privacy policy</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
