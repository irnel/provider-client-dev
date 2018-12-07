import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Config } from '../../../../../infrastructure/config';


@Component({
  selector: 'app-category-workspace',
  templateUrl: './category-workspace.component.html',
  styleUrls: ['./category-workspace.component.scss']
})
export class CategoryWorkspaceComponent implements OnInit {
  columnsToDisplay: string[] = ['image', 'name', 'provider', 'description', 'operation'];
  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  categories = data;
  maxChar: number = Config.maxChar;
  pageSizeOptions: number[] = Config.pageSizeOptions;

  constructor() {
    this.dataSource = new MatTableDataSource(this.categories);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.paginator.firstPage();
    }
  }

}

interface Category {
  image: string;
  name: string;
  provider: string;
  description: string;
  id: number;
}

const data: Category[] = [
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
    'image': 'https://robohash.org/quasiperspiciatiseum.png?size=100x100&set=set1'
  }, {
    'id': 2,
    'name': 'Tuna - Yellowfin',
    'provider': 'Hauck LLC',
    'description': 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus,' +
    'ultricies eu, nibh. \n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus' +
    'et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    'image': 'https://robohash.org/aliassimiliquedignissimos.jpg?size=100x100&set=set1'
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
    'image': 'https://robohash.org/velitoditmodi.png?size=100x100&set=set1'
  }, {
    'id': 4,
    'name': 'Wine - Chenin Blanc K.w.v.',
    'provider': 'Gibson, Gorczany and Schamberger',
    'description': 'In congue. Etiam justo. Etiam pretium iaculis justo.' +
    '\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    'image': 'https://robohash.org/nonetdolor.jpg?size=100x100&set=set1'
  }, {
    'id': 5,
    'name': 'Calaloo',
    'provider': 'Rolfson, Reynolds and Wilkinson',
    'description': 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.' +
    '\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit' +
    'nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.' +
    '\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque ' +
     'arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
     'image': 'https://robohash.org/molestiaevoluptatemet.bmp?size=100x100&set=set1'
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
      'image': 'https://robohash.org/temporainadipisci.jpg?size=100x100&set=set1'
    }, {
      'id': 7,
      'name': 'Star Fruit',
      'provider': 'Rippin Inc',
      'description': 'Cras mi pede, malesuada in,imperdiet et, commodo vulputate, justo. In blandit ultrices enim. ' +
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      'image': 'https://robohash.org/quiaminimaratione.jpg?size=100x100&set=set1'
    }, {
      'id': 8,
      'name': 'Lamb - Leg, Boneless',
      'provider': 'Kris-Schumm',
      'description': 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. ' +
      '\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus ' +
      'tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. ' +
      'Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. ' +
      'Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
      'image': 'https://robohash.org/praesentiumfugiatid.png?size=100x100&set=set1'
    }, {
      'id': 9,
      'name': 'Tart - Raisin And Pecan',
      'provider': 'Johnston, Kirlin and Heidenreich',
      'description': 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum ' +
      'dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien ' +
      'in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
      'image': 'https://robohash.org/autaperiamvoluptatem.png?size=100x100&set=set1'
    }, {
      'id': 10,
      'name': 'Ice Cream - Vanilla',
      'provider': 'Tillman-Barrows',
      'description': 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate ' +
      'elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. ' +
      'Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, ' +
      'semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, ' +
      'consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
      'image': 'https://robohash.org/eainciduntsunt.bmp?size=100x100&set=set1'
    }, {
      'id': 11,
      'name': 'Rum - White, Gg White',
      'provider': 'Zboncak-Morar',
      'description': 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ' +
      'ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. ' +
      '\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut ' +
      'volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.\n\n ' +
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. ' +
      'Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel ' +
      'nulla eget eros elementum pellentesque.',
      'image': 'https://robohash.org/autasperiorescum.bmp?size=100x100&set=set1'
    }, {
      'id': 12,
      'name': 'Liquid Aminios Acid - Braggs',
      'provider': 'Hammes, Mann and Von',
      'description': 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis ' +
      'nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam ' +
      'neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices ' +
      'posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien ' +
      'sapien non mi. Integer ac neque.',
      'image': 'https://robohash.org/vitaeculpaut.bmp?size=100x100&set=set1'
    }, {
      'id': 13,
      'name': 'Southern Comfort',
      'provider': 'Rath and Sons',
      'description': 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. ' +
      'Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec ' +
      'quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, ' +
      'interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu ' +
      'sapien cursus vestibulum.',
      'image': 'https://robohash.org/quaeratsedasperiores.bmp?size=100x100&set=set1'
    }, {
      'id': 14,
      'name': 'Gatorade - Orange',
      'provider': 'Boyer Inc',
      'description': 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. ' +
      'Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, ' +
      'molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus ' +
      'semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ' +
      'ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec ' +
      'posuere metus vitae ipsum. Aliquam non mauris.',
      'image': 'https://robohash.org/excepturiminussuscipit.png?size=100x100&set=set1'
    }, {
      'id': 15,
      'name': 'Potatoes - Parissienne',
      'provider': 'Daniel-Cronin',
      'description': 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis ' +
      'convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet ' +
      'turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi' +
      'quis tortor id nulla ultrices aliquet.',
      'image': 'https://robohash.org/eosblanditiissint.png?size=100x100&set=set1'
    }, {
      'id': 16,
      'name': 'Pumpkin',
      'provider': 'Pouros, Osinski and Hegmann',
      'description': 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.' +
      '\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla.' +
      'Sed accumsan felis. Ut at dolor quis odio consequat varius.',
      'image': 'https://robohash.org/delenitilaboredolor.bmp?size=100x100&set=set1'
    }, {
      'id': 17,
      'name': 'Bar Nature Valley',
      'provider': 'Leuschke Group',
      'description': 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
      'image': 'https://robohash.org/oditquosint.bmp?size=100x100&set=set1'
    }, {
      'id': 18,
      'name': 'Sugar - White Packet',
      'provider': 'Wilkinson-Walsh',
      'description': 'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, ' +
      'consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices ' +
      'mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla ' +
      'elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus ' +
      'semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
      'image': 'https://robohash.org/nonquamquis.bmp?size=100x100&set=set1'
    }, {
      'id': 19,
      'name': 'Muffin Mix - Chocolate Chip',
      'provider': 'Borer-Stiedemann',
      'description': 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor ' +
      'sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in ' +
      'sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. ' +
      'Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. ' +
      'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. ' +
      'Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod ' +
      'scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
      'image': 'https://robohash.org/hicfaceremolestias.bmp?size=100x100&set=set1'
    }, {
      'id': 20, 'name': 'Raspberries - Frozen',
      'provider': 'Bernier LLC',
      'description': 'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, ' +
      'consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices ' +
      'mattis odio. Donec vitae nisi.',
      'image': 'https://robohash.org/ipsumomnisvoluptates.png?size=100x100&set=set1'
    }
  ];
