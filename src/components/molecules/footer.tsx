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

const Toto = () => {
  return (
    <div className="flex items-center gap-2 mx-2">
      <Image src="/images/maadlou.webp" width={32} height={32} alt="Maadlou" />
      <a href="https://maadlou.com/" className="text-chatexto-orange">
        Maadlou
      </a>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="flex items-center justify-center w-full py-8 text-base text-white/70">
      Made with love by <Smotix /> & <Ekb /> & <Toto />
    </div>
  );
};

export default Footer;
