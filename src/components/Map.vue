<template>
  <div class="map">
    <l-map
      class="map-container"
      ref="map"
      :zoom="map.zoom"
      :center="map.center"
      :bounds="map.bounds"
      @update:bounds="handleMapBoundsUpdate"
      @update:center="handleMapCenterUpdate"
      @update:zoom="handleMapZoomUpdate"
      v-show="map.visible"
    >
      <l-tile-layer :url="map.tile.url" :attribution="map.tile.attribution"></l-tile-layer>
      <!--l-marker v-for="marker in map.markers" :lat-lng="marker.latLng">
        <l-icon class-name="nearby-map-marker">
          <a href="#" class="nearby-map-marker-link">
            <img src="http://placekitten.com/48/48" class="nearby-map-marker-image" />
          </a>
        </l-icon>
      </l-marker-->
    </l-map>
  </div>
</template>

<script>
import L from "leaflet";
import { /*LIcon,*/ LMap, LTileLayer /*LMarker*/ } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  components: {
    /*LIcon,*/
    LMap,
    LTileLayer
    /*LMarker*/
  },
  data() {
    return {
      map: {
        tile: {
          attribution:
            '&copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a> contributors',
          maxZoom: 20,
          url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        },
        bounds: null,
        center: L.latLng(54.01407, -1.07911),
        current: {
          bounds: null,
          center: null,
          zoom: null
        },
        markers: [],
        visible: false,
        zoom: 14
      },
      isLoading: true
    };
  },
  methods: {
    handleMapBoundsUpdate(bounds) {
      this.map.current.bounds = bounds;
    },
    handleMapCenterUpdate(center) {
      this.map.current.center = center;
      //this.loadUsers(this.map.current.center, this.map.current.bounds);
    },
    handleMapZoomUpdate(zoom) {
      this.map.current.zoom = zoom;
    }
  },
  beforeMount() {
    this.map.visible = true;
    /*var theme = "dark";

    if (theme === "dark" || theme === "amoled") {
      this.map.tile.attribution =
        '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a>, and <a href="http://openstreetmap.org" target="_blank">OpenStreetMap</a> contributors';
      this.map.tile.url =
        "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";
    }

    this.map.visible = true;*/
  }
};
</script>

<style lang="scss">
@import '@/scss/shared/_variables.scss';

.map {
  height: 100%;
  z-index: 150;
  width: 100%;

  .map-container {
    height: 100%;
    width: 100%;

    .leaflet-control-container {
      .leaflet-top.leaflet-left {
        left: unset;
        right: 0;

        .leaflet-bar {
          border-radius: var(--radius);

          a:first-child {
            border-bottom-color: var(--border-color);
            border-top-left-radius: var(--radius);
            border-top-right-radius: var(--radius);
          }

          a:last-child {
            border-bottom-left-radius: var(--radius);
            border-bottom-right-radius: var(--radius);
          }
        }

        .leaflet-control-zoom {
        box-shadow: var(--heavy-shadow);
          margin: $padding;

          .leaflet-control-zoom-in,
          .leaflet-control-zoom-out {
            background-color: var(--background-color);
            color: var(--foreground-color);
          }
        }
      }
    }
  }
}
</style>