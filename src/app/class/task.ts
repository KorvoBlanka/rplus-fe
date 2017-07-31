export class Task {
    id: number;
    type: string;
    result_id: number;
    comment: string;
    date: number;
    priority: number;
    discride: string;
    title: string;
    user: any;
    place: string;
    route: string;
    new_date: number;
    old_date: number;

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
