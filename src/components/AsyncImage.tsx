import { useEffect, useState } from "react";

interface IProps {
  src: string | undefined;
  toast: () => void;
}
export const AsyncImage = ({ src, toast }: IProps) => {
  const [loadedSrc, setLoadedSrc] = useState("");
  useEffect(() => {
    setLoadedSrc("");
    if (src) {
      const handleLoad = () => {
        setLoadedSrc(src);
        toast();
      };
      const image = new Image();
      image.addEventListener("load", handleLoad);

      image.src = src;
      return () => {
        image.removeEventListener("load", handleLoad);
      };
    }
  }, [src]);

  return loadedSrc === src ? <img src={src} /> : <span> </span>;
};
