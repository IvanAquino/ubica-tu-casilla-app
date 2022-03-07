import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { VotingBoxContext } from '../contexts/VotingBoxContext';

const VotingBoxMarker = ({ votingBox }) => {
  const { displayVotingBox } = useContext(VotingBoxContext);

  const latLng = {
    latitude: votingBox.location.coordinates[1],
    longitude: votingBox.location.coordinates[0],
  };

  const showModalVotingBox = () => {
    displayVotingBox(votingBox);
  };

  return (
    <Marker coordinate={latLng} onPress={showModalVotingBox}>
      <View style={styles.marker}>
        <Text style={styles.text}>{votingBox.name}</Text>
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  marker: {
    backgroundColor: '#AE63F9',
    borderRadius: 4,
    height: 20,
    width: 20,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
});

export default VotingBoxMarker;
