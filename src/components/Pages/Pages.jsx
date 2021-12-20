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
            At AntrixMesh, we are building a virtual assets news and research
            facilitation platform. Our objective is to provide the global
            community access to all news, data and research under one
            comprehensive platform.
            <p>
              We have also collaborated with CapturLAW who will provide our
              users legal research and government documents on virtual assets in
              different jurisdictions. Our global community members should be
              well versed with local laws and make informed decisions when
              investing.
            </p>
            <p>
              The expenses incurred in development and maintenance of this
              platform and the research conducted, are all paid by a non-profit
              organization called World FutureTech Alliance Foundation.
            </p>
            <h2>What's ahead? </h2>
            <p>
              We want AntrixMesh to transform into a Decentralised Autonomous
              Organization (DAO).
            </p>
          </p>
          <p>
            AntrixMesh will be a community driven project. Lawyers, policy
            researchers, industry experts can publish there research work and
            the community members will reward them for the value their research
            generates. This DAO will become the voice of the people in virtual
            assets economy and work with governments around the world to bring
            positive and supportive legislation. To discuss more on this, please
            join our <a href="https://discord.gg/5jq4UXYyp3">Discord Channel</a>
            .
          </p>
        </>
      ),
    },
    contact: {
      title: "Contact",
      content: (
        <>
          <center>
            <p>Contact us through Mail : AntrixMesh@gmail.com</p>
          </center>
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
                <p>ETH or ETH based token (ERC20, 721, and more)</p>
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
            <TabContent for="tab2">
              <div className="coin-name">
                <p>SOLANA</p>
              </div>
              <div className="qr-container">
                <img
                  src="https://telegra.ph/file/6b5eaa68891b212bd2a95.jpg"
                  alt="QR"
                />
              </div>
              <div className="coin-address">
                <p>Address</p>
                <p
                  className="copy-address"
                  onClick={() => {
                    copy("8LxXUmV4WczKRJyMXAsaYrYLCGXx94pKE6JqTGgnLk9Y");
                    toast("Address Copied !!");
                  }}
                >
                  8LxXUmV4WczKRJyMXAsaYrYLCGXx94pKE6JqTGgnLk9Y
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
          {pageClicked === "donate" ? (
            <div className="donate-tabs">
              <p>
                If you love our project and would like to contribute to the
                cause, please donate:
              </p>
            </div>
          ) : null}
        </div>
        <div className="Pages-body">{pagesData[pageClicked].content}</div>
        <div className="pagefooter"></div>
      </div>
      <Toaster
        toastOptions={{
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
