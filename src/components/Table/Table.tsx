import { Pagination } from 'antd';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Data, data as newData } from '../../model/data';
import { Colum, config as newConfig } from '../../model/report-config';
import tableStore from '../../stores/table-store';
import { ButtonsRow } from '../ButtonsRow/ButtonsRow';
import { Cell } from '../Cell/Cell';
import { Column } from '../Column/Column';
import { DetailModal } from '../DetailModal/DetailModal';
import cls from './Table.module.scss';

const PAGE_SIZE = 20;

export const Table = observer(() => {
  const {
    data,
    config,
    hideColumns,
    setData,
    setConfig,
    setDetailItem
  } = tableStore;

  const [isDetailModal, setIsDetailModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setConfig(newConfig);
    setData(newData);
  }, [])

  const startIndex = useMemo(() => { 
    return (currentPage-1)*PAGE_SIZE
  }, [currentPage, PAGE_SIZE])

  const endIndex = useMemo(() => {
    return (currentPage-1)*PAGE_SIZE+PAGE_SIZE
  }, [currentPage, PAGE_SIZE])

  const onCloseModal = useCallback(() => {
    setIsDetailModal(false);
  }, []);

  const openModal = useCallback((id: string) => {
    setDetailItem(id);
    setIsDetailModal(true);
  }, []);

  return (
    <>
      <div className={cls.Table}>
        <ButtonsRow />
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
                key={item.id}
                itemId={item.id}
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
            pageSize={PAGE_SIZE}
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