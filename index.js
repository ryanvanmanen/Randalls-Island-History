mapboxgl.accessToken = 'pk.eyJ1IjoicnlhbnZhbm1hbmVuIiwiYSI6ImNreTI1MGNiYTBoaGUyeW9kdWFqODBoankifQ.p9v5Sx-GtlttBSWiREPMyQ';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/ryanvanmanen/ckyq6zlzg84i015kwie0bm79l',
        center: [ -73.926393,
      40.78422],
        minZoom: 13,
        maxZoom: 25,
        zoom: 12.5
    });

    const slider = document.getElementById('slider');
    const sliderValue = document.getElementById('slider-value');

    map.on('load', () => {
        map.addSource('NOAA 1907', {
            'type': 'raster',
            'url': 'mapbox://ryanvanmanen.3c6tcrpm'
        });
        map.addLayer({
            'id': 'NOAA 1907',
            'source': 'NOAA 1907',
            'type': 'raster'
        });

        slider.addEventListener('input', (e) => {
            // Adjust the layers opacity. layer here is arbitrary - this could
            // be another layer name found in your style or a custom layer
            // added on the fly using `addSource`.
            map.setPaintProperty(
                'NOAA 1907',
                'raster-opacity',
                parseInt(e.target.value, 10) / 100
            );

            // Value indicator
            sliderValue.textContent = e.target.value + '%';
        });
    });
  
  
    map.on('load', () => {
        map.addSource('places', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': [
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Emigrant Hospital</strong>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [-73.931228, 40.788997]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Reservoir</strong>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [-73.92639, 40.78975]
                        }
                        },
                  {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Homeopathic Hospital</strong>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [-73.92508903, 40.783550]
                        }
                        },
              {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>House of Refuge</strong>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [-73.926390, 40.79400]
                        }
                    },
                   {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Children\'s Hospital</strong>'                       
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [-73.925734, 40.79827]
                        }
                    },
           
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Chapel</strong>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [-73.92915, 40.789156]
                        }
                    }
                ]
            }
        });
        // Add a layer showing the places.
        map.addLayer({
            'id': 'places',
            'type': 'circle',
            'source': 'places',
            'paint': {
                'circle-color': '#4264fb',
                'circle-radius': 5,
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff'
            }
        });

        // Create a popup, but don't add it to the map yet.
        const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });

        map.on('mouseenter', 'places', (e) => {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';

            // Copy coordinates array.
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.description;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(coordinates).setHTML(description).addTo(map);
        });

        map.on('mouseleave', 'places', () => {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });
    });


