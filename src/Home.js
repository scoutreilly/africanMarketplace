import React from "react";
import banner from "./images/banner.jpg"


export default function Home() {
    return(
        <div className="homePage">
            <img src={banner} alt="banner of fruit"/>
            <section className="smallIntro">
                <h2>African Marketplace</h2>
                <p>Sauti Africa empowers small business owners, particularly women,
                to improve their business and economic opportunities
                to grow out of poverty.</p>
                <a href="http://localhost:3000/About">Learn More</a>
            </section>

            <section id="one">
                <h2>Arcu aliquet vel lobortis ata nisl
                eget augue amet aliquet nisl cep donec</h2>
                <p>Aliquam ut ex ut augue consectetur interdum. Donec amet imperdiet eleifend
                fringilla tincidunt. Nullam dui leo Aenean mi ligula, rhoncus ullamcorper.</p>
                <ul>
                    <li>Lorem</li>
                    <li>ipsom</li>
                    <li>Dolor</li>
                </ul>
            </section>

        </div>
    )
}