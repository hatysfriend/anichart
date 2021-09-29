import React, {useEffect} from "react";
import { Dispatch } from "redux";
import styled from "styled-components";
import animeService from "../../services/animeService";
import { setAnimePage } from "./homePageSlice";
import { GetAnimePage } from "../../services/animeService/__generated__/GetAnimePage";
import { useAppDispatch } from "../../hooks";
import { TopAnime } from "./TopAnime";

interface IHomePageProps {

}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const actionDispatch = (dispatch: Dispatch) => ({
  setAnimePage: (page: GetAnimePage["Page"]) => dispatch(setAnimePage(page))
});

export function HomePage(props: IHomePageProps) {
  const {setAnimePage} = actionDispatch(useAppDispatch());

  const fetchAnimePage = async () => {
    const animePage = await animeService.getAnimePage(0,50).catch((err)=>{
      console.log("Error: ", err);
    })

    console.log("Anime Page: ", animePage);
    if(animePage) setAnimePage(animePage);
  }

  useEffect(() => {
    fetchAnimePage();
  }, [])

  return <Container>
    <h1>
      Anime Series
    </h1>
    <TopAnime/>
  </Container>
}