/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { initialRegion } from '../config/maps';
import { VotingBoxRepository } from '../repositories/VotingBoxRepository';

const repository = new VotingBoxRepository();

export const VotingBoxContext = React.createContext();

export const VotingBoxProvider = ({ children }) => {
  const [mapPosition, setMapPosition] = useState({
    latitude: initialRegion.latitude,
    longitude: initialRegion.longitude,
  });
  const [votingBoxState, setVotingBoxState] = useState({
    isFetchingVotingBoxes: false,
    votingBoxes: [],
    displayVotingBox: null,
    nextPosition: null,
  });

  useEffect(() => {
    setVotingBoxState({
      ...votingBoxState,
      isFetchingVotingBoxes: true,
    });
    repository
      .getVotingBoxes(mapPosition)
      .then(boxes => {
        setVotingBoxState({
          ...votingBoxState,
          votingBoxes: Array.isArray(boxes) ? boxes : [],
          isFetchingVotingBoxes: false,
        });
      })
      .catch(err => {
        console.log(err);
        setVotingBoxState({
          ...votingBoxState,
          isFetchingVotingBoxes: false,
        });
      });
  }, [mapPosition]);

  const displayVotingBox = votingBox => {
    setVotingBoxState({
      ...votingBoxState,
      displayVotingBox: votingBox,
    });
  };
  const hideVotingBox = () => {
    setVotingBoxState({
      ...votingBoxState,
      displayVotingBox: null,
    });
  };

  const setVotingBoxesAndNextPosition = (votingBoxes, nextPosition) => {
    setVotingBoxState({
      ...votingBoxState,
      votingBoxes,
      nextPosition,
    });
  };

  const clearNextPosition = () => {
    setVotingBoxState({
      ...votingBoxState,
      nextPosition: null,
    });
  };

  return (
    <VotingBoxContext.Provider
      value={{
        setMapPosition,
        mapPosition,
        votingBoxState,
        setVotingBoxState,
        displayVotingBox,
        hideVotingBox,
        setVotingBoxesAndNextPosition,
        clearNextPosition,
      }}>
      {children}
    </VotingBoxContext.Provider>
  );
};
