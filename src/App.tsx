import React from 'react';
import cls from './App.module.scss';
import { Table } from './components/Table/Table';

function App() {
  return (
    <div className={cls.App}>
      <Table />
    </div>
  );
}

export default App;
