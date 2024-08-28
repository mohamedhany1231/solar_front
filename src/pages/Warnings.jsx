import { useState } from "react";
import usePanels from "../hooks/panels/usePanels";
import Loader from "../ui/Loader";
import { PanelWarningCard } from "../ui/PanelWarningCard";
import { useWindowWidth } from "@react-hook/window-size";
import { useDarkMode } from "../context/DarkModeContext";
import { Pagination } from "@mui/material";
import Empty from "../ui/Empty";

function Warnings() {
  const width = useWindowWidth();
  const isLargeScreen = width >= 1024;
  const { isDarkMode } = useDarkMode();

  const [page, setPage] = useState(1);
  const { panels, pagesCount, isLoading } = usePanels(page);

  function handlePageChange(e, page) {
    setPage(page);
  }

  if (isLoading) return <Loader />;

  if (panels.length === 0) return <Empty resourceName={`panels `} />;

  return (
    <div className=" flex min-h-full flex-col justify-between py-4">
      <div>
        <h1 className=" mb-6 text-center text-3xl font-bold text-gray-600 dark:text-gray-200 sm:mb-8 sm:text-5xl md:mb-14">
          warnings
        </h1>
        <div className=" mx-auto flex w-[90%] flex-col gap-12 ">
          {panels.map((panel) => (
            <PanelWarningCard panel={panel} key={panel.id} />
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

export default Warnings;
