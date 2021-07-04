import { Link } from "react-router-dom";

import "./NotFound.scss";

export const NotFound = () => {
  return (
    <section className="page_404">
      <div className="four_zero_four_bg">
        <h1 className="text-center ">404 Ошибка</h1>
      </div>
      <div className="contant_box_404">
        <h3>Похоже,ты заблудился</h3>
        <p>Страница не найдена</p>
        <Link to="/">На главную</Link>
      </div>
    </section>
  );
};
