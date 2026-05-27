import { Outlet } from "react-router-dom";

import NavBar from "../components/NavBar";

type Props = {
  searchTerm: string;

  setSearchTerm: any;

  category: string;

  setCategory: any;

  sortOption: string;

  setSortOption: any;
};

const PublicLayout = ({
  searchTerm,
  setSearchTerm,
  category,
  setCategory,
  sortOption,
  setSortOption,
}: Props) => {
  return (
    <>
      <NavBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        category={category}
        setCategory={setCategory}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />

      <Outlet />
    </>
  );
};

export default PublicLayout;
