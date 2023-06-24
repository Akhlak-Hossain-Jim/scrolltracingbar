import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function Home() {
  const [width, setWidth] = useState("0%");

  const [data, setData] = useState([]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setWidth(
        Math.round(
          (window.scrollY / (document.body.offsetHeight - window.innerHeight)) *
            100
        ) + "%"
      );
    });
  });

  useEffect(() => {
    fetch(`https://api.github.com/users`)
      .then((resp) => resp.json())
      .then((rep) => {
        setData(rep);
      })
      .catch((error) =>
        setData([{ login: `There is a problem with your Fetch: ${error}` }])
      );
  }, []);

  console.log(data);

  return (
    <>
      <main>
        <BarContainer>
          <div className="scroll-bar" style={{ width: `${width}` }}></div>
        </BarContainer>

        <div id="root">
          {data.map((data) => (
            <Box key={data.avatar_url}>
              <img src={data.avatar_url} alt={`${data.login} avatar`} />
              <div className="data">
                <h2>{data.login}</h2>
                <p>:github user</p>
                <p>
                  <a
                    href={data.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View github
                  </a>
                </p>
              </div>
            </Box>
          ))}
        </div>
      </main>

      <FooterContainer>
        <p>
          This demo is created by
          <a
            href="http://akhlak-hossain-jim.github.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Akhlak Hossain Jim
          </a>
          &nbsp;&copy;&nbsp;2021 | with github api
        </p>
      </FooterContainer>
    </>
  );
}

const BarContainer = styled.div`
  width: 100vw;
  height: 10px !important;
  background-color: #30363d;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000000;
  .scroll-bar {
    height: 100%;
    padding: 0px;
    margin: 0px;
    background-color: aquamarine;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  img {
    height: 70px;
    margin: 20px;
    width: 70px;
    border-radius: 50%;
  }
  a {
    color: aqua;
  }
`;

const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 30px;
  color: aquamarine;
  text-align: center;
  p,
  a {
    font-size: 12px;
    margin: 10px;
    text-decoration: none;
    font-weight: 600;
    color: aquamarine;
  }
  a {
    &:hover {
      text-decoration: underline;
    }
  }
`;
