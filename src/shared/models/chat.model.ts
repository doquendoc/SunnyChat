export class ChatUser {
    id: string;
    email: string;
    password: string;
    title: string;
    username: string;
    name: string;
    subtitle: string;
    roles: [string];
    avatar: string;
    token: string;
    date: Date;
    unread: number;
    active: boolean;
  
    constructor(attributes: Partial<ChatUser> = null) {
      if (attributes != null) {
        this.id = attributes.id != undefined ? attributes.id : '';
        this.email = attributes.email != undefined ? attributes.email : '';
        this.password = attributes.password != undefined ? attributes.password : '';
        this.title = attributes.name != undefined ? attributes.name : '';
        this.username = attributes.username != undefined ? attributes.username : '';
        this.name = attributes.name != undefined ? attributes.name : '';
        this.subtitle = attributes.subtitle != undefined ? attributes.subtitle : '';
        this.roles = attributes.roles != undefined ? attributes.roles : [''];
        this.avatar = attributes.avatar != undefined ? attributes.avatar : '';
        this.token = attributes.token != undefined ? attributes.token : '';
        this.date = attributes.date != undefined ? attributes.date : new Date();
        this.unread = attributes.unread != undefined ? attributes.unread : 0;
        this.active = attributes.active != undefined ? attributes.active : false;
      }
    }
  }
  