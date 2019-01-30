/// <reference types="@types/googlemaps" />

import { DOCUMENT } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild, NgZone, Inject } from '@angular/core';

import { startWith, map } from 'rxjs/operators';
import { MapsAPILoader } from '@agm/core';
import { SnotifyService } from 'ng-snotify';
import { PageScrollService, PageScrollInstance } from 'ngx-page-scroll';

import { Config } from '../../../../../infrastructure';
import { FileInfo } from '../../../../../helpers';
import { Address, Provider } from '../../../../../models';

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
  regEx: string = Config.regex[0];
  regEx1: string = Config.regex[1];
  msg: string;
  nameError: string;
  addressError: string;
  mode: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private formBuilder: FormBuilder,
    private readonly mapsAPILoader: MapsAPILoader,
    private readonly toast: SnotifyService,
    private readonly pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: any
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
      description: ['', Validators.pattern(this.regEx1)]
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

  MarkAsDirty() {
    if (this.editForm.invalid) {
      this.form.name.markAsDirty();
      this.form.address.markAsDirty();

      // scroll behavior
      if (this.form.name.errors || this.form.address.errors) {
        this.goToTop();
      }

      return;
    }

    // validate address
    if (this.address.formattedAddress === '' && this.form.address.value !== '') {
      this.showErrorMessage(
        'Validation error',
        'select a valid address from the list.',
        2500
      );

      this.goToTop();

      return;
    }
  }

  editProvider() {
    // Mark the control as dirty
    this.MarkAsDirty();

    // create
    if (!this.edit) {
      this.msg = 'New provider created';

    } else {
      this.msg = 'Provider edited';

    }

    this.showSuccessMessage(this.msg, 2000);
    this.redirectToProviderWorkspace();
  }

  showSuccessMessage(body: string, timeOut: number) {
    this.toast.success(body, '', {
      timeout: timeOut,
      showProgressBar: false,

    });
  }

  showErrorMessage(title: string, body: string, timeOut: number) {
    this.toast.error(body, title, {
      timeout: timeOut,
      backdrop: 0.2,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true
    });
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
