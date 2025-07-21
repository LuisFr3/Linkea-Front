import { Link } from 'react-router-dom'

export default function Logo() {
    return (
    <Link to="/" className="flex items-center gap-3 group">
      <img src="/link1.png" alt="Logo Linkea" className="h-20 w-20 object-contain transition group-hover:scale-105"/>
      <span className="text-white text-4xl font-bold transition-colors group-hover:text-lime-200">
        Linkea
      </span>
    </Link>
  );
}