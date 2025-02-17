import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import LineChart from "../Graph/LineGraph";

import {
  WeatherInfoContainer,
  InfoTitle,
  InfoContainer,
  InfoItemTitle,
  InfoItemDate,
  InfoItemItem,
  TitleContainer,
  DaySelectButton,
  DaySelectButtonContainer,
} from "./WeatherInfo.style";

function WeatherInfo({
  dateInfo,
  graphOption,
  areaName,
  ChartHandle,
  showChart,
  buttonColor,
}) {
  const nowDate = new Date();
  let year = nowDate.getFullYear();
  let month = nowDate.getMonth() + 1;
  let day = nowDate.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }

  const [date, setDate] = useState(`${year}.${month}.${day}`);
  const chartButtonIdx = (e) => {
    ChartHandle(e.target.id);
    showChart(e.target.id);
    if (e.target.id === "0") {
      let dataDate = dateInfo[0].date;
      setDate(
        `${dataDate.slice(0, 4)}.${dataDate.slice(4, 6)}.${dataDate.slice(6)}`
      );
    } else if (e.target.id === "1") {
      let dataDate = dateInfo[1].date;
      setDate(
        `${dataDate.slice(0, 4)}.${dataDate.slice(4, 6)}.${dataDate.slice(6)}`
      );
    } else if (e.target.id === "2") {
      let dataDate = dateInfo[2].date;
      setDate(
        `${dataDate.slice(0, 4)}.${dataDate.slice(4, 6)}.${dataDate.slice(6)}`
      );
    }
  };
  useEffect(() => {
    showChart("0");
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [chartSize, setChartSize] = useState(0);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = debounce(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 100);

  useEffect(() => {
    if (windowSize.width >= 1060) {
      setChartSize(900);
    } else {
      setChartSize(windowSize.width - 20);
    }
  }, [windowSize]);
  return (
    <>
      <WeatherInfoContainer>
        <TitleContainer>
          <InfoTitle>{areaName}의 날씨 정보</InfoTitle>
          <DaySelectButtonContainer>
            <DaySelectButton
              buttonColor={buttonColor.today}
              onClick={(e) => chartButtonIdx(e)}
              id={"0"}
            >
              오늘
            </DaySelectButton>
            <DaySelectButton
              buttonColor={buttonColor.tomorrow}
              onClick={(e) => chartButtonIdx(e)}
              id={"1"}
            >
              내일
            </DaySelectButton>
            <DaySelectButton
              buttonColor={buttonColor.dayAfterTomorrow}
              onClick={(e) => chartButtonIdx(e)}
              id={"2"}
            >
              모레
            </DaySelectButton>
          </DaySelectButtonContainer>
        </TitleContainer>
        <InfoContainer>
          <InfoItemTitle>기온</InfoItemTitle>
          <InfoItemDate>
            <span>{date}</span>
            <span>섭씨 (°C)</span>
          </InfoItemDate>
          <InfoItemItem>
            <LineChart
              graphOption={graphOption}
              series={graphOption[0].series}
              TMPline={true}
              chartSize={chartSize}
            ></LineChart>
          </InfoItemItem>
        </InfoContainer>
        <InfoContainer>
          <InfoItemTitle>강수</InfoItemTitle>
          <InfoItemDate>
            <span>{date}</span>
            <span>확률 (%)</span>
          </InfoItemDate>
          <InfoItemItem>
            <LineChart
              graphOption={graphOption}
              POPbar={true}
              chartSize={chartSize}
            ></LineChart>
          </InfoItemItem>
        </InfoContainer>
        <InfoContainer>
          <InfoItemTitle>습도</InfoItemTitle>
          <InfoItemDate>
            <span>{date}</span>
            <span>상대습도 (%)</span>
          </InfoItemDate>
          <InfoItemItem>
            <LineChart
              graphOption={graphOption}
              REHbar={true}
              chartSize={chartSize}
            ></LineChart>
          </InfoItemItem>
        </InfoContainer>
      </WeatherInfoContainer>
    </>
  );
}

export default WeatherInfo;
