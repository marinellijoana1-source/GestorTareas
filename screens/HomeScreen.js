import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  SafeAreaView
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import TaskItem from '../components/TaskItem';

export default function HomeScreen({ navigation }) {
  const [tareas, setTareas] = useState([]);

  const cargarTareas = async () => {
    try {
      const tareasGuardadas = await AsyncStorage.getItem('tareas');

      if (tareasGuardadas !== null) {
        setTareas(JSON.parse(tareasGuardadas));
      } else {
        setTareas([]);
      }
    } catch (error) {
      console.log('Error al cargar las tareas');
    }
  };

  const eliminarTarea = async (id) => {
    try {
      const nuevasTareas = tareas.filter(
        (tarea) => tarea.id !== id
      );

      await AsyncStorage.setItem(
        'tareas',
        JSON.stringify(nuevasTareas)
      );

      setTareas(nuevasTareas);

      Alert.alert(
        'Tarea eliminada',
        'La tarea se eliminó correctamente'
      );

    } catch (error) {
      Alert.alert(
        'Error',
        'No se pudo eliminar la tarea'
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      cargarTareas();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea}>

      <View style={styles.container}>

        <Text style={styles.icono}>⚡</Text>

        <Text style={styles.titulo}>
          MIS TAREAS
        </Text>

        <Text style={styles.subtitulo}>
          ORGANIZÁ. CUMPLÍ. REPETÍ.
        </Text>

        <View style={styles.contenido}>

          {tareas.length === 0 ? (
            <Text style={styles.mensaje}>
              Todavía no hay tareas cargadas.
            </Text>
          ) : (
            <FlatList
              data={tareas}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TaskItem
                  tarea={item}
                  onEliminar={eliminarTarea}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          )}

        </View>

        <TouchableOpacity
          style={styles.botonNueva}
          onPress={() => navigation.navigate('NuevaTarea')}
        >
          <Text style={styles.textoBoton}>
            + NUEVA TAREA
          </Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },

  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },

  icono: {
    fontSize: 30,
    textAlign: 'center',
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#B56CFF',
    marginTop: 3,
  },

  subtitulo: {
    fontSize: 12,
    textAlign: 'center',
    color: '#AAAAAA',
    marginTop: 4,
    marginBottom: 15,
  },

  contenido: {
    flex: 1,
  },

  mensaje: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
  },

 botonNueva: {
  backgroundColor: '#7B2CBF',
  paddingVertical: 11,
  borderRadius: 8,
  alignItems: 'center',
  marginTop: 10,
  marginBottom: 60,
},
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
