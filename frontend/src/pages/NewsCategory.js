import { useEffect, useState } from "react";
import News from "../components/News";
import { useParams } from "react-router-dom";
import CarouselDateNews from "../components/CarouselDateNews";
import PartnerList from "../components/PartnerList";
import UsersTop from "../components/UsersTop";
import "./listNewsPages.css";

function NewsCategory() {
  const [NewsCategory, setCategory] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    async function getCategory() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/news/category/${category}`
        );
        if (response.ok) {
          const body = await response.json();
          setCategory(body);
        } else {
          setCategory([]);
        }
      } catch (msg) {
        console.error(msg);
      }
    }
    getCategory();
  }, [category]);

  return (
    <>
      <CarouselDateNews />
      <div className="grid-container">
        <div className="grid-main">
          <div>
            {NewsCategory.map((news) => (
              <News key={news.id} noticias={news}></News>
            ))}
          </div>
        </div>
        <div className="grid-aside">
          <UsersTop />
          <PartnerList />
        </div>
      </div>
    </>
  );
}

export default NewsCategory;
