mapboxgl.accessToken = 'pk.eyJ1IjoicnlhbnZhbm1hbmVuIiwiYSI6ImNreTI1MGNiYTBoaGUyeW9kdWFqODBoankifQ.p9v5Sx-GtlttBSWiREPMyQ';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/ryanvanmanen/ckyq6zlzg84i015kwie0bm79l',
        center: [ -73.926393,
      40.78422],
        minZoom: 12,
        maxZoom: 25,
        zoom: 12.5
    });

    const slider = document.getElementById('slider');
    const sliderValue = document.getElementById('slider-value');

    map.on('load', () => {
        map.addSource('1947 Topo', {
            'type': 'raster',
            'url': 'mapbox://ryanvanmanen.2914k0hj'
        });
        map.addLayer({
            'id': '1947 Topo',
            'source': '1947 Topo',
            'type': 'raster'
        });

        slider.addEventListener('input', (e) => {
            // Adjust the layers opacity. layer here is arbitrary - this could
            // be another layer name found in your style or a custom layer
            // added on the fly using `addSource`.
            map.setPaintProperty(
                '1947 Topo',
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
                                '<strong>Manhattan State Hospital</strong>'
                        },
                      'geometry': {
                            'type': 'Point',
                            'coordinates': [-73.9316, 40.7889]
                        }
                        },
                        
                  {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Male Lunatic Asylum</strong>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [-73.92756, 40.7861]
                        }
                        },
                 
                  {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Idiot Asylum</strong>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [-73.93488, 40.7843671]
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
                                '<strong>Downing Stadium</strong>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [-73.9253, 40.79400]
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


