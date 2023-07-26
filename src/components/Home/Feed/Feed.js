import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { map } from "lodash";
import { Link } from "react-router-dom";
import { GET_PUBLICATIONS_FOLLOWEDS } from "../../../gql/publication";
import ImageNOtFound from "../../../assets/png/avatar (1).png";
import { Image } from "semantic-ui-react";
import "./Feed.css";

export default function Feed() {
  const { data, loading } = useQuery(GET_PUBLICATIONS_FOLLOWEDS);

  if (loading) return null;

  const { getPublicationFolloweds } = data;
  return (
    <div className="feed">
      {map(getPublicationFolloweds, (publication, index) => (
        <div key={index} className="feed__box">
          <Link to={`/${publication.idUser.username}`}>
            <div className="feed__box-user">
              <Image src={publication.idUser.avatar || ImageNOtFound} avatar />
              <span>{publication.idUser.name}</span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
