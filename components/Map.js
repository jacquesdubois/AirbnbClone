import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';

function Map({ searchResults }) {
    const [selectedLocation, setSelectedLocation] = useState({})
    // Transform searchResults obj into a properly-formatted lat/long object
    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat,
    }));

    const center = getCenter(coordinates);

        const [viewport, setViewport] = useState({
            width: "100%",
            height: "100%",
            latitude: center.latitude,
            longitude: center.longitude,
            zoom: 11,
        });

    return (
        <ReactMapGL
            mapStyle='mapbox://styles/duboisj/ckv9z4gy597e215r0fmccz1cp'
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            {searchResults.map((result) => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p className='cursor-pointer text-2xl animate-bounce'
                            onClick={() => setSelectedLocation(result)}
                        >
                            📌
                        </p>
                    </Marker>
                    {/* Pop-up that should show if we click on a map marker */}
                    {selectedLocation.long === result.long && (
                        <Popup
                            closeOnClick={true}
                            onClose={() => setSelectedLocation({})}
                            latitude={result.lat}
                            longitude={result.long}
                        >
                            {result.title}
                        </Popup>
                    )}
                </div>
            ))}

        </ReactMapGL>
    );
}

export default Map
