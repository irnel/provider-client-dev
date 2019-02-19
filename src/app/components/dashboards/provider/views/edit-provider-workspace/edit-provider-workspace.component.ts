
/// <reference types="@types/googlemaps" />

import { DOCUMENT } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild, NgZone, Inject } from '@angular/core';

import { startWith, map, tap } from 'rxjs/operators';
import { MapsAPILoader } from '@agm/core';
import { PageScrollService, PageScrollInstance } from 'ngx-page-scroll';

import { ProviderService, AuthService, NotificationService, FileService } from './../../../../../services';
import { Config } from '../../../../../infrastructure';
import { FileInfo } from '../../../../../helpers';
import { Address, Provider } from '../../../../../models';
import { Observable, interval } from 'rxjs';

@Component({
  selector: 'app-edit-provider-workspace',
  templateUrl: './edit-provider-workspace.component.html',
  styleUrls: ['./edit-provider-workspace.component.scss']
})
export class EditProviderWorkspaceComponent implements OnInit {
  editForm: FormGroup;
  public zoom: number;
  public provider: Provider;
  public address: Address;

  // HTML values
  @ViewChild('search') search: ElementRef;
  title: string;
  edit: boolean;
  test: string;

  selectedFiles: FileInfo [] = [];
  allPercentage: Observable<number>;
  observer$: Observable<any>;
  regEx: string = Config.regex[0];
  regEx1: string = Config.regex[1];
  msg: string;
  nameError: string;
  addressError: string;
  mode: string;
  loading = false;
  waiting = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private formBuilder: FormBuilder,
    private readonly mapsAPILoader: MapsAPILoader,
    private readonly authService: AuthService,
    private readonly providerService: ProviderService,
    private readonly fileService: FileService,
    private readonly notification: NotificationService,
    private readonly pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: Document
  ) {}

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

    this.route.data.subscribe(data => {
      this.mode = data.mode;

      if (data.mode === 'create') {
        this.title = 'Create Provider';
        this.edit = false;

        // initialize observable with interval
        // to hide progress interface
        this.observer$ = interval(1);

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

      } else {
        this.title = 'Edit Provider';
        this.edit = true;

        const providerId = this.route.snapshot.params['id'];
        this.observer$ = this.providerService.getProviderById(providerId)
          .pipe(
            tap(provider => {
              this.provider = provider;
              // google maps values
              this.address = this.provider.address;
              this.zoom = 12;
              // updated Form Control values
              this.editForm.patchValue({
                name: this.provider.name,
                address: this.provider.address.formattedAddress,
                description: this.provider.description
              });
            })
          );
      }
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
    this.ngZone.run(() => {
      this.router.navigate(['provider-dashboard/workspace/home']);
    });
  }

  redirectToProviderWorkspace() {
    this.notification.SuccessMessage(this.msg, '', 2500);

    this.ngZone.run(() => {
      this.router.navigate(['/provider-dashboard/workspace/providers']);
    });
  }

  cancel() {
    this.ngZone.run(() => {
      this.router.navigate(['/provider-dashboard/workspace/providers']);
    });
  }

  async editProvider() {
    this.loading = true;
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
      this.notification.ErrorMessage(
        'select a valid address from the list.', '', 2500);

      this.loading = false;
      this.goToTop();

      return;
    }

    // create
    if (!this.edit) {
      const data: Provider = {
        name:  this.form.name.value,
        address: this.address,
        description: this.form.description.value,
        userId: this.authService.currentUserValue.uid,
        url: ''
      };

      // create provider
      await this.providerService.create(data).then(
        async (provider) => {
          this.provider = provider;
        })
        .catch(error => {
          this.notification.ErrorMessage(error.message, '', 2500);
          this.loading = false;

          return;
        });

      // redirect to provider workspace if not upload images
      if (this.selectedFiles.length === 0) {
        this.redirectToProviderWorkspace();
      }

      this.allPercentage = this.fileService.upload(this.selectedFiles, this.provider);
      // complete operation
      this.allPercentage.subscribe(progress => {
        if (progress === 100) {
          this.redirectToProviderWorkspace();
        }
      });

    } else {
      this.msg = 'Provider edited';

      // updated provider attributes
      this.provider.name = this.form.name.value;
      this.provider.address = this.address;
      this.provider.description = this.form.description.value;

      this.providerService.update(this.provider).then(() => {
        this.redirectToProviderWorkspace();
      })
      .catch(error => {
        this.notification.ErrorMessage(error.message, '', 2500);
        this.loading = false;

        return;
      });
    }
  }

  // scroll behavior
  goToTop() {
    const scroll: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#header');
    this.pageScrollService.start(scroll);
  }

  // receive files from file-input-component
  onSelectedFiles(files: FileInfo []) {
    let principal = false;

    files.forEach(f => {
      f.modelType = 'providers';
      f.markAsPrincipal ? principal = true : principal = false;
    });

    // mark as principal first element
    if (!principal) {
      files[0].markAsPrincipal = true;
    }

    this.selectedFiles = files;
  }
}
