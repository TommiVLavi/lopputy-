import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListScr from './components/list'
import FormScr from './components/form'
import MapScr from './components/map'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="List" component={ListScr} />
        <Stack.Screen name="Form" component={FormScr} />
        <Stack.Screen name="Map" component={MapScr} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}