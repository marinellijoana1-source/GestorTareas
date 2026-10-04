import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default function TaskItem({ tarea, onEliminar }) {
  return (
    <View style={styles.container}>

      <View style={styles.contenido}>
        <Text style={styles.simbolo}>⚡</Text>

        <View style={styles.datos}>
          <Text style={styles.titulo}>
            {tarea.titulo}
          </Text>

          {tarea.recordatorio ? (
            <Text style={styles.recordatorio}>
              🕐 Recordatorio: {tarea.recordatorio}
            </Text>
          ) : null}
        </View>
      </View>

      <TouchableOpacity
        style={styles.botonEliminar}
        onPress={() => onEliminar(tarea.id)}
      >
        <Text style={styles.textoEliminar}>
          ELIMINAR
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1F1F1F',
    borderWidth: 1,
    borderColor: '#B56CFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
  },

  contenido: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  simbolo: {
    fontSize: 20,
    marginRight: 10,
  },

  datos: {
    flex: 1,
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 17,
  },

  recordatorio: {
    color: '#AAAAAA',
    fontSize: 14,
    marginTop: 5,
  },

  botonEliminar: {
    borderWidth: 1,
    borderColor: '#B56CFF',
    paddingVertical: 8,
    borderRadius: 7,
    alignItems: 'center',
  },

  textoEliminar: {
    color: '#B56CFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
});