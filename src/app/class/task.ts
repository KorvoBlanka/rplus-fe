export class Task {
    id: number;
    type: string;
    result_id: number;
    comment: string;

    public static getResultText(task) {
      switch (task.result_id) {
        case (0): {
          return 'Выполняется';
        }
        case (1): {
          return 'Успешно';
        }
        case (2): {
          return 'Не успешно';
        }
      }
      return '???';
    }
}
