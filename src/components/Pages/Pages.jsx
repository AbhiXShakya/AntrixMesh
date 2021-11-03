import React from "react";
import "./Pages.css";
import PopCard from "../../components/PopCard/PopCard";

export function Pages({ pageClicked, pageHandler }) {
  const pagesData = {
    about: {
      title: "About",
      content: (
        <>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque
            rerum nisi suscipit deleniti odit vero et in? Blanditiis ea tempora
            veniam reiciendis voluptate odit ab atque labore voluptatum. Tenetur
            exercitationem maiores praesentium aperiam modi rem sequi recusandae
            aut a beatae porro, aspernatur debitis dolor ab dolore magnam! Ea
            non aut voluptatum quas perferendis animi quaerat minima provident.
            Placeat reiciendis iste aliquam? Nemo, nam cupiditate? Voluptatem
            neque eligendi doloremque quasi ab dolore aut amet soluta at.
            Tempore, nam magnam earum, a expedita debitis magni officia natus
            deserunt eius facilis maiores similique voluptates culpa repellat
            itaque eaque temporibus voluptas, id fugit? Placeat?
          </p>
        </>
      ),
    },
    contact: {
      title: "Contact",
      content: (
        <>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque
            rerum nisi suscipit deleniti odit vero et in? Blanditiis ea tempora
            veniam reiciendis voluptate odit ab atque labore voluptatum. Tenetur
            exercitationem maiores praesentium aperiam modi rem sequi recusandae
            aut a beatae porro, aspernatur debitis dolor ab dolore magnam! Ea
            non aut voluptatum quas perferendis animi quaerat minima provident.
            Placeat reiciendis iste aliquam? Nemo, nam cupiditate? Voluptatem
            neque eligendi doloremque quasi ab dolore aut amet soluta at.
            Tempore, nam magnam earum, a expedita debitis magni officia natus
            deserunt eius facilis maiores similique voluptates culpa repellat
            itaque eaque temporibus voluptas, id fugit? Placeat?
          </p>
        </>
      ),
    },
    donate: {
      title: "Donate",
      content: (
        <>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque
            rerum nisi suscipit deleniti odit vero et in? Blanditiis ea tempora
            veniam reiciendis voluptate odit ab atque labore voluptatum. Tenetur
            exercitationem maiores praesentium aperiam modi rem sequi recusandae
            aut a beatae porro, aspernatur debitis dolor ab dolore magnam! Ea
            non aut voluptatum quas perferendis animi quaerat minima provident.
            Placeat reiciendis iste aliquam? Nemo, nam cupiditate? Voluptatem
            neque eligendi doloremque quasi ab dolore aut amet soluta at.
          </p>
        </>
      ),
    },
  };

  return (
    <PopCard toggleCard={pageHandler}>
      <div className="Page">
        <div className="Pages-header">
          <h1>{pagesData[pageClicked].title}</h1>
        </div>
        <div className="Pages-body">{pagesData[pageClicked].content}</div>
        <div className="pagefooter"></div>
      </div>
    </PopCard>
  );
}
