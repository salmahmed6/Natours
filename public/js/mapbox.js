/* eslint-disable */

export const displayMap = (locations) => {
    mapboxgl.accessToken = 
    'pk.eyJ1Ijoiam9uYXN2Y2htZWR0bWFubliIsImEiOiJjam54ZmM5N3gwNjAzM3dtZDNxYTVlMnd2In0.ytpIV7v7wCyT1KqsrT9Z1A';

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        scrollZoom: false
        // center: [-122.084051, 37.385348],
        // zoom: 10,
        // interactive: false
    })

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach(loc => {
        const el = document.createElement('div');
        el.className = 'marker';

        new mapboxgl.Marker({
            element: el,
            anchor: 'bottom',
        })
        .setLngLat(loc.coordinates)
        .addTo(map);

        new mapboxgl.Popup({
            offset: 30
        })
            .setLngLat(loc.coordinates)
            .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
            .addTo(map);

        bounds.extend(loc.coordinates);
    });

    map.fitBounds(bounds, {
        padding: {
                top: 200,
                bottom: 200,
                left: 100,
                right: 100
            }
    });
}
