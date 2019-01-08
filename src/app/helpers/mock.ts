import { Provider, Category, Product, Cashier } from './index';

export const PROVIDERS_DATA: Provider [] = [
    {
      'id': 1,
      'name': 'Youspan',
      'address': '98 Westridge Avenue',
      'description': 'dictumst morbi vestibulum velit id pretium iaculis diam erat asasasasas' +
      'kajsnkaj snkasnaksn akjsnakjsn aksjansjan ksnakjsnakjsnkajs nfermentum justo nec condimentum neque sapien placerat' +
      'kajsnkajs nkasnaksnakjs asas as as a sa s aaaaaaaa aaaaaaaaa aaaaaaas sasasa erisque enim ligula venenatis dolor.' +
      'Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet.' +
      'Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed' +
      'ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum.' +
      'Sed dapibus pulvinar nibh tempor porta.',
      'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(1).jpg'
    },
    {
      'id': 2,
      'name': 'Feedfire',
      'address': '31 Anhalt Place',
      'description': 'venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus',
      'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(2).jpg'
    },
    {
      'id': 3,
      'name': 'Voonyx',
      'address': '9415 Monterey Parkway',
      'description': 'luctus et ultrices posuere cubilia curae nulla dapibus dolor vel' +
      'kajsnkaj snkasnaksn akjsnakjsn aksjansjan ksnakjsnakjsnkajs nfermentum justo nec condimentum neque sapien placerat' +
      'kajsnkajs nkasnaksnakjs asas as as a sa s aaaaaaaa aaaaaaaaa aaaaaaas sasasa erisque enim ligula venenatis dolor.' +
      'Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet.' +
      'Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed' +
      'ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum.' +
      'Sed dapibus pulvinar nibh tempor porta.',
      'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(3).jpg'
    },
    {
      'id': 4,
      'name': 'Eamia',
      'address': '5 Carberry Street',
      'description': 'platea dictumst aliquam augue quam sollicitudin vitae consectetuer lorem integer tincidunt ante vel ipsum',
      'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(4).jpg'
    },
    {
      'id': 5,
      'name': 'Topicshots',
      'address': '9187 Mockingbird Road',
      'description': 'velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat',
      'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(5).jpg'
    },
    {
      'id': 6,
      'name': 'Yakidoo',
      'address': '6 Fisk Way',
      'description': 'nisl duis bibendum felis sed interdum blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu',
      'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(6).jpg'
    },
    {
      'id': 7,
      'name': 'Demimbu',
      'address': '19 Oak Valley Parkway',
      'description': 'primis in faucibus orci luctus et vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis',
      'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(7).jpg'
    },
    {
      'id': 8,
      'name': 'Linkbridge',
      'address': '1654 Clarendon Hill',
      'description': 'leo odio porttitor sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque',
      'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(8).jpg'
    },
    {
      'id': 9,
      'name': 'Avaveo',
      'address':
      '3367 Mccormick Avenue',
      'description': 'libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac',
      'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(9).jpg'
    },
    {
      'id': 10,
      'name': 'Oyoyo',
      'address': '43 Texas Street',
      'description': 'erat eros viverra eget congue eget semper rutrum nulla nunc purus',
      'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(10).jpg'
    },
    {
      'id': 11,
      'name': 'Skivee',
      'address': '85 Dakota Trail',
      'description': 'varius donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a',
      'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(11).jpg'
    },
    {
      'id': 12,
      'name': 'Mycat',
      'address': '14387 Spenser Lane',
      'description': 'ornare consequat lectus in est risus auctor sed tristique in',
      'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(12).jpg'
    },
    {
      'id': 13,
      'name': 'Youfeed',
      'address': '6485 Londonderry Drive',
      'description': 'curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in',
      'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(13).jpg'
    },
    {
      'id': 14,
      'name': 'Bubblebox',
      'address': '5267 Loftsgordon Avenue',
      'description': 'quis justo maecenas quis ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo',
      'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(14).jpg'
    },
    { 'id': 15,
      'name': 'Vidoo',
      'address': '6 Warner Pass',
      'description': 'facilisi cras non velit nec ni lacus at velit vivamus vel nulla eget eros elementum pellentesque',
      'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(15).jpg'
    },
    {
      'id': 16,
      'name': 'Mynte',
      'address': '2411 Sutteridge Crossing',
      'description': 'varius nulla facilisi cra nonummy maecenas tincidunt lacus at velit',
      'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(16).jpg'
    },
    {
      'id': 17, 'name': 'Realblab',
      'address': '8074 Reindahl Pass',
      'description': 'purus aliquet at feugiat non pretium quis  potenti in eleifend',
      'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(17).jpg'
    },
    { 'id': 18,
    'name': 'Skidoo',
    'address': '0 Eagle Crest Way',
    'description': 'eget orci vehicula volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas',
    'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(18).jpg'
    },
    {
      'id': 19,
      'name': 'Linklinks',
      'address': '31391 Morning Park',
      'description': 'fusce consequat nulla nisl felis sed interdum venenatis turpis enim blandit mi in porttitor pede',
      'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(19).jpg'
    },
    {
      'id': 20,
      'name': 'Gabspot',
      'address': '54 Thierer Alley',
      'description': 'a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet',
      'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(20).jpg'
    }
  ];


export const CATEGORY_DATA: Category[] = [
  {
    'id': 1,
    'name': 'Pepper - Red Bell',
    'provider': 'Kihn, Nikolaus and Barton',
    'description': 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.' +
    '\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.' +
    '\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim.' +
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices.' +
    'Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.' +
    '\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.' +
    '\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu,' +
    'tincidunt in, leo. Maecenas pulvinar lobortis est.',
    'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(21).jpg'
  }, {
    'id': 2,
    'name': 'Tuna - Yellowfin',
    'provider': 'Hauck LLC',
    'description': 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus,' +
    'ultricies eu, nibh. \n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus' +
    'et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(22).jpg'
  }, {
    'id': 3,
    'name': 'Truffle - Whole Black Peeled',
    'provider': 'Gorczany-Crooks',
    'description': 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim.' +
    'In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam ' +
    'convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut,' +
    'ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra,' +
    'magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.' +
    '\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. '+
    'Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(23).jpg'
  }, {
    'id': 4,
    'name': 'Wine - Chenin Blanc K.w.v.',
    'provider': 'Gibson, Gorczany and Schamberger',
    'description': 'In congue. Etiam justo. Etiam pretium iaculis justo.' +
    '\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(24).jpg'
  }, {
    'id': 5,
    'name': 'Calaloo',
    'provider': 'Rolfson, Reynolds and Wilkinson',
    'description': 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.' +
    '\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit' +
    'nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.' +
    '\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque ' +
      'arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
      'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(25).jpg'
    }, {
      'id': 6,
      'name': 'Pork - Bacon, Double Smoked',
      'provider': 'Hermiston, Heidenreich and Olson',
      'description': 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, ' +
      'semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.' +
      '\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at ' +
      'dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae ' +
      'nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla ' +
      'elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. ' +
      '\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque ' +
      'arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
      'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(26).jpg'
    }, {
      'id': 7,
      'name': 'Star Fruit',
      'provider': 'Rippin Inc',
      'description': 'Cras mi pede, malesuada in,imperdiet et, commodo vulputate, justo. In blandit ultrices enim. ' +
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(27).jpg'
    }, {
      'id': 8,
      'name': 'Lamb - Leg, Boneless',
      'provider': 'Kris-Schumm',
      'description': 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. ' +
      '\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus ' +
      'tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. ' +
      'Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. ' +
      'Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
      'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(28).jpg'
    }, {
      'id': 9,
      'name': 'Tart - Raisin And Pecan',
      'provider': 'Johnston, Kirlin and Heidenreich',
      'description': 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum ' +
      'dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien ' +
      'in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
      'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(29).jpg'
    }
];

export const PRODUCT_DATA: Product [] = [
  {
    'id': 1,
    'name': 'Dodge',
    'price': 7,
    'provider': 'Consumer Durables',
    'category': 'Ram 2500',
    'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(31).jpg',
    'description': 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem.' +
    'Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. ' +
    'Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.'
  }, {
    'id': 2,
    'name': 'Cadillac',
    'price': 33,
    'provider': 'Capital Goods',
    'category': 'DeVille',
    'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(32).jpg',
    'description': 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.'
  }, {
    'id': 3,
    'name': 'Audi',
    'price': 27,
    'provider': 'Energy',
    'category': '200',
    'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(33).jpg',
    'description': 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras ' +
    'non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget ' +
    'eros elementum pellentesque.'
  }, {
    'id': 4,
    'name': 'Chrysler',
    'price': 48,
    'provider': 'Finance',
    'category': 'Sebring',
    'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(34).jpg',
    'description': 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper ' +
    'rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.'
  }, {
    'id': 5,
    'name': 'Hyundai',
    'price': 9,
    'provider': 'Health Care',
    'category': 'XG350',
    'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(35).jpg',
    'description': 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, ' +
    'interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.'
  }, {
    'id': 6,
    'name': 'Toyota',
    'price': 26,
    'provider': 'Finance',
    'category': 'Solara',
    'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(36).jpg',
    'description': 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.'
  }, {
    'id': 7,
    'name': 'Dodge',
    'price': 52,
    'provider': 'Finance',
    'category': 'Durango',
    'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(37).jpg',
    'description': 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.'
  }, {
    'id': 8,
    'name': 'Nissan',
    'price': 48,
    'provider': 'Health Care',
    'category': 'Versa',
    'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(38).jpg',
    'description': 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, ' +
    'in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.'
  }, {
    'id': 9,
    'name': 'Mercedes-Benz',
    'price': 56,
    'provider': 'Finance',
    'category': 'SLK-Class',
    'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(39).jpg',
    'description': 'Phasellus in felis. Donec semper sapien a libero. Nam dui.'
  }, {
    'id': 10,
    'name': 'Honda',
    'price': 30,
    'provider': 'Consumer Services',
    'category': 'Odyssey',
    'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(40).jpg',
    'description': 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque ' +
    'libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet ' +
    'sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ' +
    'ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ' +
    ' ut, suscipit a, feugiat et, eros.'
  }
];

export const CASHIER_DATA: Cashier [] = [
  { 'id': 1, 'name': 'Cacilie', 'email': 'cmcgarel0@diigo.com', 'provider': 'Skyble' },
  { 'id': 2, 'name': 'Lin', 'email': 'lbelliss1@privacy.gov.au', 'provider': 'InnoZ' },
  { 'id': 3, 'name': 'Petronella', 'email': 'pcattach2@slideshare.net', 'provider': 'Skiba' },
  { 'id': 4, 'name': 'Laurena', 'email': 'lmanton3@linkedin.com', 'provider': 'Avamm' },
  { 'id': 5, 'name': 'Thorsten', 'email': 'tmandifield4@shinystat.com', 'provider': 'Babblestorm' },
  { 'id': 6, 'name': 'Maisey', 'email': 'mkennard5@epa.gov', 'provider': 'Abatz' },
  { 'id': 7, 'name': 'L;urette', 'email': 'lstonard6@cloudflare.com', 'provider': 'Leenti' },
  { 'id': 8, 'name': 'Ogdon', 'email': 'ocaser7@feedburner.com', 'provider': 'Eabox' },
  { 'id': 9, 'name': 'Kaylil', 'email': 'kocarran8@mapquest.com', 'provider': 'Skivee' },
  { 'id': 10, 'name': 'Libby', 'email': 'lyglesia9@over-blog.com', 'provider': 'Kazio' }
];
