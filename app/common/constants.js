const IPC_EVENTS = {
  LOGIN: 'login',
  CONTROL_STATE_CHANGE: 'control-state-change',
  CONTROL: 'control',
}

const CONTROL_TYPE = {
  CONTROL: 1, // 控制别人
  BY_CONTROL: 2, // 被控制
}

module.exports = {
  IPC_EVENTS,
  CONTROL_TYPE,
}