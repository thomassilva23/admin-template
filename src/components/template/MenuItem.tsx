import Link from "next/link";

interface MenuItemProps {
  url?: string;
  texto: string;
  icone: any;
  className?: string;
  onClick?: (evento: any) => void;
}

export default function MenuItem(props: MenuItemProps) {
  function renderizarLink() {
    return (
      <a
        className={`
      flex flex-col justify-center items-center
      w-20 h-20 p-5 
      dark:text-gray-200
      ${props.className}
      `}
      >
        {props.icone}
        <span className={`text-xs font-light`}>{props.texto}</span>
      </a>
    );
  }
  return (
    <li
      className={`hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer`}
      onClick={props.onClick}
    >
      {props.url ? (
        <Link legacyBehavior href={props.url}>
          {renderizarLink()}
        </Link>
      ) : (
        renderizarLink()
      )}
    </li>
  );
}
