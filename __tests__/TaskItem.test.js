import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TaskItem from '../components/TaskItem';

test('muestra correctamente el nombre de la tarea', async () => {
  const tarea = {
    id: '1',
    titulo: 'Recital Almafuerte',
  };

  const { getByText } = await render(
    <TaskItem
      tarea={tarea}
      onEliminar={() => {}}
    />
  );

  expect(
    getByText('Recital Almafuerte')
  ).toBeTruthy();
});

test('ejecuta la funcion eliminar al presionar el boton', async () => {
  const tarea = {
    id: '1',
    titulo: 'Recital Almafuerte',
  };

  const eliminarTarea = jest.fn();

  const { getByText } = await render(
    <TaskItem
      tarea={tarea}
      onEliminar={eliminarTarea}
    />
  );

  fireEvent.press(
    getByText('ELIMINAR')
  );

  expect(eliminarTarea).toHaveBeenCalledWith('1');
});