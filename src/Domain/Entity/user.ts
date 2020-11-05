export interface User {
  id: number;
  username: boolean;
  password?: string;
  apiKey?: string;
}
// export default class Todo {
//   private _id: string;
//
//   private _completed: boolean;
//
//   private _text: string;
//
//   constructor() {
//     this._id = '';
//     this._completed = false;
//     this._text = '';
//   }
//
//   get id(): string {
//     return this._id;
//   }
//
//   set id(value: string) {
//     this._id = value;
//   }
//
//   get completed(): boolean {
//     return this._completed;
//   }
//
//   set completed(value: boolean) {
//     this._completed = value;
//   }
//
//   get text(): string {
//     return this._text;
//   }
//
//   set text(value: string) {
//     this._text = value;
//   }
// }
