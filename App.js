import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import RegistroScreen from './screens/RegistroScreen';
import HomeScreen from './screens/HomeScreen';
import NuevaTareaScreen from './screens/NuevaTareaScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Iniciar sesión' }}
        />

        <Stack.Screen
          name="Registro"
          component={RegistroScreen}
          options={{ title: 'Registro' }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Mis tareas' }}
        />

        <Stack.Screen
          name="NuevaTarea"
          component={NuevaTareaScreen}
          options={{ title: 'Nueva tarea' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}