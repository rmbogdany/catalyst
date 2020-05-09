import { Component, NgZone, OnInit } from '@angular/core';
import { Map, tileLayer, marker, icon } from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { EventManagerService } from '../../event-manager.service';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
	map:Map;
	geocoder: any;
	private markers: any[];
	private position1 = 0;
	
	constructor(private geoLocation: Geolocation, private _ngZone: NgZone, private eventManagerService: EventManagerService) { 
		this.geocoder = new google.maps.Geocoder();
		this.markers = [];
	}

	ngOnInit() {
		//Initializes the map with given locations
		this.geoLocation.getCurrentPosition().then((resp) => {
			this.map = new Map('map').setView([resp.coords.latitude,resp.coords.longitude], 10);

			tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(this.map);
			
			var markr = marker([resp.coords.latitude,resp.coords.longitude]);
			markr.addTo(this.map).bindPopup('Your Location');
			this.updateEvents();
		}).catch(err => {
			console.log('error getting the locaton', err);
		});
	}
	
	getGeocoder(location, i, map, markers){
		//gets the latitude and longitude for addresses
		return new Promise((resolve, reject) => { 
			this.geocoder.geocode({'placeId': location}, (results, status) => {
				if(status === 'OK' && results[0]){
					resolve({
						lat: results[0].geometry.location.lat(),
						lng: results[0].geometry.location.lng(),
						id: i,
						map: map,
						markers: markers
					});
					return;
				}
			});
		});
	}
	
	updateEvents(){
		//updates the map with event locations
		for(var i = 0; i < this.markers.length; i++){
			this.map.removeLayer(this.markers[i]);
		}
		this.markers = [];
		var evnts = this.eventManagerService.getAllEvents();
		for( var i = 0; i < evnts.length; i++){
			if(evnts[i].location[0] != ""){
				this.getGeocoder(evnts[i].location[1], i, this.map, this.markers).then(data => {
					var marker2 = marker([data['lat'],data['lng']]);
					marker2.addTo(data['map']).bindPopup("<b>"+evnts[data['id']].title+"</b><br>"+evnts[data['id']].location[0]);
					data['markers'].push(marker2);
				});
			}
		}
	}
	
	ionViewWillEnter(){
		//updates the map with event locations
		if(this.map){
			for(var i = 0; i < this.markers.length; i++){
				this.map.removeLayer(this.markers[i]);
			}
			this.markers = [];
			var evnts = this.eventManagerService.getAllEvents();
			for( var i = 0; i < evnts.length; i++){
				if(evnts[i].location[0] != ""){
					this.getGeocoder(evnts[i].location[1], i, this.map, this.markers).then(data => {
						var marker2 = marker([data['lat'],data['lng']]);
						marker2.addTo(data['map']).bindPopup("<b>"+evnts[data['id']].title+"</b><br>"+evnts[data['id']].location[0]);
						data['markers'].push(marker2);
					});
				}
			}
		}
	}
	
}