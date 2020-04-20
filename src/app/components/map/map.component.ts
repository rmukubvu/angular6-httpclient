import { Component, OnInit } from '@angular/core';
import {MapService} from '../../service/map.service';
import {LoginService} from '../../service/login.service';
import {Router} from '@angular/router';
import {Locations} from '../../model/Locations';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  markers = new Array<Locations>();
  centerLat: number;
  centerLon: number;
  zoom: number;
  iconUrl: string;

  constructor(
    private router: Router,
    private mapService: MapService) {
    // redirect to home if already logged in
    // will fix this later
    this.iconUrl = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
  }

  ngOnInit() {
    this.loadLocations('sandton_1_avis');
  }

  loadLocations(companyId: string) {
    this.mapService.getLocationsForCompany(companyId).subscribe(response => {
      this.markers = response.map(item => {

        this.centerLat = item.lat;
        this.centerLon = item.lon;

        return new Locations(item.id,
          item.locationName,
          item.lat,
          item.lon,
          item.pumpReference);
      });
    });
    this.zoom = 12;
  }

}
