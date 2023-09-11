import { memo } from 'react';
import cls from './ButtonsRow.module.scss';
import { observer } from 'mobx-react-lite';
import tableStore from '../../stores/table-store';
import { Colum } from '../../model/report-config';

export const ButtonsRow = memo(observer(() => {

  const {
    config,
    hideColumns,
    changeColumnHide,
  } = tableStore;

  
  return (
    <div className={cls.btns}>
        {config.colums.map((column: Colum, columnId: number) => (
          <button
            key={columnId}
            className={cls.hideBtn}
            onClick={() => {changeColumnHide(columnId)}}
          >{hideColumns[columnId] ? '+' : '-'}</button>
        ))}
      </div>
  );
}))