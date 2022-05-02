import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface Props {
    lat: number;
    lon: number;
    mapType: string;
}

const Map: React.FC<Props> = ({ lat, lon, mapType }) => {
    return (
        <MapContainer
            center={[lat, lon]}
            zoom={13}
            scrollWheelZoom={false}
            className="w-96 h-72 md:w-[36rem] md:h-[24rem] lg:w-[48rem] lg:h-[32rem] outline-hidden"
        >
            {mapType === "cycling" && (
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
                />
            )}
            {mapType === "transit" && (
                <TileLayer
                    attribution='Maps &copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=c11f2980390740dc9c2703548916c572"
                />
            )}
        </MapContainer>
    );
};

export default Map;
