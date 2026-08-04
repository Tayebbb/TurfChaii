import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

/** Airbnb-style multi-cell search block used on the landing hero. */
export function SearchBar({ cells = [], action, className }) {
  return (
    <div className={cn('searchbar glass', className)} role="search">
      {cells.map((cell) => (
        <div className="cell" key={cell.label}>
          <span>{cell.label}</span>
          <b>{cell.value}</b>
        </div>
      ))}
      <div className="go">{action}</div>
    </div>
  );
}

/** Collapsed single-line search entry point. */
export function SearchCompact({ to, placeholder, highlight, label = 'Search', className }) {
  return (
    <Link className={cn('search-compact glass', className)} to={to} aria-label={label}>
      <span aria-hidden="true">🔍</span>
      <span>
        {placeholder} {highlight ? <b className="muted">{highlight}</b> : null}
      </span>
    </Link>
  );
}
