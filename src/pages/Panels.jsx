import { PanelCard } from "../ui/PanelCard";
import usePanels from "../hooks/panels/usePanels";
import Loader from "../ui/Loader";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import { useDarkMode } from "../context/DarkModeContext";
import { useState } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import Empty from "../ui/Empty";

function Panels() {
  const width = useWindowWidth();
  const isLargeScreen = width >= 1024;
  const { isDarkMode } = useDarkMode();

  const [page, setPage] = useState(1);
  const { panels, pagesCount, isLoading } = usePanels(page);

  if (isLoading) return <Loader />;

  if (panels.length === 0) return <Empty resourceName={`panels `} />;

  function handlePageChange(e, page) {
    setPage(page);
  }

  return (
    <div className=" flex min-h-full flex-col justify-between py-4">
      <div>
        <h2 className=" mb-4 text-center text-xl uppercase md:text-2xl lg:text-4xl">
          Panels
        </h2>
        <div className="grid grid-cols-2 gap-[2%] xl:grid-cols-3">
          {panels.map((panel) => (
            <Link to={`/panel/${panel.id}`}>
              <PanelCard
                title={panel.name}
                location={panel.location}
                status={panel.status}
                warningsCount={panel.warnings?.length}
                key={panel.id}
              />
            </Link>
          ))}
        </div>
      </div>
      <div className=" mt-4 flex justify-center">
        <Pagination
          count={pagesCount}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": {
              color: isDarkMode && "#fff",
              opacity: pagesCount === 1 ? 0.3 : 1,
              cursor: pagesCount === 1 && "not-allowed",
            },
          }}
          size={isLargeScreen ? "large" : "small"}
          disabled={pagesCount === 1}
        />
      </div>
    </div>
  );
}

export default Panels;
