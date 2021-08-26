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
    isGroup: boolean;

    constructor(attributes: Partial<ChatUser> = null) {
      if (attributes != null) {
        this.id = attributes.id ?? '';
        this.email = attributes.email ?? '';
        this.password = attributes.password ?? '';
        this.title = attributes.name ?? '';
        this.username = attributes.username ?? '';
        this.name = attributes.name ?? '';
        this.subtitle = attributes.subtitle ?? '';
        this.roles = attributes.roles ?? [''];
        this.avatar = attributes.avatar ?? '';
        this.token = attributes.token ?? '';
        this.date = attributes.date ?? new Date();
        this.unread = attributes.unread ?? 0;
        this.active = attributes.active?? false;
        this.isGroup = attributes.isGroup ?? false;
      }
    }
  }
