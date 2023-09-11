import { FC, memo } from 'react';
import cls from './Cell.module.scss';

interface CellProps {
  text: string;
  onDoubleClick: (id: number) => void;
  itemId: number;
}

export const Cell: FC<CellProps> = memo((props) => {
  const { text, onDoubleClick, itemId } = props;

  const doubleClickHandler = () => {
    onDoubleClick(itemId)
  }

  return (
    <div 
      className={cls.Cell}
      onDoubleClick={doubleClickHandler}
    >
      {text}
    </div>
  );
})