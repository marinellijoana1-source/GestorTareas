import { validarTarea } from '../utils/validaciones';

test('valida que una tarea tenga un nombre', () => {
  const resultado = validarTarea('Recital Almafuerte');

  expect(resultado).toBe(true);
});