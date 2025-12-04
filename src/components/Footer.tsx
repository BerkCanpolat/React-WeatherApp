import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t backdrop-blur py-12 supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <Link to={"https://github.com/BerkCanpolat"}>
        Made by with 💖 Berk Canpolat
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
