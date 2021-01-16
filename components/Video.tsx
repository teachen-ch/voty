import ReactPlayer from "react-player";

type VideoProps = {
  width: number | string;
  height: number | string;
  url: string;
};

const Video: React.FC<VideoProps> = (props) => {
  const width = props.width || "100%";
  const height = props.height || undefined;

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
    alt="Play"
    src="https://img.icons8.com/ios-glyphs/1600/circled-play.png"
    width={70}
  />
);

const SRFVideo: React.FC<VideoProps> = (props) => {
  const width = props.width || "100%";
  const height = props.height || 416;
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
      style={{ border: "none" }}
      allow="geolocation *; autoplay; encrypted-media"
    ></iframe>
  );
};

function extractSRFUrl(url: string) {
  let id: string;
  let m: RegExpMatchArray | null;
  if ((m = /.*id=([^&]*).*$/.exec(url))) {
    id = m[1];
  } else if ((m = /srf\.ch\/play\/tv\/redirect\/detail\/([^?]*)/.exec(url))) {
    id = m[1];
  } else if ((m = /srf\.ch\/play\/.*?\?urn=urn:srf:video:([^?]*)/.exec(url))) {
    id = m[1];
  } else {
    throw new Error("No Video-ID found for SRF-Video: " + url);
  }
  return "https://srf.ch/play/embed?urn=urn:srf:video:" + id;
}
