import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Layout,
  TopNavigation,
  Text,
  TopNavigationAction,
  Icon,
  Select,
  SelectItem,
  IndexPath,
  Input,
  Button,
  Spinner,
  Divider,
  List,
  ListItem,
} from '@ui-kitten/components';
import { states } from '../data/states';
import { VotingBoxRepository } from '../repositories/VotingBoxRepository';
import { VotingBoxContext } from '../contexts/VotingBoxContext';
import { AdView } from '../components/AdView';

const votingBoxRepository = new VotingBoxRepository();

const SearchIcon = props => <Icon {...props} name="search" />;
const ButtonSpinner = props => <Spinner size="small" />;

const SearchScreen = ({ navigation }) => {
  const [selectedState, setSelectedState] = useState(new IndexPath(0));
  const [section, setSection] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [votingBoxes, setCurrentVotingBoxes] = useState([]);
  const { setVotingBoxesAndNextPosition } = useContext(VotingBoxContext);

  // Botón para regresar
  const backNavigation = () => (
    <TopNavigationAction
      icon={() => (
        <Icon name="arrow-back-outline" fill="#FFF" style={styles.icon} />
      )}
      onPress={() => {
        navigation.goBack();
      }}
    />
  );

  const onPressSearchButton = () => {
    if (selectedState.row === 0 || !section) {
      return;
    }
    const params = {
      state: selectedState.row,
      section: section,
    };
    setIsFetching(true);
    votingBoxRepository
      .searchBySection(params)
      .then(response => {
        setIsFetching(false);
        if (Array.isArray(response)) {
          setCurrentVotingBoxes(response);
        }
      })
      .catch(err => {
        setIsFetching(false);
        console.log(err);
      });
  };

  const onPressListItemMapButton = votingBox => {
    const nextPosition = {
      latitude: votingBox.location.coordinates[1],
      longitude: votingBox.location.coordinates[0],
    };
    setVotingBoxesAndNextPosition(votingBoxes, nextPosition);
    navigation.goBack();
  };

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.domicilio}`}
      description={`${item.ubicacion}`}
      accessoryRight={() => (
        <Button
          size="tiny"
          status="primary"
          onPress={() => onPressListItemMapButton(item)}>
          Mapa
        </Button>
      )}
    />
  );

  return (
    <Layout style={styles.layout}>
      <TopNavigation
        title={titleProps => (
          <Text {...titleProps} style={styles.title}>
            Buscar
          </Text>
        )}
        style={styles.navigation}
        accessoryLeft={backNavigation}
      />
      <View style={styles.conatiner}>
        <Select
          style={[styles.input]}
          selectedIndex={selectedState}
          onSelect={index => setSelectedState(index)}
          value={states[selectedState.row]}>
          {states.map((state, i) => (
            <SelectItem key={i} title={state} />
          ))}
        </Select>

        <Input
          style={[styles.input]}
          placeholder="Sección"
          keyboardType="numeric"
          value={section}
          onChangeText={nextValue => setSection(nextValue)}
        />

        <View style={[styles.input, styles.buttonContainer]}>
          <Button
            status="basic"
            accessoryLeft={isFetching ? ButtonSpinner : SearchIcon}
            onPress={onPressSearchButton}>
            Buscar
          </Button>
        </View>

        <List
          style={styles.votingBoxList}
          data={votingBoxes}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
          ListFooterComponent={() => (
            <AdView loadOnMount={true} type="image" media={false} />
          )}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  conatiner: {
    padding: 10,
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
  input: {
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  votingBoxList: {
    width: '100%',
  },
});

export default SearchScreen;
