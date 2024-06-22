import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import PropTypes from "prop-types";

function Maps({ height }) {
  const position = { lat: 31.922015, lng: 35.212628 };

  return (
    <APIProvider apiKey="AIzaSyCX8k4ZRkxeB0fL6IW1KsBNNVXmXv_CviE">
      <div data-aos="zoom-out">
        <Map
          defaultZoom={9}
          defaultCenter={position}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapId="ec5d0e29ba33cad7"
          style={{ height: height }}
        >
          <AdvancedMarker position={position}>
            <Pin />
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
}

Maps.propTypes = {
  height: PropTypes.string.isRequired,
};

export default Maps;
