/// <reference types="@types/googlemaps" />

import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';

import { Address, Provider } from '../../../../../models';
import { MapsAPILoader } from '@agm/core';


@Component({
  selector: 'app-edit-provider-workspace',
  templateUrl: './edit-provider-workspace.component.html',
  styleUrls: ['./edit-provider-workspace.component.scss']
})
export class EditProviderWorkspaceComponent implements OnInit {
  editForm: FormGroup;
  public zoom: number;
  public address: Address;
  public provider: Provider;

  @ViewChild('search') search: ElementRef;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private formBuilder: FormBuilder,
    private mapsAPILoader: MapsAPILoader
  ) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required]
    });

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
            return;
          }

          // set latitude, longitude and zoom
          this.address.lat = place.geometry.location.lat();
          this.address.lng = place.geometry.location.lng();
          this.zoom = 12;

          this.provider.address = this.address;
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

        this.provider.address = this.address;
      });
    }
  }

  private redirectToProviderWorkspace() {
    this.router.navigate(['/provider-dashboard/workspace/providers']);
  }

  cancel() {
    this.redirectToProviderWorkspace();
  }

}
