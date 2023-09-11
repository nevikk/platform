export interface TableConfig {
  name: string;
  code: string;
  colums: Colum[]
}

export interface Colum {
  'dataField': string;
  'caption': string;
  'dataType': string;
  'format': string;
  'alignment': string;
}

export const config: TableConfig = {
  name: 'Тест',
  code: '1',
  colums: [
    {
      dataField: 'name',
      dataType: 'string',
      caption: 'Название',
      format: 'format',
      alignment: 'start',
    },
    {
      dataField: 'price',
      dataType: 'string',
      caption: 'Цена',
      format: 'format',
      alignment: 'start',
    },
    {
      dataField: 'quantity',
      dataType: 'string',
      caption: 'Количество',
      format: 'format',
      alignment: 'start',
    },
  ]
}