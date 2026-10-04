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

export default function LoginScreen({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const iniciarSesion = async () => {
    if (usuario === '' || contrasena === '') {
      Alert.alert('Error', 'Complete todos los campos');
      return;
    }

    try {
      const datosGuardados = await AsyncStorage.getItem('usuarioRegistrado');

      if (datosGuardados === null) {
        Alert.alert('Error', 'No hay ningún usuario registrado');
        return;
      }

      const usuarioGuardado = JSON.parse(datosGuardados);

      if (
        usuario === usuarioGuardado.usuario &&
        contrasena === usuarioGuardado.contrasena
      ) {
        Alert.alert(
          'Bienvenido',
          'Inicio de sesión correcto',
          [
            {
              text: 'OK',
              onPress: () => navigation.replace('Home'),
            },
          ]
        );
      } else {
        Alert.alert('Error', 'Usuario o contraseña incorrectos');
      }

    } catch (error) {
      Alert.alert('Error', 'No se pudo iniciar sesión');
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.icono}>⚡</Text>

      <Text style={styles.titulo}>GESTOR DE TAREAS</Text>

      <Text style={styles.subtitulo}>
        ORGANIZÁ TU DÍA A TU MANERA
      </Text>

      <Text style={styles.label}>Usuario</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingrese su usuario"
        placeholderTextColor="#888"
        value={usuario}
        onChangeText={setUsuario}
      />

      <Text style={styles.label}>Contraseña</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingrese su contraseña"
        placeholderTextColor="#888"
        value={contrasena}
        onChangeText={setContrasena}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.botonIngresar}
        onPress={iniciarSesion}
      >
        <Text style={styles.textoBoton}>
           INGRESAR
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registro}
        onPress={() => navigation.navigate('Registro')}
      >
        <Text style={styles.textoRegistro}>
          ¿No tenés una cuenta?
        </Text>

        <Text style={styles.textoRegistroDestacado}>
          REGISTRARSE
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

  botonIngresar: {
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

  registro: {
    marginTop: 25,
    alignItems: 'center',
  },

  textoRegistro: {
    color: '#AAAAAA',
    fontSize: 14,
  },

  textoRegistroDestacado: {
    color: '#B56CFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 4,
  },
});