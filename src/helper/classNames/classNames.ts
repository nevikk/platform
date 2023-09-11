// Record - специальный typescript класс, который в нашем случае <string, boolean | string> означает, что в качестве ключа будет string, а в качестве значения будет булеан или стринг
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
    // В массиве additional могут быть undefined, то нужно фильтровать по boolean
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([className]) => className)
  ].join(' ');
}
