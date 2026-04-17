import type { NavBarProps } from "../../interface";

export const NavBar = ({ navbar, setSelectNav }: NavBarProps) => {
  return (
    <nav className="flex justify-around text-3xl">
      {navbar.map((elemOfNavbar) => (
        <button
          key={elemOfNavbar}
          className="hover:border-2 pointer-cli p-2 rounded-2xl"
          onClick={() => setSelectNav(elemOfNavbar)}
        >
          {elemOfNavbar}
        </button>
      ))}
    </nav>
  );
};
