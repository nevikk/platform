import { makeAutoObservable } from "mobx";
import { Data } from "../model/data";
import { TableConfig } from "../model/report-config";

class TableStore {
  data: Data[] = [];
  config: TableConfig = {
    name: '',
    code: '',
    colums: []
  };
  hideColumns: Record<string, boolean> = {};
  detailItem: Data = {};

  constructor() {
    makeAutoObservable(this);
  }

  setData = (value: Data[]) => {
    this.data = value;
  }

  setConfig = (value: TableConfig) => {
    this.config = value;
    value.colums.map((column, columnId) => {
      this.hideColumns[columnId] = false;
    })
  }

  changeColumnHide = (value: number) => {
    this.hideColumns[value] = !this.hideColumns[value];
  }

  changeColumnCaption = (payload: {value: string; columnId: number}) => {
    const { value, columnId } = payload;
    this.config.colums[columnId].caption = value;
  }

  setDetailItem = (value: string) => {
    const findItem = this.data.find(item => item.id === value);
    this.detailItem = findItem ? findItem : {};
  }
}


export default new TableStore();