# RWS Waterinfo Api Node
Node.js wrapper for the RWS waterinfo api.

Docs about the API can be found [here](https://rijkswaterstaat.github.io/wm-ws-dl/#introduction). Docs are in english, but the API itself is mostly Dutch. This wrapper is mostly in English, aside from a couple variable names.

## Table of contents
* [Table of contents](#table-of-contents)
* [Installation](#installation)
* [Methods](#methods)
   + [getLocations](#getlocations)
   + [getMetadata](#getmetadata)
   + [getObservations](#getobservations)
      - [requestData (ObservationRequestData)](#requestdata--observationrequestdata-)
   + [getLatestObservations](#getlatestobservations)
      - [requestData (LatestObservationRequestData)](#requestdata--latestobservationrequestdata-)

## Installation
```sh
npm install rws-waterinfo-api
```

Usage
```js
import * as rws from 'rws-waterinfo-api'

rws.getLocations()
   .then(locations => console.log(locations))
   .catch(err => console.error(err))

// Or import a single function
import { getLocations } from 'rws-waterinfo-api'

getLocations()
   .then(locations => console.log(locations))
   .catch(err => console.error(err))
```

## Methods
### getLocations
```js
getLocations(): Promise<StationLocation[]>
getLocations(rawData: true): Promise<MetadataResponse>
```
Get all available stations for use in [getObservations](#getObservations) and [getLatestObservations](#getLatestObservations).  
Returns `StationLocation[]` by default. Pass in `true` to get the raw data.

### getMetadata
```js
getMetadata(): Promise<MetadataParsed[]>
getMetadata(rawData: true): Promise<MetadataResponse>
```
Get all available variables for use in [getObservations](#getObservations) and [getLatestObservations](#getLatestObservations).  
Returns `MetadataParsed[]` by default. Pass in `true` to get the raw data.

### getObservations
```js
getObservations(requestData: ObservationRequestData): Promise<Observations>
getObservations(requestData: ObservationRequestData, rawData: true): Promise<ObservationsResponse>
```
Get RWS observations data for the given variables, at the given station location, within the specified timeframe.  
Returns `Observations` by default. Pass in `true` after the `requestData` object to get the raw data.

#### requestData (ObservationRequestData)
Object in the following format:
```ts
{
   variables: {
      grootheid?: string;
      eenheid?: string;
      compartiment?: string;
      hoedanigheid?: string;
      meetapparaat?: string;
      parameter?: string;
   };
   location: {
      coordinates: {
         x: number;
         y: number
      };
      code: string;
   };
   period: {
      start: string;
      end: string;
   };
}
```
Available variables can be fetched using the [getMetadata](#getMetadata) method. Variables are in Dutch because the data the description they contain are also in Dutch, and I'm not sure how to translate each of them. Feel free to make a PR to correct this.  
Main variables you'll likely want to use are `grootheid`, which is used to get a single data type (e.g. windspeed with code `WINDSHD`), and `compartiment`, which is used to get a group of pre-defined data types (e.g. air with code `LT` to get all data related to the air (wind speed, direction e.t.c.)).

Available locations can be fetched using the [getLocations](#getLocations) method.

Period is an object consisting of a start and end date. The strings need to be in ISO format. For example: `2022-04-26T20:30:00.000+01:00`.

### getLatestObservations
```js
getLatestObservations(requestData: LatestObservationRequestData): Promise<Observations[]>
getLatestObservations(requestData: LatestObservationRequestData, rawData: true): Promise<LatestObservationResponse>
```
Get latest RWS observation data for the given variables at the given station location(s).
Returns `Observations[]` by default. Pass in `true` after the `requestData` object to get the raw data.

This method differs from [getObservations](#getObservations) in the following ways:
* Only gets a single observation per location
* Accepts multiple locations
* Accepts multiple variables

#### requestData (LatestObservationRequestData)
```ts
// Both variables and locations can also be an array of objects, if fetching multiple.
{
   variables: {
      grootheid?: string;
      eenheid?: string;
      compartiment?: string;
   };
   locations: {
      coordinates: {
         x: number;
         y: number
      };
      code: string;
   };
}
```
Available variables can be fetched using the [getMetadata](#getMetadata) method.  
Available locations can be fetched using the [getLocations](#getLocations) method.
