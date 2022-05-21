import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Recommends from "./Recommends";
import Trending from "./Trending";
import Viewers from "./Viewers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../disneyPlusMoviesData.json";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";

const Home = (props: any) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  let newDisneys: any[] = [];
  let recommends: any[] = [];
  let originals: any[] = [];
  let trending: any[] = [];

  useEffect(() => {
    const keys = Object.keys(db.movies);
    keys.map((key, index) => {
      // @ts-ignore
      const doc = db.movies[key];
      console.log(doc);
      switch (doc.type) {
        case "recommend":
          recommends = [...recommends, { id: doc.id, ...doc }];
          break;

        case "new":
          newDisneys = [...newDisneys, { id: doc.id, ...doc }];
          break;

        case "original":
          originals = [...originals, { id: doc.id, ...doc }];
          break;

        case "trending":
          trending = [...trending, { id: doc.id, ...doc }];
          break;
      }
    });

    dispatch(
      setMovies({
        recommend: recommends,
        newDisney: newDisneys,
        original: originals,
        trending: trending,
      })
    );
  }, [userName]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
