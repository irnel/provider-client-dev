/// <reference types="@types/googlemaps" />

import { DOCUMENT } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild, NgZone, Inject } from '@angular/core';

import { startWith, map } from 'rxjs/operators';
import { MapsAPILoader } from '@agm/core';
import { PageScrollService, PageScrollInstance } from 'ngx-page-scroll';

import { ProviderService, AuthService, NotificationService, FileService } from './../../../../../services';
import { Config } from '../../../../../infrastructure';
import { FileInfo, DataTransfer } from '../../../../../helpers';
import { Address, Provider } from '../../../../../models';
import { Observable } from 'rxjs';
import { ImageInfo } from '../../../../../models/image-info';

@Component({
  selector: 'app-edit-provider-workspace',
  templateUrl: './edit-provider-workspace.component.html',
  styleUrls: ['./edit-provider-workspace.component.scss']
})
export class EditProviderWorkspaceComponent implements OnInit {
  editForm: FormGroup;
  public zoom: number;
  public currentProvider: Provider;
  public address: Address;

  // HTML values
  @ViewChild('search') search: ElementRef;
  title: string;
  edit: boolean;
  test: string;

  selectedFiles: FileInfo [] = [];
  progress: { percentage: number } = { percentage: 0 };
  totalFileSize: number;
  regEx: string = Config.regex[0];
  regEx1: string = Config.regex[1];
  msg: string;
  nameError: string;
  addressError: string;
  mode: string;
  loading = false;
  cant = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private formBuilder: FormBuilder,
    private readonly mapsAPILoader: MapsAPILoader,
    private readonly authService: AuthService,
    private readonly providerService: ProviderService,
    private readonly fileService: FileService,
    private readonly notificationService: NotificationService,
    private readonly pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: Document
  ) {

    this.route.data.subscribe(data => {
      this.mode = data.mode;

      if (data.mode === 'create') {
        this.title = 'Create Provider';
        this.edit = false;

      } else {
        this.title = 'Edit Provider';
        this.edit = true;

      }
    });
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.regEx)]
      )],
      address: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.regEx)]
      )],
      description: ['', Validators.nullValidator]
    });

    // validate name
    this.form.name.valueChanges.pipe(
      startWith(''),
      map(() => {
        let error = '';
        if (this.form.name.hasError('required')) {
          error = 'name is required';
        }

        if (this.form.name.hasError('pattern')) {
          error = 'only letters and numbers are allowed';
        }

        return error;
      })
    ).subscribe(error => this.nameError = error);

    // validate Address
    this.form.address.valueChanges.pipe(
      startWith(''),
      map(() => {
        let error = '';
        if (this.form.address.hasError('required')) {
          error = 'address is required';
        }

        if (this.form.address.hasError('pattern')) {
          error = 'only letters and numbers are allowed';
        }

        return error;
      })
    ).subscribe(error => this.addressError = error);

    // google maps values
    this.zoom = 4;
    this.address = {
      lat: 39.8282,
      lng: -98.5795,
      number: '',
      formattedAddress: ''
    };

     // set current position
     this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.search.nativeElement, {
        types: ['address']
      });

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.address.formattedAddress = place.formatted_address;

          // verify result
          if (place.geometry === undefined || !place.geometry) {
            // reset formattedAddress
            this.address.formattedAddress = '';
            return;
          }

          // set latitude, longitude and zoom
          this.address.lat = place.geometry.location.lat();
          this.address.lng = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  get form() { return this.editForm.controls; }

  private setCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.address.lat = position.coords.latitude;
        this.address.lng = position.coords.longitude;
        this.zoom = 8;

      });
    }
  }

  redirectToHome() {
    this.router.navigate(['provider-dashboard/workspace/home']);
  }

  redirectToProviderWorkspace() {
    this.router.navigate(['/provider-dashboard/workspace/providers']);
  }

  cancel() {
    this.redirectToProviderWorkspace();
  }

  editProvider() {
    // Mark the control as dirty
    if (this.editForm.invalid) {
      this.form.name.markAsDirty();
      this.form.address.markAsDirty();
      this.loading = false;
      // scroll behavior
      if (this.form.name.errors || this.form.address.errors) {
        this.goToTop();
      }

      return;
    }

    // validate address
    if (this.address.formattedAddress === '' && this.form.address.value !== '') {
      this.notificationService.ErrorMessage(
        'select a valid address from the list.', '', 2500);

      this.goToTop();
      return;
    }

    this.loading = true;

    // create
    if (!this.edit) {
      this.msg = 'New provider created';

      this.currentProvider = {
        name:  this.form.name.value,
        address: this.address,
        description: this.form.description.value,
        userId: this.authService.currentUserValue.uid,
        url: ''
      };

      this.providerService.create(this.currentProvider).then(provider => {
        // upload files
        if (this.selectedFiles.length > 0) {
          // this.selectedFiles.forEach(fileInfo => {
          //   fileInfo.modelId = provider.id;
          //   fileInfo.type = 'providers';

          //   this.fileService.upload(fileInfo, this.progress, cant);
          // });
          Promise.all(
            this.selectedFiles.map(async (fileInfo) => {
              fileInfo.modelId = provider.id;
              fileInfo.type = fileInfo.type = 'providers';

              await this.fileService.upload(fileInfo, this.progress, this.cant);
            })
          );
        }
      })
      .catch(error => {
        this.loading = false;
        this.notificationService.ErrorMessage(error.message, '', 2500);
      });

    } else {
      this.msg = 'Provider edited';

    }
  }

  // scroll behavior
  goToTop() {
    const scroll: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#header');
    this.pageScrollService.start(scroll);
  }

  // receive files from file-input-component
  onSelectedFiles(files: FileInfo []) {
    this.selectedFiles = files;
  }

}
