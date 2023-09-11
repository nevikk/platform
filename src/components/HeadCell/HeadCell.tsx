import { observer } from 'mobx-react-lite';
import { ChangeEvent, FC, memo } from 'react';
import { Mods, classNames } from '../../helper/classNames/classNames';
import tableStore from '../../stores/table-store';
import cls from './HeadCell.module.scss';

interface HeadCellProps {
  columnId: number;
}

export const HeadCell: FC<HeadCellProps> = memo(observer((props) => {
  const { config, changeColumnCaption } = tableStore;

  const { columnId } = props;

  const { caption } = config.colums[columnId];

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    changeColumnCaption({ value: event.target.value, columnId })
  }

  

  const mods: Mods = {
    [cls.empty]: !Boolean(caption)
  }

  return (
    <div className={classNames(cls.HeadCell, mods, [])}>
      <input
        type={'text'}
        className={cls.input}
        onChange={changeHandler}
        value={caption}
      />
    </div>
  );
}))