import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import tableStore from '../../stores/table-store';
import { Modal } from '../Modal/Modal';
import cls from './DetailModal.module.scss';

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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <div className={cls.DetailModal}>
        {config.colums.map((column, id) => (
          hideColumns[id] || <div key={id}>{column.caption}: {detailItem[column.dataField]}</div>
        ))}
      </div>
    </Modal>
  );
})