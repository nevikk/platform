import { FC, ReactNode, useState } from "react";
import cls from './Column.module.scss';
import { Colum } from "../../model/report-config";
import { Cell } from "../Cell/Cell";
import { Mods, classNames } from "../../helper/classNames/classNames";
import { HeadCell } from "../HeadCell/HeadCell";

interface ColumnProps {
  children?: ReactNode;
  id: number;
  hide?: boolean
}

export const Column: FC<ColumnProps> = (props) => {
  const {
    children,
    id,
    hide
  } = props;

  const mods: Mods = {
    [cls.hide]: hide
  };

  return (
    <>
      <div className={cls.Column}>
      <div className={classNames(cls.content, mods, [])}>
        <HeadCell
          columnId={id}
        />
        {children}
      </div>
      </div>
    </>
  );
}
