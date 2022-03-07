import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import MainStack from './src/navigation/MainStack';
import { VotingBoxProvider } from './src/contexts/VotingBoxContext';

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <NavigationContainer>
      <ApplicationProvider {...eva} theme={eva.light}>
        <VotingBoxProvider>
          <MainStack />
        </VotingBoxProvider>
      </ApplicationProvider>
    </NavigationContainer>
  </>
);
