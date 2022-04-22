import { TodoItem } from "./todo-item.model";

export class TodoList {
    constructor(
        public id: string,
        public todoItems: Array<TodoItem.Request>
    ) {
    }
}