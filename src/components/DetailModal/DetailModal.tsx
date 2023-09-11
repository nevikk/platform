import { FC } from 'react';
import { Modal } from '../Modal/Modal';
import cls from './DetailModal.module.scss';
import { observer } from 'mobx-react-lite';
import tableStore from '../../stores/table-store';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DetailModal: FC<DetailModalProps> = observer((props) => {
  const {
    isOpen,
    onClose
  } = props;

  const { config, detailItem, hideColumns } = tableStore;

  console.log('hideColumns', {...hideColumns});
  

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <div className={cls.DetailModal}>
        {config.colums.map((column, id) => {
          console.log(hideColumns[id]);
          
          return (
          hideColumns[id] || <div key={id}>{column.caption}: {detailItem[column.dataField]}</div>
        )})}
      </div>
    </Modal>
  );
})