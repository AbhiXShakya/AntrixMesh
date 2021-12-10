import React, { useState, useEffect } from "react";
import PopCard from "../PopCard/PopCard";
import "./GlobalCard.css";
import axios from "axios";
import { BiSearchAlt } from "react-icons/bi";
import SelectCountry from "./SelectCountry/SelectCountry";
import { TabLink, TabContent, Tabs } from "react-tabs-redux";
import Loader from "../Loader/Loader";
import { Pagination } from "../Pagination/Pagination";

export default function GlobalCard({
  toggleGlobalCard,
  selectedCountry,
  setSelectedCountry,
  setIsLoading,
  isLoading,
}) {
  const [countryIcon, setCountryIcon] = useState(
    "https://telegra.ph/file/3459cff6cc24335197457.png"
  );
  const [getCryptoFilterObj, setGetCryptoFilterObj] = useState({});
  const [getLegalFilterObj, setGetLegalFilterObj] = useState({});
  const [getDocsFilterObj, setGetDocsFilterObj] = useState({});
  const [toDate, setToDate] = React.useState(undefined);
  const [fromDate, setFromDate] = React.useState(undefined);
  const [query, setQuery] = React.useState(undefined);
  const [isSelectCountryModal, setIsSelectCountryModal] = useState(false);
  const [currCryptoPage, setCurrCryptoPage] = useState(1);
  const [currLegalPage, setCurrLegalPage] = useState(1);
  const [currDocsPage, setCurrDocsPage] = useState(1);

  const listyleCir = {
    clipPath: "circle(50% at 50% 50%)",
  };

  const toggleCountryModal = () => {
    setIsSelectCountryModal(!isSelectCountryModal);
  };

  let cryptoFilterCollections = {};
  getCryptoFilterObj?.feeds?.forEach((obj) => {
    cryptoFilterCollections = {
      ...cryptoFilterCollections,
      [obj.type]: [...(cryptoFilterCollections?.[obj.type] || []), obj],
    };
  });

  let legalFilterCollections = {};
  getLegalFilterObj?.feeds?.forEach((obj) => {
    legalFilterCollections = {
      ...legalFilterCollections,
      [obj.type]: [...(legalFilterCollections?.[obj.type] || []), obj],
    };
  });

  let docsFilterCollections = {};
  getDocsFilterObj?.feeds?.forEach((obj) => {
    docsFilterCollections = {
      ...docsFilterCollections,
      [obj.type]: [...(docsFilterCollections?.[obj.type] || []), obj],
    };
  });

  let code = selectedCountry?.code;
  const submit = (type) => {
    setIsLoading(true);
    let fetchurl;
    if (type === "crypto") {
      fetchurl = `https://test-backend-4.abhixshakya.repl.co/api/v1?type=crypto&${
        code ? `code=${code}&` : ""
      }${query ? `query=${query}&` : ""}${toDate ? `toDate=${toDate}&` : ""}${
        fromDate ? `fromDate=${fromDate}&` : ""
      }&page=${currCryptoPage}&limit=10`;
    } else if (type === "legal") {
      fetchurl = `https://test-backend-4.abhixshakya.repl.co/api/v1?type=legal&${
        code ? `code=${code}&` : ""
      }${query ? `query=${query}&` : ""}${toDate ? `toDate=${toDate}&` : ""}${
        fromDate ? `fromDate=${fromDate}&` : ""
      }&page=${currLegalPage}&limit=10`;
    } else if (type === "docs") {
      fetchurl = `https://test-backend-4.abhixshakya.repl.co/api/v1?type=govtdocs&${
        code ? `code=${code}&` : ""
      }${query ? `query=${query}&` : ""}${toDate ? `toDate=${toDate}&` : ""}${
        fromDate ? `fromDate=${fromDate}&` : ""
      }&page=${currDocsPage}&limit=10`;
    }

    axios
      .get(fetchurl)
      .then((res) => {
        type === "crypto"
          ? setGetCryptoFilterObj(res.data)
          : type === "legal"
          ? setGetLegalFilterObj(res.data)
          : setGetDocsFilterObj(res.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 900);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    submit("crypto");
    submit("legal");
    submit("docs");
    // eslint-disable-next-line
  }, [currCryptoPage, currLegalPage, currDocsPage]);

  const toggleDateActive = (value, date) => {
    if (date === "fromDate") {
      if (value === "") {
        document
          .getElementsByClassName("datelabel")[0]
          .classList.remove("dateactive");
      } else {
        document
          .getElementsByClassName("datelabel")[0]
          .classList.add("dateactive");
      }
    } else {
      if (value === "") {
        document
          .getElementsByClassName("datelabel")[1]
          .classList.remove("dateactive");
      } else {
        document
          .getElementsByClassName("datelabel")[1]
          .classList.add("dateactive");
      }
    }
  };

  const cryptoPageCount = Math.ceil(getCryptoFilterObj?.totalResults / 10);
  const legalPageCount = Math.ceil(getLegalFilterObj?.totalResults / 10);
  const docsPageCount = Math.ceil(getDocsFilterObj?.totalResults / 10);

  const handleCryptoPageClick = (data) => {
    setCurrCryptoPage(data.selected + 1);
  };
  const handleLegalPageClick = (data) => {
    setCurrLegalPage(data.selected + 1);
  };
  const handleDocsPageClick = (data) => {
    setCurrDocsPage(data.selected + 1);
  };

  return (
    <PopCard toggleCard={toggleGlobalCard}>
      <h2 className="card-h2">{selectedCountry?.name}</h2>
      <div className="filters">
        <div className="country-select" onClick={toggleCountryModal}>
          <img
            style={selectedCountry.code === undefined ? listyleCir : null}
            loading="lazy"
            width="20"
            src={countryIcon}
            alt=""
          />
        </div>
        <input
          autocomplete="off"
          type="text"
          id="header-search"
          placeholder="Search"
          name="search"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <div className="datensearch">
          <span className="datelabel">From:</span>
          <input
            onChange={(e) => {
              setFromDate(e.target.value);
              toggleDateActive(e.target.value, "fromDate");
            }}
            type="date"
            id="fromDate"
            name="fromDate"
            placeholder=""
          />
          <span className="datelabel">To:</span>
          <input
            onChange={(e) => {
              setToDate(e.target.value);
              toggleDateActive(e.target.value, "toDate");
            }}
            type="date"
            id="toDate"
            name="toDate"
            placeholder=""
          />
          <button
            id="filter-btn"
            onClick={() => {
              setCurrCryptoPage(1);
              setCurrLegalPage(1);
              setCurrDocsPage(1);
              submit("crypto");
              submit("legal");
              submit("docs");
            }}
          >
            <BiSearchAlt />
          </button>
        </div>
      </div>
      {isSelectCountryModal ? (
        <SelectCountry
          setSelectedCountry={setSelectedCountry}
          toggleCountryModal={toggleCountryModal}
          setCountryIcon={setCountryIcon}
        />
      ) : null}

      <Tabs renderActiveTabContentOnly={true}>
        <div className="tab-head">
          <div className="tabs-container">
            <TabLink to="tab1">CRYPTO</TabLink>
            <TabLink to="tab2">LEGAL</TabLink>
            <TabLink to="tab3">DOCS</TabLink>
          </div>
        </div>
        <div style={{ height: "75%", top: "11rem" }} className="tab-ul">
          <TabContent for="tab1">
            <div className="ul-out">
              <ul className="tabul">
                {isLoading ? (
                  <>
                    <Loader />
                  </>
                ) : cryptoFilterCollections?.["crypto"]?.length ? (
                  cryptoFilterCollections?.["crypto"]?.map((e) => {
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
                                    ? e.linkIcon
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
            {cryptoPageCount > 1 ? (
              <Pagination
                currentPage={currCryptoPage}
                pageCount={cryptoPageCount}
                handlePageClick={handleCryptoPageClick}
              />
            ) : null}
          </TabContent>
          <TabContent for="tab2">
            <div className="ul-out">
              <ul className="tabul">
                {isLoading ? (
                  <Loader />
                ) : legalFilterCollections?.["legal"]?.length ? (
                  legalFilterCollections?.["legal"]?.map((e) => {
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
                                    ? e.linkIcon
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
            {legalPageCount > 1 ? (
              <Pagination
                currentPage={currLegalPage}
                pageCount={legalPageCount}
                handlePageClick={handleLegalPageClick}
              />
            ) : null}
          </TabContent>
          <TabContent for="tab3">
            <div className="ul-out">
              <ul className="tabul">
                {isLoading ? (
                  <Loader />
                ) : docsFilterCollections?.["govtdocs"]?.length ? (
                  docsFilterCollections?.["govtdocs"]?.map((e) => {
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
                                    ? e.linkIcon
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
            {docsPageCount > 1 ? (
              <Pagination
                currentPage={currDocsPage}
                pageCount={docsPageCount}
                handlePageClick={handleDocsPageClick}
              />
            ) : null}
          </TabContent>
        </div>
      </Tabs>
    </PopCard>
  );
}
