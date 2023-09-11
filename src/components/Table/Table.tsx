import { observer } from 'mobx-react-lite';
import { Data, data as newData } from '../../model/data';
import { Colum, config as newConfig } from '../../model/report-config';
import { Cell } from '../Cell/Cell';
import { Column } from '../Column/Column';
import cls from './Table.module.scss';
import tableStore from '../../stores/table-store';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { DetailModal } from '../DetailModal/DetailModal';
import { Pagination } from 'antd';

interface TableProps {
  className?: string;
}

const pageSize = 20;

export const Table = observer(() => {
  const {
    data,
    config,
    hideColumns,
    setData,
    setConfig,
    changeColumnHide,
    setDetailItem
  } = tableStore;
  
  
  
  const [isDetailModal, setIsDetailModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = useMemo(() => { 
    return (currentPage-1)*pageSize
  }, [currentPage, pageSize])

  const endIndex = useMemo(() => {
    return (currentPage-1)*pageSize+pageSize
  }, [currentPage, pageSize])

  const onCloseModal = useCallback(() => {
    setIsDetailModal(false);
  }, []);

  const openModal = useCallback((id: number) => {
    setDetailItem(id);
    setIsDetailModal(true);
  }, []);

  useEffect(() => {
    setConfig(newConfig);
    setData(newData);
  }, [])

  return (
    <>
    <div className={cls.Table}>
      <div className={cls.btns}>
        {config.colums.map((column: Colum, columnId: number) => (
          <button
            key={columnId}
            className={cls.hideBtn}
            onClick={() => {changeColumnHide(columnId)}}
          >{hideColumns[columnId] ? '+' : '-'}</button>
        ))}
      </div>
      <div className={cls.body}>
      {config.colums.map((column: Colum, columnId: number) => (
        <Column
          key={columnId}
          id={columnId}
          hide={hideColumns[columnId]}
        >
          {data.slice(startIndex, endIndex).map((item: Data, id: number) => (
            <Cell
              onDoubleClick={openModal}
              key={id}
              itemId={id}
              text={item[column.dataField] ? item[column.dataField] : ''}
            />
          ))}
        </Column>
      ))}
      </div>
      <div className={cls.pagination}>
        <Pagination 
          onChange={(page) => {setCurrentPage(page)}}
          defaultCurrent={1}
          pageSize={pageSize}
          total={data.length ? data.length : 1}
        />
      </div>
    </div>
    {isDetailModal && <DetailModal
      isOpen={isDetailModal}
      onClose={onCloseModal}
    />}
    </>
  );
})