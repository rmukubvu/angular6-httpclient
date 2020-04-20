export class Locations {
  id: number;
  locationName: string;
  lat: number;
  lon: number;
  pumpReference: string;

  constructor(id: number ,
              locationName: string,
              lat: number,
              lon: number,
              pumpReference: string) {
    this.id = id;
    this.locationName = locationName;
    this.lat = lat;
    this.lon = lon;
    this.pumpReference = pumpReference;
  }
}
