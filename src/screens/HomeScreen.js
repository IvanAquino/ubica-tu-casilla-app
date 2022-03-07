/* eslint-disable react-hooks/exhaustive-deps */
import {
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React, { useRef, useContext, useEffect } from 'react';
import { StyleSheet, PermissionsAndroid } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { initialRegion, mapStyles } from '../config/maps';
import Geolocation from 'react-native-geolocation-service';
import { VotingBoxContext } from '../contexts/VotingBoxContext';
import VotingBoxMarker from '../components/VotingBoxMarker';
import VotingBoxModal from '../components/VotingBoxModal';

const HomeScreen = ({ navigation }) => {
  const mapRef = useRef(null);
  const { setMapPosition, votingBoxState, clearNextPosition } =
    useContext(VotingBoxContext);

  useEffect(() => {
    if (votingBoxState.nextPosition != null) {
      mapRef.current.animateToRegion({
        ...votingBoxState.nextPosition,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
    }
  }, [votingBoxState]);

  /**
   * Ejecutar cuando el mapa este cargado
   * @return void
   */
  const onMapReady = () => {
    requestLocationPermission();
  };

  /**
   * Ejecutar cuando el mapa cambie de posicion
   */
  const onRegionChangeComplete = region => {
    if (votingBoxState.nextPosition != null) {
      clearNextPosition();
    } else {
      setMapPosition({
        latitude: region.latitude,
        longitude: region.longitude,
      });
    }
  };

  /**
   * Solicitar permiso para acceder a la ubicación
   * @return void
   */
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Localización',
          message:
            'Permitenos acceder a tu ubicación para mostrarte las casillas cercanas',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getUserLocation();
      } else {
      }
    } catch (err) {
      console.warn(err);
    }
  };

  /**
   * Obtener la ubicación del dispositivo
   * @returns void
   */
  const getUserLocation = (enableHighAccuracy = true) => {
    Geolocation.getCurrentPosition(
      position => {
        mapRef.current.animateToRegion(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          },
          1000,
        );
      },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy, timeout: 10000, maximumAge: 1000 },
    );
  };

  // Botón para la busqueda
  const searchNavigation = () => (
    <TopNavigationAction
      icon={() => <Icon name="search" fill="#FFF" style={styles.icon} />}
      onPress={() => {
        navigation.navigate('Search');
      }}
    />
  );

  return (
    <Layout style={styles.layout}>
      <TopNavigation
        style={styles.navigation}
        title={titleProps => (
          <Text {...titleProps} style={styles.title}>
            Ubica tu casilla
          </Text>
        )}
        accessoryRight={searchNavigation}
      />
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyles}
        style={styles.map}
        initialRegion={initialRegion}
        moveOnMarkerPress={false}
        onMapReady={onMapReady}
        onRegionChangeComplete={onRegionChangeComplete}>
        {votingBoxState.votingBoxes.map((box, i) => (
          <VotingBoxMarker key={i} votingBox={box} />
        ))}
      </MapView>

      <VotingBoxModal />
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  navigation: {
    backgroundColor: '#AE63F9',
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
  },
  icon: {
    width: 32,
    height: 32,
  },
  map: {
    flex: 1,
  },
});

export default HomeScreen;
