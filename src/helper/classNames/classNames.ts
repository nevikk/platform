export type Mods = Record<string, boolean | string | undefined>

// Функция, которая будет склеивать классы, которые мы сюда отправим
// cls - основной класс
// mods объект, в котором будут классы, которые должны добавляться при условии
// additional - просто дополнительный классы
export function classNames(
  cls: string,
  mods: Mods = {},
  additional: Array<undefined | string> = []
): string {
  return [
    cls,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([className]) => className)
  ].join(' ');
}
