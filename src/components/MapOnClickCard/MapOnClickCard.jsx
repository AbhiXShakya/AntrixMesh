import React, { useState, useEffect } from "react";
import "./MapOnClickCard.css";
import PopCard from "../PopCard/PopCard";
import { TabLink, TabContent, Tabs } from "react-tabs-redux";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Pagination } from "../Pagination/Pagination";

export default function MapOnClickCard({
  mapSelectedCountry,
  toggleMapOnClick,
  setIsLoading,
  isLoading,
}) {
  const [getCryptoCountryObj, setGetCryptoCountryObj] = useState({});
  const [getLegalCountryObj, setGetLegalCountryObj] = useState({});
  const [getDocsCountryObj, setGetDocsCountryObj] = useState({});
  const [currentCryptoPage, setCurrentCryptoPage] = useState(1);
  const [currentLegalPage, setCurrentLegalPage] = useState(1);
  const [currentDocsPage, setCurrentDocsPage] = useState(1);

  let cryptoCollections = {};
  getCryptoCountryObj?.feeds?.forEach((obj) => {
    cryptoCollections = {
      ...cryptoCollections,
      [obj.type]: [...(cryptoCollections?.[obj.type] || []), obj],
    };
  });

  let legalCollections = {};
  getLegalCountryObj?.feeds?.forEach((obj) => {
    legalCollections = {
      ...legalCollections,
      [obj.type]: [...(legalCollections?.[obj.type] || []), obj],
    };
  });

  let docsCollections = {};
  getDocsCountryObj?.feeds?.forEach((obj) => {
    docsCollections = {
      ...docsCollections,
      [obj.type]: [...(docsCollections?.[obj.type] || []), obj],
    };
  });

  const countrySubmit = (type) => {
    let countryCode = mapSelectedCountry.code;
    let fetchUrl;

    if (type === "crypto") {
      fetchUrl = `${process.env.REACT_APP_BACKEND_URL}?type=crypto&${
        countryCode ? `code=${countryCode}&` : ""
      }&page=${currentCryptoPage}&limit=10`;
    } else if (type === "legal") {
      fetchUrl = `${process.env.REACT_APP_BACKEND_URL}?type=legal&${
        countryCode ? `code=${countryCode}&` : ""
      }&page=${currentLegalPage}&limit=10`;
    } else if (type === "docs") {
      fetchUrl = `${process.env.REACT_APP_BACKEND_URL}?type=govtdocs&${
        countryCode ? `code=${countryCode}&` : ""
      }&page=${currentDocsPage}&limit=10`;
    }

    axios.get(fetchUrl).then((res) => {
      if (type === "crypto") {
        setGetCryptoCountryObj(res.data);
      } else if (type === "legal") {
        setGetLegalCountryObj(res.data);
      } else if (type === "docs") {
        setGetDocsCountryObj(res.data);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 900);
    });
  };

  useEffect(() => {
    if (mapSelectedCountry) {
      setIsLoading(true);
      countrySubmit("crypto");
      countrySubmit("legal");
      countrySubmit("docs");
    }
    // eslint-disable-next-line
  }, [
    mapSelectedCountry,
    currentCryptoPage,
    currentLegalPage,
    currentDocsPage,
  ]);

  const countryCryptoPageCount = Math.ceil(
    getCryptoCountryObj?.totalResults / 10
  );
  const countryLegalPageCount = Math.ceil(
    getLegalCountryObj?.totalResults / 10
  );
  const countryDocsPageCount = Math.ceil(getDocsCountryObj?.totalResults / 10);

  const handleCountryCryptoPageClick = (data) => {
    setCurrentCryptoPage(data.selected + 1);
  };

  const handleCountryLegalPageClick = (data) => {
    setCurrentLegalPage(data.selected + 1);
  };

  const handleCountryDocsPageClick = (data) => {
    setCurrentDocsPage(data.selected + 1);
  };

  return (
    <>
      <PopCard toggleCard={toggleMapOnClick}>
        <Tabs renderActiveTabContentOnly={true}>
          <div className="tab-head">
            <h2 className="card-h2">
              {mapSelectedCountry?.name ? mapSelectedCountry?.name : "Country"}
            </h2>
            <div className="tabs-container">
              <TabLink to="tab1">CRYPTO</TabLink>
              <TabLink to="tab2">LEGAL</TabLink>
              <TabLink to="tab3">DOCS</TabLink>
            </div>
          </div>
          <div className="tab-ul">
            <TabContent for="tab1">
              <div className="ul-out">
                <ul className="tabul">
                  {isLoading ? (
                    <Loader />
                  ) : cryptoCollections?.["crypto"] ? (
                    cryptoCollections?.["crypto"]?.map((e) => {
                      return (
                        <li key={e._id}>
                          <div className="result">
                            <a
                              href={e.link}
                              className="result-header"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <span className="result-title">
                                <img
                                  alt="🌐"
                                  className="result-icon"
                                  src={
                                    e.linkIcon
                                      ? e.linkIcon.replace(
                                          "telegra.ph",
                                          "graph.org"
                                        )
                                      : "https://cointelegraph.com/favicon.ico"
                                  }
                                  loading="lazy"
                                  width="32"
                                  height="20"
                                />
                                &nbsp;&nbsp;{e.title}
                              </span>
                              <br />
                            </a>
                            <span className="result-site">
                              {new URL(e.link).hostname.replace("www.", "")}
                            </span>
                            <br />
                            <span className="result-desc">{e.linkDesc}</span>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <p className="ulcenter">No data found</p>
                  )}
                </ul>
              </div>
              {countryCryptoPageCount > 1 ? (
                <Pagination
                  pageCount={countryCryptoPageCount}
                  handlePageClick={handleCountryCryptoPageClick}
                />
              ) : null}
            </TabContent>
            <TabContent for="tab2">
              <div className="ul-out">
                <ul className="tabul">
                  {isLoading ? (
                    <Loader />
                  ) : legalCollections?.["legal"]?.length ? (
                    legalCollections?.["legal"]?.map((e) => {
                      return (
                        <li key={e._id}>
                          <div className="result">
                            <a
                              href={e.link}
                              className="result-header"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <span className="result-title">
                                <img
                                  alt="🌐"
                                  className="result-icon"
                                  src={
                                    e.linkIcon
                                      ? e.linkIcon.replace(
                                          "telegra.ph",
                                          "graph.org"
                                        )
                                      : "https://cointelegraph.com/favicon.ico"
                                  }
                                  loading="lazy"
                                  width="32"
                                  height="20"
                                />
                                &nbsp;&nbsp;{e.title}
                              </span>
                              <br />
                            </a>
                            <span className="result-site">
                              {new URL(e.link).hostname.replace("www.", "")}
                            </span>
                            <br />
                            <span className="result-desc">{e.linkDesc}</span>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <p className="ulcenter">No data found</p>
                  )}
                </ul>
              </div>
              {countryLegalPageCount > 1 ? (
                <Pagination
                  pageCount={countryLegalPageCount}
                  handlePageClick={handleCountryLegalPageClick}
                />
              ) : null}
            </TabContent>
            <TabContent for="tab3">
              <div className="ul-out">
                <ul className="tabul">
                  {isLoading ? (
                    <Loader />
                  ) : docsCollections?.["govtdocs]"]?.length ? (
                    docsCollections?.["govtdocs"]?.map((e) => {
                      return (
                        <li key={e._id}>
                          <div className="result">
                            <a
                              href={e.link}
                              className="result-header"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <span className="result-title">
                                <img
                                  alt="🌐"
                                  className="result-icon"
                                  src={
                                    e.linkIcon
                                      ? e.linkIcon.replace(
                                          "telegra.ph",
                                          "graph.org"
                                        )
                                      : "https://cointelegraph.com/favicon.ico"
                                  }
                                  loading="lazy"
                                  width="32"
                                  height="20"
                                />
                                &nbsp;&nbsp;{e.title}
                              </span>
                              <br />
                            </a>
                            <span className="result-site">
                              {new URL(e.link).hostname.replace("www.", "")}
                            </span>
                            <br />
                            <span className="result-desc">{e.linkDesc}</span>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <p className="ulcenter">No data found</p>
                  )}
                </ul>
              </div>
              {countryDocsPageCount > 1 ? (
                <Pagination
                  pageCount={countryDocsPageCount}
                  handlePageClick={handleCountryDocsPageClick}
                />
              ) : null}
            </TabContent>
          </div>
        </Tabs>
      </PopCard>
    </>
  );
}
