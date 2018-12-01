import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-provider-workspace',
  templateUrl: './provider-workspace.component.html',
  styleUrls: ['./provider-workspace.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProviderWorkspaceComponent implements OnInit {

  columnsToDisplay: string [] = ['image', 'name', 'address', 'description', 'operation'];
  dataSource: MatTableDataSource<Provider>;
  expandedElement: Provider;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  providers = data;

  constructor(
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource(this.providers);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // redirect to edit provider
  redirectToEditProvider(id: number) {
    this.router.navigate([`/provider-dashboard/workspace/providers/${id}/edit`]);
  }

  // apply filter to data table
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.paginator.firstPage();
    }
  }

}

export class Provider {
  name: string;
  address: string;
  description: string;
  image: string;
  id?: number;
}


const data: Provider [] = [
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
    'image': 'https://robohash.org/nemoomnistemporibus.bmp?size=200x200&set=set1'
  },
  {
    'id': 2,
    'name': 'Feedfire',
    'address': '31 Anhalt Place',
    'description': 'venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus',
    'image': 'https://robohash.org/voluptatesconsequaturexpedita.bmp?size=200x200&set=set1'
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
    'image': 'https://robohash.org/sedearumnon.png?size=200x200&set=set1'
  },
  {
    'id': 4,
    'name': 'Eamia',
    'address': '5 Carberry Street',
    'description': 'platea dictumst aliquam augue quam sollicitudin vitae consectetuer lorem integer tincidunt ante vel ipsum',
    'image': 'https://robohash.org/accusamusremqui.jpg?size=200x200&set=set1'
  },
  {
    'id': 5,
    'name': 'Topicshots',
    'address': '9187 Mockingbird Road',
    'description': 'velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat',
    'image': 'https://robohash.org/animiomniset.jpg?size=200x200&set=set1'
  },
  {
    'id': 6,
    'name': 'Yakidoo',
    'address': '6 Fisk Way',
    'description': 'nisl duis bibendum felis sed interdum blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu',
    'image': 'https://robohash.org/corruptietexcepturi.png?size=200x200&set=set1'
  },
  {
    'id': 7,
    'name': 'Demimbu',
    'address': '19 Oak Valley Parkway',
    'description': 'primis in faucibus orci luctus et vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis',
    'image': 'https://robohash.org/eiusexercitationemquis.jpg?size=200x200&set=set1'
  },
  {
    'id': 8,
    'name': 'Linkbridge',
    'address': '1654 Clarendon Hill',
    'description': 'leo odio porttitor sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque',
    'image': 'https://robohash.org/aperiamtemporaconsequatur.bmp?size=200x200&set=set1'
  },
  {
    'id': 9,
    'name': 'Avaveo',
    'address':
    '3367 Mccormick Avenue',
    'description': 'libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac',
    'image': 'https://robohash.org/doloretlaboriosam.bmp?size=200x200&set=set1'
  },
  {
    'id': 10,
    'name': 'Oyoyo',
    'address': '43 Texas Street',
    'description': 'erat eros viverra eget congue eget semper rutrum nulla nunc purus',
    'image': 'https://robohash.org/solutaducimusvitae.png?size=200x200&set=set1'
  },
  {
    'id': 11,
    'name': 'Skivee',
    'address': '85 Dakota Trail',
    'description': 'varius donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a',
    'image': 'https://robohash.org/rerumsaepeet.png?size=200x200&set=set1'
  },
  {
    'id': 12,
    'name': 'Mycat',
    'address': '14387 Spenser Lane',
    'description': 'ornare consequat lectus in est risus auctor sed tristique in',
    'image': 'https://robohash.org/numquamomniset.bmp?size=200x200&set=set1'
  },
  {
    'id': 13,
    'name': 'Youfeed',
    'address': '6485 Londonderry Drive',
    'description': 'curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in',
    'image': 'https://robohash.org/veromaximesaepe.png?size=200x200&set=set1'
  },
  {
    'id': 14,
    'name': 'Bubblebox',
    'address': '5267 Loftsgordon Avenue',
    'description': 'quis justo maecenas quis ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo',
    'image': 'https://robohash.org/molestiasenimearum.jpg?size=200x200&set=set1'
  },
  { 'id': 15,
    'name': 'Vidoo',
    'address': '6 Warner Pass',
    'description': 'facilisi cras non velit nec ni lacus at velit vivamus vel nulla eget eros elementum pellentesque',
    'image': 'https://robohash.org/nihilofficiaest.png?size=200x200&set=set1'
  },
  {
    'id': 16,
    'name': 'Mynte',
    'address': '2411 Sutteridge Crossing',
    'description': 'varius nulla facilisi cra nonummy maecenas tincidunt lacus at velit',
    'image': 'https://robohash.org/odiosuntnihil.jpg?size=200x200&set=set1'
  },
  {
    'id': 17, 'name': 'Realblab',
    'address': '8074 Reindahl Pass',
    'description': 'purus aliquet at feugiat non pretium quis  potenti in eleifend',
    'image': 'https://robohash.org/doloreetnon.jpg?size=200x200&set=set1'
  },
  { 'id': 18,
  'name': 'Skidoo',
  'address': '0 Eagle Crest Way',
  'description': 'eget orci vehicula volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas',
  'image': 'https://robohash.org/minimarepudiandaesint.bmp?size=200x200&set=set1'
  },
  {
    'id': 19,
    'name': 'Linklinks',
    'address': '31391 Morning Park',
    'description': 'fusce consequat nulla nisl felis sed interdum venenatis turpis enim blandit mi in porttitor pede',
    'image': 'https://robohash.org/sequitemporaqui.jpg?size=200x200&set=set1'
  },
  {
    'id': 20,
    'name': 'Gabspot',
    'address': '54 Thierer Alley',
    'description': 'a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet',
    'image': 'https://robohash.org/quasiiustolaboriosam.jpg?size=200x200&set=set1'
  }
];
