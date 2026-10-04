import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegistroScreen({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const registrarUsuario = async () => {
    if (usuario === '' || contrasena === '') {
      Alert.alert('Error', 'Complete todos los campos');
      return;
    }

    const nuevoUsuario = {
      usuario: usuario,
      contrasena: contrasena,
    };

    try {
      await AsyncStorage.setItem(
        'usuarioRegistrado',
        JSON.stringify(nuevoUsuario)
      );

      Alert.alert(
        'Registro exitoso',
        'Usuario registrado correctamente',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );

    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar el usuario');
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.icono}>⚡</Text>

      <Text style={styles.titulo}>
        CREAR CUENTA
      </Text>

      <Text style={styles.subtitulo}>
        SUMATE Y ORGANIZÁ TUS TAREAS
      </Text>

      <Text style={styles.label}>Usuario</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingrese un usuario"
        placeholderTextColor="#888"
        value={usuario}
        onChangeText={setUsuario}
      />

      <Text style={styles.label}>Contraseña</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingrese una contraseña"
        placeholderTextColor="#888"
        value={contrasena}
        onChangeText={setContrasena}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.boton}
        onPress={registrarUsuario}
      >
        <Text style={styles.textoBoton}>
          REGISTRARSE
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.volver}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.textoVolver}>
          VOLVER AL INICIO
        </Text>
      </TouchableOpacity>

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
    fontSize: 42,
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
    marginBottom: 5,
  },

  input: {
    backgroundColor: '#1F1F1F',
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#B56CFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 18,
  },

  boton: {
    backgroundColor: '#7B2CBF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },

  textoBoton: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  volver: {
    marginTop: 25,
    alignItems: 'center',
  },

  textoVolver: {
    color: '#B56CFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});