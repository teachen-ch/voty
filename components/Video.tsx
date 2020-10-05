import ReactPlayer from "react-player";

type VideoProps = {
  width: number;
  height: number;
  url: string;
};

const Video: React.FC<VideoProps> = (props) => {
  const width = props.width || 300;
  const height = (width / 640) * 360;

  // is this an SRF Video?
  if (props.url.search(/srf\.ch/) >= 0) {
    return <SRFVideo {...props} />;
  }

  return (
    <ReactPlayer
      url={props.url}
      controls={true}
      light={true}
      playIcon={<Play />}
      width={width}
      height={height}
    />
  );
};
export default Video;

const Play: React.FC = () => (
  <img
    src="https://img.icons8.com/ios-glyphs/1600/circled-play.png"
    width={70}
  />
);

const SRFVideo: React.FC<VideoProps> = (props) => {
  const width = props.width || 300;
  const height = (width / 560) * 315;
  // We know the following URL patterns:
  // - https://srf.ch/play/tv/redirect/detail/<<<id>>>
  // - https://srf.ch/play/embed?urn=urn:srf:video:<<<id>>>
  // - https://www.srf.ch/play/tv/srf-myschool/...?id=<<<id>>>
  const embedUrl = extractSRFUrl(props.url);

  return (
    <iframe
      width={width}
      height={height}
      src={embedUrl}
      allowFullScreen
      allow="geolocation *; autoplay; encrypted-media"
    ></iframe>
  );
};

function extractSRFUrl(url: string) {
  let id: string;
  let m: RegExpMatchArray | null;
  if ((m = url.match(/.*id=([^&]*).*$/))) {
    id = m[1];
  } else if ((m = url.match(/srf\.ch\/play\/tv\/redirect\/detail\/([^?]*)/))) {
    id = m[1];
  } else if (
    (m = url.match(/srf\.ch\/play\/embed\?urn=urn:srf:video:([^?]*)/))
  ) {
    id = m[1];
  } else {
    throw new Error("No Video-ID found for SRF-Video: " + url);
  }
  return "https://srf.ch/play/embed?urn=urn:srf:video:" + id;
}
