import React, { useState, useEffect } from 'react';
import { IPC_EVENTS, CONTROL_TYPE } from '../constants';
import styles from './index.less';

const { ipcRenderer } = window.require('electron');

export default () => {
  const [remoteCode, setRemoteCode] = useState('');
  const [localCode, setLocalCode] = useState('');
  const [controlText, setControlText] = useState('');

  const login = async () => {
    let code = await ipcRenderer.invoke(IPC_EVENTS.LOGIN);
    setLocalCode(code);
  }

  const handleControlStateChange = async (e: any, name: string, type: number) => {
    if (type === CONTROL_TYPE.CONTROL) {
      setControlText(`正在远程控制${name}`)
    } else if (CONTROL_TYPE.BY_CONTROL) {
      setControlText(`被${name}远程控制`)
    }
  }

  useEffect(() => {
    login();
    ipcRenderer.on(IPC_EVENTS.CONTROL_STATE_CHANGE, handleControlStateChange);
    return () => {
      ipcRenderer.removeListener(IPC_EVENTS.CONTROL_STATE_CHANGE, handleControlStateChange);
    }
  }, []);

  const startControl = (remoteCode: String) => {
    ipcRenderer.send(IPC_EVENTS.CONTROL, remoteCode)
  }

  return (
    <div>
      {
        controlText === '' ? (
          <div>
            <div>你的控制码: {localCode}</div>
            <input type="text" value={remoteCode} onChange={(e) => {
              setRemoteCode(e.target.value);
            }} />
            <button onClick={() => startControl(remoteCode)}>确认</button>
          </div>
        ) : controlText
      }
    </div>
  );
}
