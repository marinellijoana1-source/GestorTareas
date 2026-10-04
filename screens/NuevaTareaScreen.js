import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NuevaTareaScreen({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [recordatorio, setRecordatorio] = useState('');

  const guardarTarea = async () => {
    if (titulo === '' || recordatorio === '') {
      Alert.alert(
        'Error',
        'Complete el nombre de la tarea y el recordatorio'
      );
      return;
    }

    try {
      const tareasGuardadas = await AsyncStorage.getItem('tareas');

      let tareas = [];

      if (tareasGuardadas !== null) {
        tareas = JSON.parse(tareasGuardadas);
      }

      const nuevaTarea = {
        id: Date.now().toString(),
        titulo: titulo,
        recordatorio: recordatorio,
      };

      tareas.push(nuevaTarea);

      await AsyncStorage.setItem(
        'tareas',
        JSON.stringify(tareas)
      );

      Alert.alert(
        'Tarea guardada',
        'La tarea y el recordatorio se guardaron correctamente',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ]
      );

    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la tarea');
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.icono}>⚡</Text>

      <Text style={styles.titulo}>
        NUEVA TAREA
      </Text>

      <Text style={styles.subtitulo}>
        SUMÁ UN NUEVO OBJETIVO
      </Text>

      <Text style={styles.label}>
        Nombre de la tarea
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ej: Estudiar para el parcial"
        placeholderTextColor="#888"
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>
        Recordatorio
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ej: 20:00"
        placeholderTextColor="#888"
        value={recordatorio}
        onChangeText={setRecordatorio}
      />

      <TouchableOpacity
        style={styles.botonGuardar}
        onPress={guardarTarea}
      >
        <Text style={styles.textoBoton}>
          GUARDAR TAREA
        </Text>
      </TouchableOpacity>

      <View style={styles.volver}>
        <Button
          title="VOLVER A MIS TAREAS"
          onPress={() => navigation.navigate('Home')}
          color="#7B2CBF"
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: '#121212',
  },

  icono: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 5,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#B56CFF',
    marginBottom: 8,
  },

  subtitulo: {
    fontSize: 13,
    textAlign: 'center',
    color: '#AAAAAA',
    marginBottom: 35,
  },

  label: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 7,
  },

  input: {
    backgroundColor: '#1F1F1F',
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#B56CFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },

  botonGuardar: {
    backgroundColor: '#7B2CBF',
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: 'center',
  },

  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  volver: {
    marginTop: 25,
  },
});