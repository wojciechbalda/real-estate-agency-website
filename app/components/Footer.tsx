import { Divider, Link } from "@nextui-org/react";

const Footer = () => {
  return (
    <footer className="border-t-1 py-4">
    <div className="max-w-7xl px-6 mx-auto sm:flex sm:justify-between ">
      <div className="flex justify-center gap-3">
        <Link color="foreground" href="/">Home</Link>
        <Link color="foreground" href="/">Offers</Link>
        <Link color="foreground" href="/">Team</Link>
        <Link color="foreground" href="/">Blog</Link>
      </div>
      <div className="text-center">&copy; Company, Inc</div>
    </div>
    </footer>
  );
};

export default Footer;
