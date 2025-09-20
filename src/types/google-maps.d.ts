declare namespace google.maps {
  class Map {
    constructor(element: HTMLElement, options: MapOptions);
  }

  interface MapOptions {
    center: LatLngLiteral;
    zoom: number;
    mapTypeControl?: boolean;
    streetViewControl?: boolean;
    fullscreenControl?: boolean;
    zoomControl?: boolean;
    styles?: MapStyle[];
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  interface MapStyle {
    featureType?: string;
    elementType?: string;
    stylers?: { [key: string]: any }[];
  }

  class Marker {
    constructor(options: MarkerOptions);
  }

  interface MarkerOptions {
    position: LatLngLiteral;
    map: Map;
    title?: string;
  }
}

interface Window {
  google: typeof google;
} 