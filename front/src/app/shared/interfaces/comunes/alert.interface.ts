export interface IAlertRedux {
  title: string;
  menssage: string;
  icon: 'success' | 'error' | 'warning' | 'info' | 'question';
  timer: number;
}
