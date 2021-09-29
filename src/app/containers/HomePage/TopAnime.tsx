import React from "react";
import { createSelector } from "reselect";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { makeSelectAnimePage } from "./selectors";

const TopAnimeContainer = styled.div`
  max-width: 1280px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const AnimeItemContainer = styled.div`
  margin: 40px 10px;
  width: 18em;
  height: 20em;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

const AnimeCover = styled.div`
  width: auto;
  height: 16em;

  img {
    width: auto;
    height: 100%;
  }
`;

const AnimeTitle = styled.h6`
  margin: 10px;
  font-size: 16px;
  color: #000;
  font-weight: 600;
`;

const stateSelector = createSelector(makeSelectAnimePage, (animePage) => ({
  animePage,
}));

export function TopAnime() {
  const { animePage } = useAppSelector(stateSelector);

  const isEmptyAnimePage =
    !animePage || !animePage.media || animePage.media.length === 0;
  console.log("Empty Page?:", isEmptyAnimePage);

  if (isEmptyAnimePage) return <div>Loading...</div>

  return (
    <TopAnimeContainer>
      {animePage &&
        animePage.media &&
        animePage.media.map((anime) => {
          return (
            <AnimeItemContainer>
              <AnimeCover>
                <img
                  src={anime?.coverImage?.extraLarge || ""}
                  alt="anime cover img"
                />
              </AnimeCover>
              <AnimeTitle>
                {anime?.title?.english
                  ? anime?.title?.english
                  : anime?.title?.userPreferred}
              </AnimeTitle>
              <b>Average Score: {anime?.averageScore}</b>
            </AnimeItemContainer>
          );
        })}
    </TopAnimeContainer>
  );
}
