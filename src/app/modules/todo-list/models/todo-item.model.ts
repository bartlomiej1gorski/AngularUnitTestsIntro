export namespace TodoItem {
    export class Request {
        constructor(
            public name: string,
            public description: string
        ) {
        }
    }

    export class Response {
        constructor(
            public id: string,
            public name: string,
            public description: string
        ) {
        }
    }
}