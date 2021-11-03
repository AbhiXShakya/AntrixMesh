import React from "react";
import "./Pages.css";
import PopCard from "../../components/PopCard/PopCard";
import { Tabs, TabLink, TabContent } from "react-tabs-redux";
import toast, { Toaster } from "react-hot-toast";
import copy from "copy-to-clipboard";

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
          <Tabs renderActiveTabContentOnly={true}>
            <div className="donate-tabs">
              <TabLink to="tab1">
                <img
                  src="https://telegra.ph/file/83fbe7de11ee05a5159f4.png"
                  alt="ETH"
                  width="34"
                />
              </TabLink>
              <TabLink to="tab2">
                <img
                  src="https://telegra.ph/file/dcba5bd3a0fa05e7b962d.png"
                  alt="SOL"
                  width="34"
                />
              </TabLink>
            </div>
            <TabContent for="tab1">
              <div className="coin-name">
                <p>ETH and any ETH based token (ERC20, 721, and more)</p>
              </div>
              <div className="qr-container">
                <img
                  src="https://telegra.ph/file/a21fbace7db9f34acde61.jpg"
                  alt="QR"
                />
              </div>
              <div className="coin-address">
                <p>Address</p>
                <p
                  className="copy-address"
                  onClick={() => {
                    copy("0x119eca662BB775cc47A22020aeC6d61ECB277Dc1");
                    toast("Address Copied !!");
                  }}
                >
                  0x119eca662BB775cc47A22020aeC6d61ECB277Dc1
                </p>
              </div>
            </TabContent>
          </Tabs>
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
      <Toaster
        toastOptions={{
          icon: "✔️",
          duration: 1000,
          style: {
            background: "#292929",
            color: "#fff",
          },
        }}
      />
    </PopCard>
  );
}
