import React, { useContext, useRef, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Modal, Card, Text, Button } from '@ui-kitten/components';
import { VotingBoxContext } from '../contexts/VotingBoxContext';
import { AdView } from './AdView';

const VotingBoxModal = () => {
  const { votingBoxState, hideVotingBox } = useContext(VotingBoxContext);
  const nativeAdViewRef = useRef();

  useEffect(() => {
    nativeAdViewRef.current?.loadAd();
  }, []);

  return (
    <Modal
      visible={votingBoxState.displayVotingBox != null}
      backdropStyle={styles.backdrop}
      onBackdropPress={hideVotingBox}>
      {votingBoxState.displayVotingBox && (
        <Card>
          <ScrollView>
            <Text style={styles.title}>
              {votingBoxState.displayVotingBox.alias}
            </Text>
            <Text style={styles.subtitle}>DOMICILIO</Text>
            <Text style={styles.text}>
              {votingBoxState.displayVotingBox.domicilio}
            </Text>
            <Text style={styles.subtitle}>UBICACIÓN</Text>
            <Text style={styles.text}>
              {votingBoxState.displayVotingBox.ubicacion}
            </Text>
            <Text style={styles.subtitle}>REFERENCIA</Text>
            <Text style={styles.text}>
              {votingBoxState.displayVotingBox.referencia}
            </Text>
            <Text style={styles.subtitle}>SECCIÓN</Text>
            <Text style={styles.text}>
              {votingBoxState.displayVotingBox.section}
            </Text>
            <View style={styles.adContainer}>
              <AdView loadOnMount={true} type="image" media={false} />
            </View>
            <Button size="small" status="basic" onPress={hideVotingBox}>
              Cerrar
            </Button>
          </ScrollView>
        </Card>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
  adContainer: {
    marginVertical: 20,
  },
});

export default VotingBoxModal;
