import React from 'react';
import styles from './index.less';

const { ipcRenderer } = window.require('electron');

export default () => {
  return (
    <div>
      <h1
        className={styles.title}
        onClick={() => {
          ipcRenderer.invoke('hello', 'hello ipc')
        }}>
        Page index</h1>
    </div>
  );
}
