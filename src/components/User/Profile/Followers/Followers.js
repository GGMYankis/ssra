import React, { useEffect, useState } from "react";
import "./Followers.css";
import { GET_FOLLOWERS, GET_FOLLOWEDS } from "../../../../gql/follow";
import { useQuery } from "@apollo/client";
import { size } from "lodash";
import ModalBasic from "../../../../Modal/ModalBasic/ModalBasic";
import ListUsers from "../../ListUsers/ListUsers";

export default function Followers(props) {
  const { username, totalPublications } = props;
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(false);
  const [childrenModal, setChildrenModal] = useState(null);

  const {
    data: dataFollowers,
    loading: loadingFollowers,
    startPolling: startPollingFollowers,
    stopPolling: stopPollingFollowers,
  } = useQuery(GET_FOLLOWERS, {
    variables: { username },
  });

  const {
    data: dataFolloweds,
    loading: loadingFolloweds,
    startPolling: startPollingFolloweds,
    stopPolling: stopPollingFolloweds,
  } = useQuery(GET_FOLLOWEDS, {
    variables: { username },
  });

  useEffect(() => {
    startPollingFollowers(1000);
    return () => {
      stopPollingFollowers();
    };
  }, [startPollingFollowers, stopPollingFollowers]);

  useEffect(() => {
    startPollingFolloweds(1000);
  }, [startPollingFolloweds, stopPollingFolloweds]);

  if (loadingFollowers) return null;
  if (loadingFolloweds) return null;

  const { getFollowers } = dataFollowers;
  const { getFolloweds } = dataFolloweds;

  const openFollowers = () => {
    setTitleModal("Seguidores");
    setChildrenModal(
      <ListUsers users={getFollowers} setShowModal={setShowModal} />
    );
    setShowModal(true);
  };

  const openFolloweds = () => {
    setTitleModal("Usuarios seguidos");
    setChildrenModal(
      <ListUsers users={getFolloweds} setShowModal={setShowModal} />
    );
    setShowModal(true);
  };

  return (
    <>
      <div className="follower">
        <p>
          <span>{totalPublications}</span> publicaciones
        </p>
        <p className="link" onClick={openFollowers}>
          <span>{size(getFollowers)}</span> seguidores
        </p>
        <p className="link" onClick={openFolloweds}>
          <span>{size(getFolloweds)}</span> seguidos
        </p>
      </div>

      <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
        {childrenModal}
      </ModalBasic>
    </>
  );
}
