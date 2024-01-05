import Image from 'next/image';

const Smotix = () => {
  return (
    <div className="flex items-center gap-2 mx-2">
      <Image src="/images/smotix.gif" width={32} height={32} alt="Stormix" />
      <a href="https://stormix.co" className="text-chatexto-orange">
        Stormix
      </a>
    </div>
  );
};

const Ekb = () => {
  return (
    <div className="flex items-center gap-2 mx-2">
      <Image src="/images/ekb.png" width={32} height={32} alt="EKB9816" />
      <a href="#" className="text-chatexto-orange">
        EKB9816
      </a>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="flex items-center justify-center w-full py-8 text-xs text-white/70">
      Made with love by <Smotix /> & <Ekb />
    </div>
  );
};

export default Footer;
