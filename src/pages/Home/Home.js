import React from "react";
import useAuth from "../../hooks/useAuth";
import { Grid } from "semantic-ui-react";
import Feed from "../../components/Home/Feed/Feed";
function Home() {
  const { auth } = useAuth();

  return (
    <Grid className="home">
      <Grid.Column className="home__left" width={11}>
        <Feed />
      </Grid.Column>
      <Grid.Column className="home__right" width={5}>
        <h2>Usuario no seguidos</h2>
      </Grid.Column>
    </Grid>
  );
}

export default Home;
