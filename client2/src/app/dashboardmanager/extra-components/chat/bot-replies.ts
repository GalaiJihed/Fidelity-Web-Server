const botAvatar: string = 'https://i.ytimg.com/vi/Erqi5ckVoEo/hqdefault.jpg';

export const gifsLinks: string[] = [
  'https://media.tenor.com/images/ac287fd06319e47b1533737662d5bfe8/tenor.gif',
  'https://i.gifer.com/no.gif',
  'https://techcrunch.com/wp-content/uploads/2015/08/safe_image.gif',
  'http://www.reactiongifs.com/r/wnd1.gif',
];
export const imageLinks: string[] = [
  'https://picsum.photos/320/240/?image=357',
  'https://picsum.photos/320/240/?image=556',
  'https://picsum.photos/320/240/?image=339',
  'https://picsum.photos/320/240/?image=387',
  'https://picsum.photos/320/240/?image=30',
  'https://picsum.photos/320/240/?image=271',
];
const fileLink: string = 'http://google.com';

export const botReplies = [
  {
    regExp: /([H,h]ey)|([H,h]i)/g,
    answerArray: ['Marhba bik !'],
    type: 'text',
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      user: {
        name: 'Bot',
        avatar: botAvatar,
      },
    },
  },
  {
    regExp: /([H,h]elp)/g,
    answerArray: [`Mouch Mochkol ! Try sending a message containing word "sub", "fidelityloc",
    "uploaddb"`],
    type: 'text',
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      user: {
        name: 'Bot',
        avatar: botAvatar,
      },
    },
  },
  {
    regExp: /([S,s]ub)/g,
    answerArray: ['To buy subscription you have to contact fidelity administration for payment'],
    type: 'pic',
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      type: 'file',
      files: [
        {
          url: 'https://i.pinimg.com/236x/13/10/8a/13108af1ad32faabae3553734152d2e1.jpg',
          type: 'image/jpg',
        },
      ],
      user: {
        name: 'Bot',
        avatar: botAvatar,
      },
    },
  },
  {
    regExp: /(uploaddb)/g,
    type: 'gif',
    answerArray: ['To upload Database you should use your left menu and then click UploadDB , Upload conditions :Excel file must have first column as "Reference"'],
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      type: 'file',
      files: [
        {
          url: '',
          type: 'image/gif',
        },
      ],
      user: {
        name: 'Bot',
        avatar: botAvatar,
      },
    },
  },
  {
    regExp: /([F,f]ile group)|(FILE)/g,
    type: 'group',
    answerArray: ['Take it!', 'Job Done.', 'As you wish'],
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      type: 'file',
      files: [
        {
          url: fileLink,
          icon: 'nb-compose',
        },
        {
          url: '',
          type: 'image/gif',
        },
        {
          url: '',
          type: 'image/jpeg',
        },
      ],
      icon: 'nb-compose',
      user: {
        name: 'Bot',
        avatar: botAvatar,
      },
    },
  },
  {
    regExp: /([F,f]ile)|(FILE)/g,
    type: 'file',
    answerArray: ['Take it!', 'Job Done.', 'As you wish'],
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      type: 'file',
      files: [
        {
          url: fileLink,
          icon: 'nb-compose',
        },
      ],
      icon: 'nb-compose',
      user: {
        name: 'Bot',
        avatar: botAvatar,
      },
    },
  },
  {
    regExp: /(fidelityloc)|(cord)/g,
    type: 'map',
    answerArray: ['Done.', 'Marhbaa bik '],
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      type: 'map',
      latitude: 36.899282,
      longitude: 10.1874463,
      user: {
        name: 'Bot',
        avatar: botAvatar,
      },
    },
  },
  {
    regExp: /([Q,q]uote)|(QUOTE)/g,
    type: 'quote',
    answerArray: ['Quoted!', 'Say no more.', 'I gladly obey.'],
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      type: 'quote',
      quote: '',
      user: {
        name: 'Bot',
        avatar: botAvatar,
      },
    },
  },
  {
    regExp: /(.*)/g,
    answerArray: ['Yalla! Try typing "help"'],
    type: 'text',
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      user: {
        name: 'Bot',
        avatar: botAvatar,
      },
    },
  },
];
