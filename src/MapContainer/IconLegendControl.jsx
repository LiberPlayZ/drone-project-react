import React, { useRef, useState, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import './MapContainer.css';
import { SelectedDroneIcon, DroneIconDanger,DroneIcon } from './DroneContainer/DroneIcon';

// Custom control component for icon legend
const IconLegendControl = React.memo(({ position,lat,long,zoomlevel }) => {
    const map = useMap();
    const controlAddedRef = useRef(false);
    const [controlAdded, setControlAdded] = useState(false);

    useEffect(() => {
        if (!controlAdded && !controlAddedRef.current) {
            //add the legend icons for safe and dangerous drone.
            const customControl = L.Control.extend({
                onAdd: function (map) {
                    const div = L.DomUtil.create('div', 'leaflet-control legend-control');
                    div.innerHTML = `
              <div class="legend-item">
                <img src="${SelectedDroneIcon.options.iconUrl}" alt="safe drone" />
                <span>Safe</span>
              </div>
              <div class="legend-item">
                <img src="${DroneIconDanger.options.iconUrl}" alt="dangerous drone" />
                <span>Dangerous</span>
              </div>
             
             
            `;
                    return div;
                }
            });
            // Create custom button control for current drone in the simulation .
            const buttonControl = L.Control.extend({
                onAdd: function (map) {
                    const button = L.DomUtil.create('button', 'leaflet-control-button');
                    button.innerHTML = `<img src = "${DroneIcon.options.iconUrl}" alt="Icon"/>`;
                    button.onclick = function () {
                        map.flyTo([lat, long], zoomlevel);
                    };
                    return button;
                }
            });
            //add the legend icons .
            const control = new customControl({ position });
            control.addTo(map);
            const buttonControlInstance = new buttonControl({ position:'bottomleft' });
            buttonControlInstance.addTo(map);
            controlAddedRef.current = true;
            setControlAdded(true);
        }
    }, [map, position]);

    return null;
});
export default IconLegendControl;